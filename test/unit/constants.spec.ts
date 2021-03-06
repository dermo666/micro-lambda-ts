import { expect } from 'chai';

import Constants from '../../src/configs/constants';

describe('configs/parameters', () => {
  it('should export service host', () => {
    process.env.SERVICE_HOST = 'SERVICE_HOST';
    expect(Constants.SERVICE_HOST).to.equal(process.env.SERVICE_HOST);
  });

  it('should export service name', () => {
    process.env.SERVICE_NAME = 'SERVICE_NAME';
    expect(Constants.SERVICE_NAME).to.equal(process.env.SERVICE_NAME);
  });
});
