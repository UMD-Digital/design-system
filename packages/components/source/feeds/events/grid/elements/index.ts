import { Reset } from 'helpers/styles';
import { MakeLoader, STYLES_LOADER, UMD_LOADER } from 'elements/loader';
import { CreateEventCards, STYLES_EVENTS, EventType } from 'elements/events';
import {
  CreateGridGapLayout,
  GridGapStyles,
  GRID_LAYOUT_CONTAINER,
} from 'elements/grid';
import {
  CreateNoResultsInterface,
  STYLES_NO_RESULTS,
  NoResultsContentType,
} from 'elements/no-results';
import { FetchFeedCount, FetchFeedEntries } from '../../common/api';
import {
  CreateLazyLoadButton,
  LazyLoadButtonStyles,
  LAZY_LOAD_BUTTON,
} from '../../common/ui';
import { UMDNewsEventsType } from '../component';

const FEEDS_EVENTS_CONTAINER = 'umd-feeds-events-container';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${GridGapStyles}
  ${LazyLoadButtonStyles}
  ${STYLES_EVENTS}
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

const GetContainer = ({ element }: { element: UMDNewsEventsType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_EVENTS_CONTAINER}`,
  ) as HTMLDivElement;

  return container;
};

const RemoveLazyLoad = ({ element }: { element: UMDNewsEventsType }) => {
  const container = GetContainer({ element });
  const button = container.querySelector(
    `.${LAZY_LOAD_BUTTON}`,
  ) as HTMLDivElement;

  if (button) button.remove();
};

const RemoveLoader = ({ element }: { element: UMDNewsEventsType }) => {
  const container = GetContainer({ element });
  const loader = container.querySelector(`.${UMD_LOADER}`) as HTMLDivElement;

  if (loader) loader.remove();
};

const DisplayLazyLoad = ({ element }: { element: UMDNewsEventsType }) => {
  const container = GetContainer({ element });
  const lazyLoadButton = CreateLazyLoadButton({
    callback: () => LoadMoreEntries({ element }),
  });

  if (!element._lazyLoad) return;
  if (!element._totalEntries) return;
  if (element._offset >= element._totalEntries) return;

  container.appendChild(lazyLoadButton);
};

const DisplayNoResults = ({ element }: { element: UMDNewsEventsType }) => {
  const container = GetContainer({ element });

  container.innerHTML = '';
  CreateNoResultsInterface({ container, ...NoResultsContent });
};

const DisplayLoader = ({ element }: { element: UMDNewsEventsType }) => {
  const container = GetContainer({ element });
  const loader = MakeLoader();

  container.appendChild(loader);
};

const DisplayGrid = ({ element }: { element: UMDNewsEventsType }) => {
  const container = GetContainer({ element });
  const grid = CreateGridGapLayout({ count: element._showCount });

  container.appendChild(grid);
};

const DisplayEntries = ({
  element,
  feedData,
}: {
  element: UMDNewsEventsType;
  feedData: EventType[];
}) => {
  const container = GetContainer({ element });
  const grid = container.querySelector(
    `.${GRID_LAYOUT_CONTAINER}`,
  ) as HTMLDivElement;
  const entries = CreateEventCards({ entries: feedData });

  element._offset += entries.length;

  RemoveLoader({ element });
  RemoveLazyLoad({ element });

  entries.forEach((entry) => {
    grid.appendChild(entry);
  });

  DisplayLazyLoad({ element });
};

const SetCount = async ({ element }: { element: UMDNewsEventsType }) => {
  const count = await FetchFeedCount({
    variables: MakeApiVariables({ element }),
  });

  if (count) {
    element._totalEntries = count;
    DisplayLazyLoad({ element });
  }
};

const LoadMoreEntries = async ({ element }: { element: UMDNewsEventsType }) => {
  RemoveLazyLoad({ element });
  DisplayLoader({ element });
  FetchFeedEntries({
    variables: MakeApiVariables({ element }),
  }).then((feedData) => {
    DisplayEntries({ element, feedData });
  });
};

export const CreateFeed = async ({
  element,
}: {
  element: UMDNewsEventsType;
}) => {
  FetchFeedEntries({
    variables: MakeApiVariables({ element }),
  }).then((feedData) => {
    if (feedData.length === 0) {
      DisplayNoResults({ element });
      return;
    }

    if (feedData.length > 0) {
      DisplayGrid({ element });
      DisplayEntries({ element, feedData });
      SetCount({ element });
    }
  });
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
