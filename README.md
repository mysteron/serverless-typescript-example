# serverless-typescript-example
**Introduction**

This is a sample service for Amazon Serverless written in TypeScript. It leverages a very simple event log as en example of a service. It uses Amazon DynamoDB, an Amazon no-sql database to store the data.

**How to use**

After downloading the source code, execute:
```
npm install
```
in the root directory. This will install all needed modules.

To be able to deploy the service to Serverless, install:
```
npm install -g serverless
```
and configure your AWS credentials. Read this document for details: https://serverless.com/provider-setup/#get-started. After that you will be ready to deploy. You can do that by running the following command in the root directory:
```
sls deploy
```
If everything went OK, you will see an output similar to this one:
```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (35.29 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..........................
Serverless: Stack update finished...
Service Information
service: serverless-typescript-example
stage: dev
region: eu-central-1
stack: serverless-typescript-example-dev
api keys:
  None
endpoints:
  POST - https://04s2idf2yk.execute-api.eu-central-1.amazonaws.com/dev/logs
  GET - https://04s2idf2yk.execute-api.eu-central-1.amazonaws.com/dev/logs
  GET - https://04s2idf2yk.execute-api.eu-central-1.amazonaws.com/dev/hearthbeat
functions:
  create: serverless-typescript-example-dev-create
  get: serverless-typescript-example-dev-get
  hearthbeat: serverless-typescript-example-dev-hearthbeat
Serverless: Publish service to Serverless Platform...
Service successfully published! Your service details are available at:
https://platform.serverless.com/services/mysteron/serverless-typescript-example
```

To test the service you can use the following curl command (change the URL to the one given by the _sls deploy_ command output):

```
curl -X POST -d '{"deviceId": "XYZ123", "message": "Hello!"}' "https://04s2idf2yktral-1.amazonaws.com/dev/logs"
```

You can use the following URL to read exisiting logs:
```
https://04s2idf2yk.execute-api.eu-central-1.amazonaws.com/dev/logs?deviceId=XYZ123&startDate=0&endDate=100000000000000
```

To remove the deployed service, run this command:
```
sls remove
```

Read more about Serverless here: https://serverless.com/learn/quick-start/.
