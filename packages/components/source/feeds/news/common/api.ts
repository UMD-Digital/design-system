import { Network } from 'utilities';
import { ARTICLES_QUERY } from 'feeds/common/queries';
import { DisplayNoResults } from 'feeds/common/ui';

type TypeFetchVariables = {
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

const TODAY_PRODUCTION_URL = 'https://today.umd.edu/graphql';
const NoResultsContent = {
  message: 'Error fetching articles. Please visit the main site.',
  linkUrl: 'https://today.umd.edu',
  linkText: 'View All Articles',
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
    limit,
    related,
    offset,
  };

  const feedData = await FetchGraphQL({
    query,
    url: TODAY_PRODUCTION_URL,
    token: token,
    variables,
  });

  return feedData;
};

export const FetchFeedEntries = async ({
  variables,
}: {
  variables: TypeAPIFeedVariables;
}) => {
  const { container } = variables;
  const feedData = await FetchFeed({ ...variables, query: ARTICLES_QUERY });
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
    if (!feedData.message)
      graceFail({ message: `Feed data errors: ${feedData.message}` });
  }

  return {
    entries: feedData.data.entries,
    count: feedData.data.entryCount,
  };
};
