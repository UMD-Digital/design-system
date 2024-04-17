import { Styles } from 'utilities';
import { MakeLoader } from '../../common/loader';
import {
  CreateEventCard,
  CreateEventList,
  STYLES_EVENT_FEED,
  EventType,
} from 'feeds/events/common/ui';
import {
  AppendGridEntries,
  DisplayLazyLoad,
  DisplayNoResults,
  DisplayLoader,
  DisplayGrid,
  RemoveLazyLoad,
  RemoveLoader,
  STYLES_FEEDS_COMMON,
  TypeLazyLoad,
} from 'feeds/common/ui';
import {
  FetchFeedCount,
  FetchFeedEntries,
  TypeAPIFeedVariables,
} from 'feeds/events/common/api';
import { UMDFeedEventsList, ELEMENT_NAME as ELEMENT_NAME_LIST } from '../list';
import { UMDFeedEventsGrid, ELEMENT_NAME as ELEMENT_NAME_GRID } from '../grid';

const FEEDS_EVENTS_CONTAINER = 'umd-feeds-events-container';

type TypeElements = UMDFeedEventsList | UMDFeedEventsGrid;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${STYLES_FEEDS_COMMON}
  ${STYLES_EVENT_FEED}
`;

const NoResultsContent = {
  message: 'There are no events to show',
  linkUrl: 'https://calendar.umd.edu',
  linkText: 'View Campus Calendar',
};

const isListType = ({ element }: { element: TypeElements }) =>
  element.nodeName.toLowerCase() === ELEMENT_NAME_LIST;

const isGridType = ({ element }: { element: TypeElements }) =>
  element.nodeName.toLowerCase() === ELEMENT_NAME_GRID;

const MakeApiVariables = ({
  element,
}: {
  element: TypeElements;
}): TypeAPIFeedVariables => {
  const startDate = new Date().toDateString();
  const isUnion = element._union;
  const related = element._categories;
  const offset = element._offset;
  const token = element._token;
  const limit = element._showRows;
  const obj: TypeAPIFeedVariables = {
    container: GetContainer({ element }),
    startDate,
    limit,
    related,
    offset,
    token,
  };

  if ('_showCount' in element) {
    obj.limit = element._showCount * element._showRows;
  }

  if (isUnion) {
    obj.related = ['and', ...related];
  }

  return obj;
};

const MakeLazyLoadVariables = ({
  element,
}: {
  element: TypeElements;
}): TypeLazyLoad => ({
  container: GetContainer({ element }),
  isLazyLoad: element._lazyLoad,
  totalEntries: element._totalEntries,
  offset: element._offset,
  lazyLoadCallback: { callback: () => LoadMoreEntries({ element }) },
});

const GetContainer = ({ element }: { element: TypeElements }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_EVENTS_CONTAINER}`,
  ) as HTMLDivElement;

  return container;
};

const DisplayEntries = ({
  element,
  feedData,
}: {
  element: TypeElements;
  feedData: EventType[];
}) => {
  const isGrid = isGridType({ element });
  const container = GetContainer({ element });
  const entries = isGrid
    ? CreateEventCard({ entries: feedData })
    : CreateEventList({ entries: feedData });

  element._offset += entries.length;

  RemoveLoader({ container });
  RemoveLazyLoad({ container });
  AppendGridEntries({ container, entries });
  DisplayLazyLoad(MakeLazyLoadVariables({ element }));
};

const SetCount = async ({ element }: { element: TypeElements }) => {
  const count = await FetchFeedCount({
    variables: MakeApiVariables({ element }),
  });

  if (count) {
    element._totalEntries = count;
    DisplayLazyLoad(MakeLazyLoadVariables({ element }));
  }
};

const LoadMoreEntries = async ({ element }: { element: TypeElements }) => {
  const container = GetContainer({ element });
  RemoveLazyLoad({ container });
  DisplayLoader({ container });
  FetchFeedEntries({
    variables: MakeApiVariables({ element }),
  }).then((feedData) => {
    DisplayEntries({ element, feedData });
  });
};

export const CreateFeed = async ({ element }: { element: TypeElements }) => {
  const container = GetContainer({ element });

  FetchFeedEntries({
    variables: MakeApiVariables({ element }),
  }).then((feedData) => {
    if (feedData.length === 0) {
      DisplayNoResults({ container, NoResultsContent });
      return;
    }

    if (feedData.length > 0) {
      const count = '_showCount' in element ? element._showCount : 1;

      DisplayGrid({ container, count });
      DisplayEntries({ element, feedData });
      SetCount({ element });
    }
  });
};

export const CreateShadowDom = ({ element }: { element: TypeElements }) => {
  const loader = MakeLoader();
  const container = document.createElement('div');

  container.classList.add(FEEDS_EVENTS_CONTAINER);
  container.appendChild(loader);

  return container;
};
