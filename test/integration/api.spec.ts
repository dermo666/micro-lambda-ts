import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import got from 'got';
import { SSMClient } from '@aws-sdk/client-ssm';
import { fromIni } from '@aws-sdk/credential-providers';

import ParameterStoreService, { ProcessEnv } from '../../src/services/parameter-store-service';

chai.use(chaiAsPromised);

describe('API integration', () => {
  before(async () => {
    const { AWS_STAGE = 'dev', AWS_PROFILE = 'default', AWS_REGION = 'ap-southeast-2' } = process.env;

    // Setup parameter store paths
    const env = <ProcessEnv>{
      SSM_API_KEY: `/${AWS_STAGE}/api/api_key`,
      SSM_API_URL: `/${AWS_STAGE}/api/api_url`,
    };

    // Load parameter store values
    await new ParameterStoreService(
      env,
      false,
      new SSMClient({
        region: AWS_REGION,
        credentials: fromIni({ profile: AWS_PROFILE }),
      }),
    ).load();
  });

  it('Unauthorized requests should return 403 response', () =>
    expect(
      got({
        url: `${process.env.API_URL}/123?message=abc`,
        responseType: 'json',
      }),
    ).to.be.rejectedWith('Forbidden'));

  it('Valid requests should return correct response', async () => {
    const { body } = await got({
      url: `${process.env.API_URL}/123?message=abc`,
      headers: { 'x-api-key': process.env.API_KEY },
      responseType: 'json',
    });

    expect(body).to.eql({
      data: {
        id: '123',
        type: 'response',
        attributes: { message: 'abc' },
      },
    });
  });
});
