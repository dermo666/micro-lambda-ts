/**
 * Access to run-time constants
 */
export default class Constants {
  static get SERVICE_HOST(): string | undefined {
    return process.env.SERVICE_HOST;
  }

  static get SERVICE_NAME(): string | undefined {
    return process.env.SERVICE_NAME;
  }

  /**
   * Gets the API key parameter
   * @returns {Object}
   */
  static get apiKey(): Record<string, string | undefined> {
    return { name: 'API_KEY', path: process.env.SSM_API_KEY };
  }

  /**
   * Gets the API url parameter
   * @returns {Object}
   */
  static get apiUrl(): Record<string, string | undefined> {
    return { name: 'API_URL', path: process.env.SSM_API_URL };
  }

  /**
   * Gets all the API parameters
   * @return {string[]}
   */
  static get parameters(): Array<any> {
    return [Constants.apiKey, Constants.apiUrl];
  }
}
