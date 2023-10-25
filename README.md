# personal-site-contact-sender
AWS Serverless and and SES contact form sender

## Deployment

### install dependancies

`npm install`

### Send Test Message

`serverless invoke local --function staticSiteMailer -p local-data.json`

### Dev deploy

`serverless deploy --verbose --stage dev`

### Prod deploy

`serverless deplay --verbose --stage prod`
