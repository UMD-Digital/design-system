import { FetchGraphQL } from 'helpers/xhr';
import { EVENTS_QUERY, EVENTS_COUNT_QUERY } from 'helpers/queries';

type FetchVariablesTypes = {
  startDate?: string;
  related?: string[];
  limit?: number;
  offset?: number;
};

type APIFeedVariablesTypes = FetchVariablesTypes & {
  token: string | null;
};

type FetchObject = APIFeedVariablesTypes & {
  query: string;
};

const CALENDAR_PRODUCTION_URL = 'https://calendar.umd.edu/graphql';

const FetchFeed = async ({
  limit,
  related,
  offset,
  token,
  query,
}: FetchObject) => {
  if (!token) throw new Error('Token not found');

  const variables: FetchVariablesTypes = {
    startDate: new Date().toDateString(),
    limit,
    related,
    offset,
  };

  const feedData = await FetchGraphQL({
    query,
    url: CALENDAR_PRODUCTION_URL,
    token: token,
    variables,
  });

  return feedData;
};

export const FetchFeedCount = async ({
  variables,
}: {
  variables: APIFeedVariablesTypes;
}) => {
  const feedData = await FetchFeed({
    ...variables,
    query: EVENTS_COUNT_QUERY,
  });

  if (!feedData) throw new Error('Feed not found');

  const count = feedData?.data?.count?.events?.length;

  if (count) {
    return count;
  }

  return null;
};

export const FetchFeedEntries = async ({
  variables,
}: {
  variables: APIFeedVariablesTypes;
}) => {
  const feedData = await FetchFeed({ ...variables, query: EVENTS_QUERY });

  if (
    !feedData ||
    !feedData.data ||
    !feedData.data.entries ||
    feedData.message
  ) {
    if (!feedData) throw new Error('Feed not found');
    if (!feedData.data) throw new Error('Feed data not found');
    if (!feedData.data.entries) throw new Error('Feed entries not found');
    if (!feedData.data.entries.events) throw new Error('Feed events not found');
    if (!feedData.message)
      throw new Error(`Feed data errors: ${feedData.message}`);
  }

  return feedData.data.entries.events;
};
