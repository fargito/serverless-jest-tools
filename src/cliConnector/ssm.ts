import * as AWS from 'aws-sdk';

import { getCliConfiguration } from './aws-cli-authentication';
import { SERVERLESS_TEST_TOOLS_CONFIG } from './config';

const { LEGACY_API_KEY_NAME, HTTP_API_ENDPOINT_KEY_NAME } = SERVERLESS_TEST_TOOLS_CONFIG;

export const getLegacyApiKey = async (): Promise<string | undefined> => {
  const { region, credentials } = getCliConfiguration();
  const ssm = new AWS.SSM({ region, credentials });

  const legacyApiKeyResource = await ssm
    .getParameter({ Name: LEGACY_API_KEY_NAME, WithDecryption: true })
    .promise();

  return legacyApiKeyResource.Parameter?.Value;
};

export const getHttpApiEndpoint = async (): Promise<string> => {
  const { region, credentials } = getCliConfiguration();
  const ssm = new AWS.SSM({ region, credentials });

  const httpApiEndpointResource = await ssm
    .getParameter({ Name: HTTP_API_ENDPOINT_KEY_NAME, WithDecryption: false })
    .promise();

  if (httpApiEndpointResource.Parameter?.Value === undefined)
    throw new Error('undefined apiGatewayEndpoint');

  return httpApiEndpointResource.Parameter.Value;
};
