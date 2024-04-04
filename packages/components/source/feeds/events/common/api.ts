import { Network } from 'utilities';
import { EVENTS_QUERY, EVENTS_COUNT_QUERY } from 'feeds/common/queries';
import { DisplayNoResults } from 'feeds/common/ui';

type TypeFetchVariables = {
  startDate?: string;
  related?: string[];
  limit?: number;
  offset?: number;
};

export type TypeAPIFeedVariables = TypeFetchVariables & {
  token: string | null;
  container: HTMLDivElement;
};

type TypeFetchObject = TypeAPIFeedVariables & {
  query: string;
};

const { FetchGraphQL } = Network;

const CALENDAR_PRODUCTION_URL = 'https://calendar.umd.edu/graphql';
const NoResultsContent = {
  message: 'Error fetching events. Please visit the main site.',
  linkUrl: 'https://calendar.umd.edu',
  linkText: 'View All Events',
};

const FetchFeed = async ({
  limit,
  related,
  offset,
  token,
  query,
}: TypeFetchObject) => {
  if (!token) throw new Error('Token not found');

  const variables: TypeFetchVariables = {
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
  variables: TypeAPIFeedVariables;
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
  variables: TypeAPIFeedVariables;
}) => {
  const { container } = variables;
  const feedData = await FetchFeed({ ...variables, query: EVENTS_QUERY });
  const graceFail = ({ message }: { message: string }) => {
    DisplayNoResults({ container, NoResultsContent });
    throw new Error(message);
  };

  if (
    !feedData ||
    !feedData.data ||
    !feedData.data.entries ||
    feedData.message
  ) {
    if (!feedData) graceFail({ message: 'Feed not found' });
    if (!feedData.data) graceFail({ message: 'Feed data not found' });
    if (!feedData.data.entries)
      graceFail({ message: 'Feed entries not found' });
    if (!feedData.data.entries.events)
      graceFail({ message: 'Feed events not found' });
    if (!feedData.message)
      graceFail({ message: `Feed data errors: ${feedData.message}` });
  }

  return feedData.data.entries.events;
};
