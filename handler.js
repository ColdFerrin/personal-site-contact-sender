import { SES } from "@aws-sdk/client-ses";

const ses = new SES();

function sendEmail(formData, callback) {
    const emailParams = {
        Source: 'ferrinkatz@ferrinkatz.com', // SES SENDING EMAIL
        ReplyToAddresses: [formData.reply_to],
        Destination: {
            ToAddresses: ['ferrinkatz@ferrinkatz.com'], // SES RECEIVING EMAIL
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.reply_to}\n\n\nSource: ${formData.source}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'New message from ferrinkatz.com',
            },
        },
    };

    ses.sendEmail(emailParams, callback);
}

function staticSiteMailer(event, context, callback) {
    let formData = JSON.parse(event.body);
    formData.source = event.requestContext.path;
    console.log(event)

    sendEmail(formData, function(err, data) {
        let url = process.env.URL;
        const response = {
            statusCode: err ? 500 : 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': url,
            },
            body: JSON.stringify({
                message: err ? err.message : data,
            }),
        };

        callback(null, response);
    });
}

export { staticSiteMailer }
