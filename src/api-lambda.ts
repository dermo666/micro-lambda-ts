/* istanbul ignore file */
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
import { Server } from 'node:http';

import Api from './services/api';

// Creates an express app (with parameter store)
const api = new Api()
  .attachParameterStore()
  .attachApi()
  .attachErrorHandler();

// Creates a AWS serverless express server
const server = awsServerlessExpress.createServer(api.getExpress());

// eslint-disable-next-line import/prefer-default-export
export const handler = (event: APIGatewayProxyEvent, context: Context): Server => awsServerlessExpress.proxy(server, event, context);
