/**
 * Accepted operations for the integration test utils
 */
export enum TestOperationType {
  SETUP = 'SETUP',
  CLEANUP = 'CLEANUP',
}

/**
 * declares the payload passed to the testUtils lambda
 */
export type TestUtilsPayload<TestNames extends string> =
  | {
      testName: TestNames;
      operationType: TestOperationType.SETUP;
    }
  | { testName: TestNames; operationType: TestOperationType.CLEANUP; sharedRandomString: string };

/**
 * The response of the test utils lambda. It returns a shared random string to avoid collision between tests
 */
export interface TestUtilsResponse {
  sharedRandomString: string;
}

/**
 * Type of the testUtils handler
 */
export type TestUtilsHandler<TestNames extends string> = (
  payload: TestUtilsPayload<TestNames>,
) => Promise<TestUtilsResponse>;

/**
 * Declares the type of a setup or cleanup function.
 */
export type TestSetupOrCleanupFunction = (
  operationType: TestOperationType,
  sharedRandomString: string,
) => Promise<void>;

/**
 * In order to use the different setup or cleanup functions, a configuration object
 * must declare them
 */
export type TestUtilsConfiguration<TestNames extends string> = Record<
  TestNames,
  TestSetupOrCleanupFunction
>;
