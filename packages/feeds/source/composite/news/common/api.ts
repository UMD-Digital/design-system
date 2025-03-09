import { Utilities } from '@universityofmaryland/web-elements-library';

import { ARTICLES_QUERY } from './queries';
import * as feedDisplay from './display';

type TypeFetchVariables = {
  related?: string[];
  relatedToAll?: string[];
  limit?: number;
  offset?: number;
  not?: Array<string | number>;
};

export type TypeAPIFeedVariables = TypeFetchVariables & {
  token: string | null;
  container: HTMLElement;
};

type TypeFetchObject = TypeAPIFeedVariables & {
  query: string;
};

const { FetchGraphQL } = Utilities.network;

const TODAY_PRODUCTION_URL = 'https://today.umd.edu/graphql';
const NoResultsContent = {
  message: 'Error fetching articles. Please visit the main site.',
  linkUrl: 'https://today.umd.edu',
  linkText: 'View all articles',
};

const FetchFeed = async ({
  limit,
  related,
  relatedToAll,
  offset,
  not,
  token,
  query,
}: TypeFetchObject) => {
  if (!token) throw new Error('Token not found');

  const variables: TypeFetchVariables = {
    limit,
    related,
    relatedToAll,
    offset,
    not,
  };

  const feedData = await FetchGraphQL({
    query,
    url: TODAY_PRODUCTION_URL,
    token: token,
    variables,
  });

  return feedData;
};

const FetchFeedEntries = async ({
  variables,
}: {
  variables: TypeAPIFeedVariables;
}) => {
  const { container } = variables;
  const feedData = await FetchFeed({ ...variables, query: ARTICLES_QUERY });
  const graceFail = ({ message }: { message: string }) => {
    feedDisplay.noResults({ container, ...NoResultsContent });
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
    if (!feedData.message)
      graceFail({ message: `Feed data errors: ${feedData.message}` });
  }

  return {
    entries: feedData.data.entries,
    count: feedData.data.entryCount,
  };
};

export default {
  Entries: FetchFeedEntries,
};
