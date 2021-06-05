/* istanbul ignore file */
import { SSM } from 'aws-sdk';
import {
  NextFunction, Request, Response, RequestHandler,
} from 'express';

export interface ProcessEnv {
  [key: string]: string;
}

export default class ParameterStoreService {
  static cache: ProcessEnv = {};

  constructor(
    private parameters: ProcessEnv,
    private useCache = true,
    private ssm = new SSM(),
  ) { }

  /**
   * Filter out SSM params
   * @param env ProcessEnv
   * @returns ProcessEnv
   */
  static findSSMParams(env: ProcessEnv): ProcessEnv {
    const ssmParams: ProcessEnv = {};

    Object.keys(env).forEach((name) => {
      if (name.startsWith('SSM_')) {
        ssmParams[name] = env[name];
      }
    });

    return ssmParams;
  }

  static middleware(parameters: ProcessEnv, useCache = true): RequestHandler {
    const ssmParams = ParameterStoreService.findSSMParams(parameters);
    return (req: Request, res: Response, next: NextFunction): Promise<void> => new ParameterStoreService(ssmParams, useCache)
      .load()
      .then(() => next())
      .catch((error) => {
        req.log.error('ParameterStoreService Error', error);

        res.status(500).json({
          errors: [{
            status: 500,
            title: 'ParameterConfigurationError',
            detail: error.message,
          }],
        });
      });
  }

  async load(): Promise<void> {
    if (!this.parameters) {
      throw new Error('Parameters is required');
    }

    const tasks = Object.entries(this.parameters).map(async ([ssmName, path]) => {
      const name = ssmName.substr(4);

      // Look in the cache first if using cache is specified (true by default)
      if (this.useCache && ParameterStoreService.cache[name]) {
        process.env[name] = ParameterStoreService.cache[name];
      } else {
        // Go directly to the parameter store
        const { Parameter: { Value = '' } = {} } = await this.ssm.getParameter({
          Name: path,
          WithDecryption: true,
        }).promise();

        ParameterStoreService.cache[name] = Value;
        process.env[name] = Value;
      }
    });

    await Promise.all(tasks);
  }
}
