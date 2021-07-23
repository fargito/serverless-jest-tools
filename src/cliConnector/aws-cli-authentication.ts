import * as AWS from 'aws-sdk';

import { DEFAULT_STAGE, SERVERLESS_TEST_TOOLS_CONFIG } from './config';

const { DEVELOPER_PROFILE, REGION, STAGE } = SERVERLESS_TEST_TOOLS_CONFIG;

interface CliConfiguration {
  region: string;
  credentials?: AWS.Credentials;
}

export const getCliConfiguration = (): CliConfiguration => {
  const region = REGION;

  // authentication is automatically managed on the CI, so we only need to authenticate when running the tests on dev
  if (STAGE === DEFAULT_STAGE) {
    const credentials = new AWS.SharedIniFileCredentials({
      profile: DEVELOPER_PROFILE,
      callback: err => {
        if (err) {
          console.error(`SharedIniFileCreds Error: ${err.toString()}`);
        }
      },
    });

    return { credentials, region };
  }

  return { region };
};
