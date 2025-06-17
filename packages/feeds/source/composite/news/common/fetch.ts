import { Utilities } from '@universityofmaryland/web-elements-library';
import * as feedMacros from 'macros';
import { ARTICLES_QUERY } from './queries';
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

export interface TypeFetchVariables {
  related?: string[];
  relatedToAll?: string[];
  limit?: number;
  offset?: number;
  not?: Array<string | number>;
}

export interface TypeAPIFeedVariables extends TypeFetchVariables {
  token: string | null;
  displayNoResults: (props: NoResultsProps) => void;
}

export const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

const getEntries = async ({
  limit,
  not,
  offset,
  related,
  relatedToAll,
  token,
}: TypeAPIFeedVariables) => {
  if (!token) throw new Error('Token not found');
  const graceFail = ({ message }: { message: string }) => {
    console.error(message);
  };

  const variables: TypeFetchVariables = {
    limit,
    related,
    relatedToAll,
    offset,
    not,
  };

  const feedData = await Utilities.network.FetchGraphQL({
    query: ARTICLES_QUERY,
    url: 'https://today.umd.edu/graphql',
    token: token,
    variables,
  });

  if (
    !feedData ||
    !feedData.data ||
    !feedData.data.entries ||
    feedData.message
  ) {
    if (!feedData) graceFail({ message: 'Feed not found' });
    if (feedData?.message)
      graceFail({ message: `Feed data errors: ${feedData.message}` });

    return null;
  }

  return {
    entries: feedData.data.entries,
    count: feedData.data.entryCount,
  };
};

export const load = async (props: LoadMoreProps) => {
  const { getContainer, getOffset, displayResults, getTotalEntries } = props;
  const container = getContainer();
  const currentCount = getOffset();
  const totalEntries = getTotalEntries();

  feedMacros.buttonLazyLoad.remove({ container });
  feedMacros.loader.display({ container });

  getEntries(dataComposed.apiVariables(props)).then((feedData) => {
    if (feedData) {
      displayResults({ feedData: feedData.entries });

      feedMacros.ariaLive.update({
        container,
        message: `Showing ${
          currentCount + feedData.entries.length
        } of ${totalEntries} articles`,
      });
    }
  });
};

export const start = async (props: CreateProps) => {
  const { displayNoResults, displayResultStart, setTotalEntries } = props;

  getEntries(dataComposed.apiVariables(props)).then((feedData) => {
    if (!feedData || !feedData.entries) {
      displayNoResults({
        ...props,
        message: 'An error occurred while fetching the data.',
      });
      return;
    }

    const totalEntries = feedData.count;

    if (totalEntries === 0) {
      displayNoResults({ ...props });
      return;
    }

    setTotalEntries(totalEntries);

    return displayResultStart({ ...props, feedData: feedData.entries });
  });
};
