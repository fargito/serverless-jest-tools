import * as AWS from 'aws-sdk';

import { getCliConfiguration } from './aws-cli-authentication';
import { SERVERLESS_TEST_TOOLS_CONFIG } from './config';

const { HTTP_API_ENDPOINT_KEY_NAME } = SERVERLESS_TEST_TOOLS_CONFIG;

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
