import { Reset } from 'helpers/styles';
import { MakeLoader } from 'elements/loader';
import {
  CreateEventCards,
  STYLES_EVENT_CARD,
  EventType,
} from 'elements/events';
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
import { UMDNewsEventsType } from '..';

const FEEDS_EVENTS_CONTAINER = 'umd-feeds-events-container';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_FEEDS_COMMON}
  ${STYLES_EVENT_CARD}
`;

const NoResultsContent = {
  message: 'No results found',
  linkUrl: 'https://calendar.umd.edu',
  linkText: 'View All Events',
};

const MakeApiVariables = ({
  element,
}: {
  element: UMDNewsEventsType;
}): TypeAPIFeedVariables => ({
  startDate: new Date().toDateString(),
  limit: element._showCount * element._showRows,
  related: element._categories,
  offset: element._offset,
  token: element._token,
});

const MakeLazyLoadVariables = ({
  element,
}: {
  element: UMDNewsEventsType;
}): TypeLazyLoad => ({
  container: GetContainer({ element }),
  isLazyLoad: element._lazyLoad,
  totalEntries: element._totalEntries,
  offset: element._offset,
  lazyLoadCallback: { callback: () => LoadMoreEntries({ element }) },
});

const GetContainer = ({ element }: { element: UMDNewsEventsType }) => {
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
  element: UMDNewsEventsType;
  feedData: EventType[];
}) => {
  const container = GetContainer({ element });
  const entries = CreateEventCards({ entries: feedData });

  element._offset += entries.length;

  RemoveLoader({ container });
  RemoveLazyLoad({ container });
  AppendGridEntries({ container, entries });
  DisplayLazyLoad(MakeLazyLoadVariables({ element }));
};

const SetCount = async ({ element }: { element: UMDNewsEventsType }) => {
  const count = await FetchFeedCount({
    variables: MakeApiVariables({ element }),
  });

  if (count) {
    element._totalEntries = count;
    DisplayLazyLoad(MakeLazyLoadVariables({ element }));
  }
};

const LoadMoreEntries = async ({ element }: { element: UMDNewsEventsType }) => {
  const container = GetContainer({ element });
  RemoveLazyLoad({ container });
  DisplayLoader({ container });
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
  const container = GetContainer({ element });

  FetchFeedEntries({
    variables: MakeApiVariables({ element }),
  }).then((feedData) => {
    if (feedData.length === 0) {
      DisplayNoResults({ container, NoResultsContent });
      return;
    }

    if (feedData.length > 0) {
      DisplayGrid({ container, count: element._showCount });
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
