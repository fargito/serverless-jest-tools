import AWS from 'aws-sdk';

import { SERVERLESS_TEST_TOOLS_CONFIG } from './config';

const { DEFAULT_WAITING_TIME_FOR_EVENT_CREATION } =
  SERVERLESS_TEST_TOOLS_CONFIG;

export const waitForEventCreation = async (
  timeoutMilliseconds?: number,
): Promise<void> => {
  return new Promise(resolve =>
    setTimeout(
      resolve,
      timeoutMilliseconds ?? DEFAULT_WAITING_TIME_FOR_EVENT_CREATION,
    ),
  );
};

interface KeyNames {
  sortKeyName?: string;
  partitionKeyName?: string;
}

/**
 * Since DynamoDB does not provide a function to clean a whole partition, we implement one
 *
 * @param tableName the name of the table
 * @param partitionKey the value of the partition key
 * @param keyNames (optional) the name of the keys (pk and sk by default)
 */
export const cleanDynamoDBPartition = async (
  tableName: string,
  partitionKey: string,
  keyNames?: KeyNames,
): Promise<void> => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  const partitionKeyName = keyNames?.partitionKeyName ?? 'pk';
  const sortKeyName = keyNames?.sortKeyName ?? 'sk';

  const { Items: items } = await documentClient
    .query({
      TableName: tableName,
      KeyConditionExpression: `${partitionKeyName} = :hkey`,
      ExpressionAttributeValues: {
        ':hkey': partitionKey,
      },
    })
    .promise();

  if (items === undefined) return;

  await Promise.all(
    items.map(async item => {
      const sortKey = item[sortKeyName] as string;

      await documentClient
        .delete({
          TableName: tableName,
          Key: { [partitionKeyName]: partitionKey, [sortKeyName]: sortKey },
        })
        .promise();
    }),
  );
};
