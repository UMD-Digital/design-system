import { FetchGraphQL } from 'helpers/xhr';
import { ARTICLES_QUERY } from 'helpers/queries';

type TypeFetchVariables = {
  related?: string[];
  limit?: number;
  offset?: number;
};

export type TypeAPIFeedVariables = TypeFetchVariables & {
  token: string | null;
};

type TypeFetchObject = TypeAPIFeedVariables & {
  query: string;
};

const TODAY_PRODUCTION_URL = 'https://today.umd.edu/graphql';

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
  const feedData = await FetchFeed({ ...variables, query: ARTICLES_QUERY });

  if (
    !feedData ||
    !feedData.data ||
    !feedData.data.entries ||
    feedData.message
  ) {
    if (!feedData) throw new Error('Feed not found');
    if (!feedData.data) throw new Error('Feed data not found');
    if (!feedData.data.entries) throw new Error('Feed entries not found');
    if (!feedData.message)
      throw new Error(`Feed data errors: ${feedData.message}`);
  }

  return {
    entries: feedData.data.entries,
    count: feedData.data.entryCount,
  };
};
