/* istanbul ignore file */
import express from 'express';
import cors from 'cors';
import LogService from './log-service';
import ParameterStoreService from './parameter-store-service';
import Constants from '../configs/constants';
import HttpError from '../errors/http-error';

import SampleController from '../controllers/sample-controller';

export default class Api {
  private express: express.Application;

  constructor() {
    this.express = express()
      .disable('x-powered-by')
      .use(LogService.middleware())
      .use(HttpError.middleware());
  }

  getExpress(): express.Application {
    return this.express;
  }

  attachParameterStore(): Api {
    this.express.use(ParameterStoreService.middleware(process.env as any));
    return this;
  }

  attachApi(): Api {
    this.express
      // Remove the next line to disable CORS (internal services)
      .use(cors())
      .use(express.json())
      .use([`/${Constants.SERVICE_NAME}`, '/'], SampleController.middleware());
    return this;
  }

  attachErrorHandler(): Api {
    this.express.use(LogService.errorMiddleware());
    return this;
  }

  use(middleware: express.RequestHandler): Api {
    this.express.use(middleware);
    return this;
  }
}
