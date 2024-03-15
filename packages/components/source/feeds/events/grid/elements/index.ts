import { Tokens } from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { FetchFeedCount, FetchFeedEntries } from '../../common/api';
import { CreateEventCards, STYLES_EVENTS } from 'elements/events';
import { CreateGridGapLayout, GridGapStyles } from 'elements/grid';
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

const { Spacing } = Tokens;

const FEEDS_EVENTS_CONTAINER = 'umd-feeds-events-container';
const LAZY_LOAD_BUTTON = 'umd-feeds-events-lazy-load-button';

const LazyLoadButtonStyles = `
  .${LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${Spacing.lg};
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${GridGapStyles}
  ${LazyLoadButtonStyles}
  ${STYLES_EVENTS}
  ${STYLES_CALL_TO_ACTION_ELEMENT}
  ${STYLES_NO_RESULTS}
  ${STYLES_LOADER}
`;

const NoResultsContent: NoResultsContentType = {
  message: 'No results found',
  linkUrl: 'https://calendar.umd.edu',
  linkText: 'View All Events',
};

const MakeApiVariables = ({ element }: { element: UMDNewsEventsType }) => ({
  startDate: new Date().toDateString(),
  limit: element._showCount * element._showRows,
  related: element._categories,
  offset: element._offset,
  token: element._token,
});

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

const CreateLazyLoadButton = ({ element }: { element: UMDNewsEventsType }) => {
  const container = document.createElement('div');
  const button = document.createElement('button');
  const ctaButton = CreateCallToActionElement({
    cta: button,
    type: 'outline',
  });

  button.innerHTML = 'Load More Events';
  button.addEventListener('click', () => {
    LoadMoreEntries({ element });
  });

  container.classList.add(LAZY_LOAD_BUTTON);
  container.appendChild(ctaButton);

  return container;
};

const LoadMoreEntries = async ({ element }: { element: UMDNewsEventsType }) => {
  const loader = MakeLoader();
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_EVENTS_CONTAINER}`,
  ) as HTMLDivElement;
  const gridContainer = container.querySelector(`[grid-count]`);

  if (!gridContainer) return;
  container.appendChild(loader);

  if (container) {
    const feedData = await FetchFeedEntries({
      variables: MakeApiVariables({ element }),
    });
    const entries = CreateEventCards({ entries: feedData });

    loader.remove();
    element._offset += entries.length;
    CheckForLazyLoad({ element });

    entries.forEach((entry) => {
      gridContainer.appendChild(entry);
    });
  }
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
  const feedData = await FetchFeedEntries({
    variables: MakeApiVariables({ element }),
  });
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
    const grid = CreateGridGapLayout({ count: element._showCount });

    entries.forEach((entry) => {
      grid.appendChild(entry);
    });

    container.innerHTML = '';
    element._offset += entries.length;
    container.appendChild(grid);

    const count = await FetchFeedCount({
      variables: MakeApiVariables({ element }),
    });

    if (count) {
      element._totalEntries = count;
    }

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
