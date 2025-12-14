import { fetchGraphQL } from '@universityofmaryland/web-utilities-library/network';
import * as Styles from '@universityofmaryland/web-styles-library';
import { LoadingState, Announcer } from 'states';
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

  const feedData = await fetchGraphQL({
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

  // Remove existing pagination using new API
  const existingPagination = container.querySelector(
    `.${Styles.layout.alignment.block.center.className}`
  );
  existingPagination?.remove();

  // Show loading state using new class-based API
  const loading = new LoadingState();
  loading.show(container);

  getEntries(dataComposed.apiVariables(props)).then((feedData) => {
    if (feedData) {
      loading.hide();
      displayResults({ feedData: feedData.entries });

      // Update announcer with new count
      const message = `Showing ${
        currentCount + feedData.entries.length
      } of ${totalEntries} articles`;

      const existingAnnouncer = container.querySelector('[role="status"]') as HTMLElement;
      if (existingAnnouncer) {
        existingAnnouncer.textContent = message;
      } else {
        const announcer = new Announcer({ message });
        container.appendChild(announcer.getElement());
      }
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
