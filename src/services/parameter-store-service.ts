/* istanbul ignore file */
import { SSM } from 'aws-sdk';

const cache = {};

export default class ParameterStoreService {
  constructor(
    private parameters: Array<any>,
    private useCache = true,
    private ssm = new SSM()) {}

  async load(parameters = this.parameters) {
    if (!parameters) {
      throw new Error('Parameters is required');
    }

    const tasks = parameters.map(async ({ name, path }) => {
      // Look in the cache first if using cache is specified (true by default)
      if (this.useCache && cache[name]) {
        process.env[name] = cache[name];
      } else {
        // Go directly to the parameter store
        const { Parameter: { Value } = {} } = await this.ssm.getParameter({
          Name: path,
          WithDecryption: true,
        }).promise();
        cache[name] = Value;
        process.env[name] = Value;
      }
    });

    await Promise.all(tasks);
  }

  static middleware(parameters: Array<any>, useCache = true) {
    return (req, res, next) => new ParameterStoreService(parameters, useCache)
      .load()
      .then(() => next())
      .catch(error => {
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
}
