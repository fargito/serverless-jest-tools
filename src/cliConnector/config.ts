const DEVELOPER_PROFILE = '';
const REGION = 'eu-west-1';
const PROJECT_NAME = '';
const EVENT_BUS_NAME = PROJECT_NAME;
export const DEFAULT_STAGE = 'dev';
const DEFAULT_WAITING_TIME_FOR_EVENT_CREATION = 2000; // 2 sec
export const DEFAULT_INTEGRATION_TEST_TIMEOUT = 50000; // 50 sec
export const SETUP_OR_CLEANUP_TIMEOUT = 100000; // 100 sec

const STAGE = process.env.STAGE ?? DEFAULT_STAGE;

export const STACK_NAMES = {
  CORE: `${PROJECT_NAME}-core-${STAGE}`,
};

const HTTP_API_ENDPOINT_KEY_NAME = `/SLS/${STACK_NAMES.CORE}/ApiDomain`;

export const SERVERLESS_TEST_TOOLS_CONFIG = {
  DEVELOPER_PROFILE,
  REGION,
  HTTP_API_ENDPOINT_KEY_NAME,
  PROJECT_NAME,
  EVENT_BUS_NAME,
  STAGE,
  DEFAULT_WAITING_TIME_FOR_EVENT_CREATION,
  STACK_NAMES,
};
