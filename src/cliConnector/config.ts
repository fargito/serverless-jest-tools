const DEVELOPER_PROFILE = 'unify-developer';
const REGION = 'eu-west-1';
const LEGACY_API_KEY_NAME = '/uno-credentials/ForumLegacyApiGatewayKey';
const PROJECT_NAME = 'uno';
const EVENT_BUS_NAME = PROJECT_NAME;
export const DEFAULT_STAGE = 'dev';
const DEFAULT_WAITING_TIME_FOR_EVENT_CREATION = 2000; // 2 sec
export const DEFAULT_INTEGRATION_TEST_TIMEOUT = 50000; // 50 sec
export const SETUP_OR_CLEANUP_TIMEOUT = 100000; // 100 sec

const STAGE = process.env.STAGE ?? DEFAULT_STAGE;

export const STACK_NAMES = {
  CORE: `${PROJECT_NAME}-core-${STAGE}`,
  CONTENT: `${PROJECT_NAME}-content-${STAGE}`,
  NOTIFICATIONS: `${PROJECT_NAME}-notifications-${STAGE}`,
  NAVIGATION: `${PROJECT_NAME}-navigation-${STAGE}`,
  TAXONOMY: `${PROJECT_NAME}-taxonomy-${STAGE}`,
  SEO: `${PROJECT_NAME}-seo-${STAGE}`,
  FORUM: `${PROJECT_NAME}-forum-${STAGE}`,
  GDPR: `${PROJECT_NAME}-gdpr-${STAGE}`,
  PROFILE: `${PROJECT_NAME}-profile-${STAGE}`,
};

const HTTP_API_ENDPOINT_KEY_NAME = `/SLS/${STACK_NAMES.CORE}/ApiDomain`;

export const SERVERLESS_TEST_TOOLS_CONFIG = {
  DEVELOPER_PROFILE,
  REGION,
  LEGACY_API_KEY_NAME,
  HTTP_API_ENDPOINT_KEY_NAME,
  PROJECT_NAME,
  EVENT_BUS_NAME,
  STAGE,
  DEFAULT_WAITING_TIME_FOR_EVENT_CREATION,
  STACK_NAMES,
};
