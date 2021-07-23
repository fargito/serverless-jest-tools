import * as AWS from 'aws-sdk';

import { getCliConfiguration } from '../cliConnector';
import {
  TestOperationType,
  TestUtilsPayload,
  TestUtilsResponse,
} from './types';

const invokeTestUtilsLambda = async <TestNames extends string>(
  functionName: string,
  payload: TestUtilsPayload<TestNames>,
): Promise<TestUtilsResponse> => {
  const { region, credentials } = getCliConfiguration();

  const lambda = new AWS.Lambda({ region, credentials });

  const lambdaFunction = await lambda
    .invoke({ FunctionName: functionName, Payload: JSON.stringify(payload) })
    .promise();

  if (lambdaFunction.StatusCode !== 200) {
    throw new Error('Unable to call setup lambda');
  }

  if (lambdaFunction.FunctionError !== undefined) {
    throw new Error('testUtils invocation failed');
  }

  if (lambdaFunction.Payload === undefined) {
    throw new Error('No payload returned from setup lambda');
  }

  return JSON.parse(lambdaFunction.Payload.toString()) as TestUtilsResponse;
};

export const generateJestInvokeTestUtils = <TestNames extends string>(
  lambdaName: string,
  testName: TestNames,
): {
  setup: () => Promise<TestUtilsResponse>;
  cleanup: (sharedRandomString: string) => Promise<TestUtilsResponse>;
} => {
  return {
    setup: async () =>
      await invokeTestUtilsLambda(lambdaName, {
        testName,
        operationType: TestOperationType.SETUP,
      }),
    cleanup: async (sharedRandomString: string) =>
      await invokeTestUtilsLambda(lambdaName, {
        testName,
        operationType: TestOperationType.CLEANUP,
        sharedRandomString,
      }),
  };
};
