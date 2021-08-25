/* istanbul ignore file */
import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Server } from 'http';

import apiDocs from './api-docs';

const server = awsServerlessExpress.createServer(apiDocs);

// eslint-disable-next-line import/prefer-default-export
export const handler = (event: APIGatewayProxyEvent, context: Context): Server => awsServerlessExpress.proxy(server, event, context);
