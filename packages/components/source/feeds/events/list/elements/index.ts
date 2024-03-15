import { Tokens, Layout } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { FetchGraphQL } from 'helpers/xhr';
import { EVENTS_QUERY, EVENTS_COUNT_QUERY } from 'helpers/queries';
import { CreateEventCards, STYLES_EVENT_CARD } from 'elements/events';
import {
  CreateCallToActionElement,
  STYLES_CALL_TO_ACTION_ELEMENT,
} from 'elements/call-to-action';
import {
  CreateNoResultsInterface,
  STYLES_NO_RESULTS,
  NoResultsContentType,
} from 'elements/no-results';
import { MakeLoader, STYLES_LOADER } from 'elements/loader';
import { UMDNewsEventsType } from '../component';

type VariablesType = {
  startDate?: string;
  related?: string[];
  limit?: number;
  offset?: number;
};

const { Spacing } = Tokens;
const { Grid } = Layout;

const FEEDS_EVENTS_CONTAINER = 'umd-feeds-events-container';
const LAYOUT_CONTAINER = 'umd-feeds-events-layout-container';
const LAZY_LOAD_BUTTON = 'umd-feeds-events-lazy-load-button';

const CALENDAR_PRODUCTION_URL = 'https://calendar.umd.edu/graphql';

const LazyLoadButtonStyles = `
  .${LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${Spacing.lg};
  }
`;

const LayoutStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="2"]`]: Grid['.base'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="3"]`]: Grid['.base-three'],
    },
  })}


  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="4"]`]: Grid['.base-four'],
    },
  })}
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${LayoutStyles}
  ${LazyLoadButtonStyles}
  ${STYLES_EVENT_CARD}
  ${STYLES_CALL_TO_ACTION_ELEMENT}
  ${STYLES_NO_RESULTS}
  ${STYLES_LOADER}
`;

const NoResultsContent: NoResultsContentType = {
  message: 'No results found',
  linkUrl: 'https://calendar.umd.edu',
  linkText: 'View All Events',
};

const CheckForLazyLoad = ({ element }: { element: UMDNewsEventsType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${LAZY_LOAD_BUTTON}`,
  ) as HTMLDivElement;

  if (!container) return;
  if (!element._lazyLoad) return;
  if (!element._totalEntries) {
    container.remove();
    return;
  }

  if (element._offset >= element._totalEntries) {
    container.remove();
  }
};

const CreateGridLayout = ({ element }: { element: UMDNewsEventsType }) => {
  const container = document.createElement('div');

  container.classList.add(LAYOUT_CONTAINER);
  container.setAttribute('grid-count', `${element._showCount}`);

  return container;
};

const CreateLazyLoadButton = ({ element }: { element: UMDNewsEventsType }) => {
  const container = document.createElement('div');
  const button = document.createElement('button');
  button.innerHTML = 'Load More';
  button.addEventListener('click', () => {
    LoadMoreEntries({ element });
  });

  const ctaButton = CreateCallToActionElement({
    cta: button,
    type: 'outline',
  });

  container.classList.add(LAZY_LOAD_BUTTON);
  container.appendChild(ctaButton);

  return container;
};

const LoadMoreEntries = async ({ element }: { element: UMDNewsEventsType }) => {
  const loader = MakeLoader();
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${LAYOUT_CONTAINER}`,
  ) as HTMLDivElement;

  if (!container) return;
  container.appendChild(loader);

  if (container) {
    const feedData = await FetchFeedEntries({ element });
    const entries = CreateEventCards({ entries: feedData });

    loader.remove();

    entries.forEach((entry) => {
      container.appendChild(entry);
    });
  }
};

const FetchFeed = async ({
  element,
  query,
}: {
  element: UMDNewsEventsType;
  query: string;
}) => {
  if (!element._token) throw new Error('Token not found');

  const variables: VariablesType = {
    startDate: new Date().toDateString(),
    limit: element._showCount * element._showRows,
    related: element._categories,
    offset: element._offset,
  };

  const feedData = await FetchGraphQL({
    query,
    url: CALENDAR_PRODUCTION_URL,
    token: element._token,
    variables,
  });

  return feedData;
};

const FetchFeedCount = async ({ element }: { element: UMDNewsEventsType }) => {
  const feedData = await FetchFeed({
    element,
    query: EVENTS_COUNT_QUERY,
  });

  if (!feedData) throw new Error('Feed not found');

  const count = feedData?.data?.count?.events?.length;

  if (count) {
    element._totalEntries = count;
  }

  return null;
};

const FetchFeedEntries = async ({
  element,
}: {
  element: UMDNewsEventsType;
}) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_EVENTS_CONTAINER}`,
  ) as HTMLDivElement;
  const feedData = await FetchFeed({ element, query: EVENTS_QUERY });

  if (
    !feedData ||
    !feedData.data ||
    !feedData.data.entries ||
    feedData.message
  ) {
    CreateNoResultsInterface({ container, ...NoResultsContent });
    if (!feedData) throw new Error('Feed not found');
    if (!feedData.data) throw new Error('Feed data not found');
    if (!feedData.data.entries) throw new Error('Feed entries not found');
    if (!feedData.data.entries.events) throw new Error('Feed events not found');
    if (!feedData.message)
      throw new Error(`Feed data errors: ${feedData.message}`);
  }

  const data = feedData.data.entries.events;

  element._offset += data.length;
  CheckForLazyLoad({ element });
  return data;
};

export const CreateFeed = async ({
  element,
}: {
  element: UMDNewsEventsType;
}) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_EVENTS_CONTAINER}`,
  ) as HTMLDivElement;
  const feedData = await FetchFeedEntries({ element });
  const lazyLoadButton = CreateLazyLoadButton({ element });

  if (!container) {
    throw new Error('Container not found');
  }

  if (feedData.length === 0) {
    container.innerHTML = '';
    CreateNoResultsInterface({ container, ...NoResultsContent });
    return container;
  }

  if (feedData.length > 0) {
    const entries = CreateEventCards({ entries: feedData });
    const grid = CreateGridLayout({ element });

    entries.forEach((entry) => {
      grid.appendChild(entry);
    });

    container.innerHTML = '';
    container.appendChild(grid);

    await FetchFeedCount({ element });

    if (element._lazyLoad) container.appendChild(lazyLoadButton);
  }
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDNewsEventsType;
}) => {
  const loader = MakeLoader();
  const container = document.createElement('div');

  container.classList.add(FEEDS_EVENTS_CONTAINER);
  container.appendChild(loader);

  return container;
};
