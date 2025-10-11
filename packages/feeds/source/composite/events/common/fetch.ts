import { fetchGraphQL } from '@universityofmaryland/web-utilities-library/network';
import * as feedMacros from 'macros';
import { EVENTS_COUNT_QUERY, EVENTS_QUERY } from './queries';
import * as dataComposed from './data';
import {
  NoResultsProps,
  DisplayStartProps,
  DisplayStartResultsProps,
  DisplayProps,
} from '../_types';

interface LoadMoreProps extends DisplayProps {}

interface CreateProps extends DisplayStartProps {
  displayResultStart: (props: DisplayStartResultsProps) => void;
  displayNoResults: (props: NoResultsProps) => void;
}

export const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

type TypeFetchVariables = {
  startDate?: string;
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

const fetchFeed = async ({
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

  return await fetchGraphQL({
    query,
    url: 'https://calendar.umd.edu/graphql',
    token: token,
    variables,
  });
};

const getCount = async ({ variables }: { variables: TypeAPIFeedVariables }) => {
  const feedData = await fetchFeed({
    ...variables,
    query: EVENTS_COUNT_QUERY,
  });

  if (!feedData || !feedData.data || feedData.message) {
    if (feedData.message) console.error(feedData.message);
    return null;
  }

  return feedData?.data?.count?.events?.length || 0;
};

const getEntries = async ({
  variables,
}: {
  variables: TypeAPIFeedVariables;
}) => {
  const feedData = await fetchFeed({ ...variables, query: EVENTS_QUERY });
  const graceFail = ({ message }: { message: string }) => {
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

export const load = async (props: LoadMoreProps) => {
  const { getContainer, getOffset, displayResults, getTotalEntries } = props;
  const container = getContainer();
  const currentCount = getOffset();
  const totalEntries = getTotalEntries();

  feedMacros.buttonLazyLoad.remove({ container });
  feedMacros.loader.display({ container });

  getEntries({
    variables: dataComposed.apiVariables(props),
  }).then((feedData) => {
    displayResults({ feedData });

    feedMacros.ariaLive.update({
      container,
      message: `Showing ${
        currentCount + feedData.length
      } of ${totalEntries} articles`,
    });
  });
};

export const start = async (props: CreateProps) => {
  const { displayNoResults, displayResultStart, setTotalEntries } = props;

  await getCount({
    variables: dataComposed.apiVariables(props),
  }).then((count) => {
    if (count === 0) {
      displayNoResults({ ...props });
      return;
    }

    if (count) {
      setTotalEntries(count);
    }

    if (count === null) {
      displayNoResults({
        ...props,
        message: 'An error occurred while fetching the data.',
      });
      return;
    }
  });

  getEntries({
    variables: dataComposed.apiVariables(props),
  }).then((feedData) => displayResultStart({ ...props, feedData }));
};
