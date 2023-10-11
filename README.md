# micro-lambda-ts

This is a highly opinionated RESTful API microservice template for AWS Lambda written in Typescript.

## Core technologies
1. Serverless Framework
2. Serverless Express App
3. Serverless Esbuild
4. Mocha Unit Tests
5. Swagger API Documentation
6. JSON API specs
7. Dot ENV

## Core infrastructure
1. AWS Lambda
2. AWS API Gateway
3. AWS SSM Parameter Store
4. AWS X-Ray

## Setup
`npm install`

## Run
`npm start`

## Test
1. `npm run test` for lint + unit tests
2. `npm run test:unit`  for unit tests only

## Build
`npm run build`

## Deploy
`npm run deploy`
or for tst deployment only
`npm run deploy:tst`

### Integration testing
Configure your `.env` file with the deployed resources
`npm run test:integration`  for integration tests
