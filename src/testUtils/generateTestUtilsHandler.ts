import crypto from 'crypto';

import { TestUtilsConfiguration, TestUtilsHandler, TestUtilsPayload } from './types';

export const generateTestUtilsHandler = <TestNames extends string>(
  configuration: TestUtilsConfiguration<TestNames>,
): TestUtilsHandler<TestNames> => async (testUtilsPayload: TestUtilsPayload<TestNames>) => {
  const { testName, operationType } = testUtilsPayload;

  const sharedRandomString =
    'sharedRandomString' in testUtilsPayload
      ? testUtilsPayload.sharedRandomString
      : crypto.randomBytes(4).toString('hex');

  const setupOrCleanup = configuration[testName];

  await setupOrCleanup(operationType, sharedRandomString);

  return { sharedRandomString };
};
