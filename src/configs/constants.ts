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
}
