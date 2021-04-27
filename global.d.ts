import SampleController from './src/controllers/sample-controller';
import LogService from './src/services/log-service';
import { jsonError as jsonErrorFn } from './src/errors/http-error';

declare global {
  interface SyntaxError {
    status: number;
  }

  namespace Express {
    export interface Request {
      controller: SampleController;
      log: LogService;
    }

    export interface Response {
      jsonError: typeof jsonErrorFn;
    }
  }
}