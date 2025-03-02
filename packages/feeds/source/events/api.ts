import { Utilities } from '@universityofmaryland/web-elements-library';
import { EVENTS_QUERY, EVENTS_COUNT_QUERY } from './queries';
import NoResults from '../elements/no-results';

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

const { FetchGraphQL } = Utilities.network;

// const CALENDAR_PRODUCTION_URL = 'https://events.umd-staging.com/graphql';
const CALENDAR_PRODUCTION_URL = 'https://calendar.umd.edu/graphql';
const NoResultsContent = {
  message: 'Error fetching events. Please visit the main site.',
  linkUrl: 'https://calendar.umd.edu',
  linkText: 'View all events',
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

const FetchFeedCount = async ({
  variables,
}: {
  variables: TypeAPIFeedVariables;
}) => {
  const feedData = await FetchFeed({
    ...variables,
    query: EVENTS_COUNT_QUERY,
  });

  if (!feedData) {
    console.error('Feed not found');
    console.error(feedData);
    return null;
  }

  const count = feedData?.data?.count?.events?.length;

  if (count) {
    return count;
  }

  return null;
};

const FetchFeedEntries = async ({
  variables,
}: {
  variables: TypeAPIFeedVariables;
}) => {
  const { container } = variables;
  const feedData = await FetchFeed({ ...variables, query: EVENTS_QUERY });
  const graceFail = ({ message }: { message: string }) => {
    NoResults.display({ container, ...NoResultsContent });
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

export default {
  Entries: FetchFeedEntries,
  Count: FetchFeedCount,
};
