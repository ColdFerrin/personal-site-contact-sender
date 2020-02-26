'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

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
                    Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.reply_to}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'New message from ferrinkatz.com',
            },
        },
    };

    SES.sendEmail(emailParams, callback);
}

module.exports.staticSiteMailer = (event, context, callback) => {
    const formData = JSON.parse(event.body);

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
};
