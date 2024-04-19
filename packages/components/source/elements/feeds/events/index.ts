import FeedDisplay, { EventType } from './display';
import Fetch, { TypeAPIFeedVariables } from './api';
import NoResults from '../no-results';
import {
  ButtonLazyLoad,
  LayoutGridGap,
  LoaderElement,
} from '../../shared-elements';

const FEEDS_EVENTS_CONTAINER = 'umd-feeds-events-container';

export type TypeEventFeedRequirements = {
  token: string;
  numberOfRowsToStart: number;
  numberOfColumnsToShow?: number;
  categories?: string[];
  isLazyLoad: boolean;
  isUnion: boolean;
  isTypeGrid?: boolean;
  isTypeList?: boolean;
};

type TypeFeedProps = TypeEventFeedRequirements & {
  getOffset: () => number;
  getTotalEntries: () => number | null;
  getContainer: () => HTMLDivElement;
  setTotalEntries: (count: number) => void;
  setOffset: (count: number) => void;
};

type TypeDisplayEntries = TypeFeedProps & {
  feedData: EventType[];
};

const STYLES_FEED_EVENT_ELEMENT = `
  ${NoResults.Styles}
  ${LayoutGridGap.Styles}
  ${ButtonLazyLoad.Styles}
  ${LoaderElement.Styles}
  ${FeedDisplay.Styles}
`;

const NoResultsContent = {
  message: 'There are no events to show',
  linkUrl: 'https://calendar.umd.edu',
  linkText: 'View Campus Calendar',
};

const MakeApiVariables = ({
  getContainer,
  isUnion,
  categories,
  getOffset,
  token,
  numberOfColumnsToShow,
  numberOfRowsToStart,
}: TypeFeedProps): TypeAPIFeedVariables => {
  const obj: TypeAPIFeedVariables = {
    container: getContainer(),
    startDate: new Date().toDateString(),
    limit: numberOfRowsToStart,
    related: categories,
    offset: getOffset(),
    token,
  };

  if (numberOfColumnsToShow) {
    obj.limit = numberOfColumnsToShow * numberOfRowsToStart;
  }

  if (isUnion && categories) {
    obj.related = ['and', ...categories];
  }

  return obj;
};

const MakeLazyLoadVariables = (props: TypeFeedProps) => ({
  ...props,
  totalEntries: props.getTotalEntries(),
  offset: props.getOffset(),
  container: props.getContainer(),
  lazyLoadCallback: { callback: () => LoadMoreEntries(props) },
});

const DisplayEntries = (props: TypeDisplayEntries) => {
  const { isTypeGrid, getContainer, setOffset, feedData } = props;
  const container = getContainer();
  const grid = container.querySelector(
    `.${LayoutGridGap.ID}`,
  ) as HTMLDivElement;
  const entries = FeedDisplay.CreateElement({
    entries: feedData,
    isTypeGrid,
  });

  setOffset(entries.length);

  LoaderElement.Remove({ container });
  ButtonLazyLoad.Remove({ container });
  entries.forEach((entry) => {
    grid.appendChild(entry);
  });
  ButtonLazyLoad.Display(MakeLazyLoadVariables(props));
};

const SetCount = async (props: TypeFeedProps) => {
  const { setTotalEntries } = props;
  const count = await Fetch.Count({
    variables: MakeApiVariables(props),
  });

  if (count) {
    setTotalEntries(count);
    ButtonLazyLoad.Display(MakeLazyLoadVariables(props));
  }
};

const LoadMoreEntries = async (props: TypeFeedProps) => {
  const { getContainer } = props;
  const container = getContainer();

  ButtonLazyLoad.Remove({ container });
  LoaderElement.Display({ container });
  Fetch.Entries({
    variables: MakeApiVariables(props),
  }).then((feedData) => {
    DisplayEntries({ ...props, feedData });
  });
};

export const CreateFeed = (props: TypeFeedProps) => {
  const { getContainer, numberOfColumnsToShow } = props;
  const container = getContainer();

  Fetch.Entries({
    variables: MakeApiVariables(props),
  }).then((feedData) => {
    if (feedData.length === 0) {
      NoResults.DisplayElement({ container, ...NoResultsContent });
      return;
    }

    if (feedData.length > 0) {
      const count =
        'numberOfColumnsToShow' in props ? numberOfColumnsToShow : 1;

      LayoutGridGap.CreateElement({ container, count });
      DisplayEntries({ ...props, feedData });
      SetCount({ ...props });
    }
  });
};

const CreateFeedsEventElement = (props: TypeEventFeedRequirements) =>
  (() => {
    const loader = LoaderElement.Create();
    const elementContainer = document.createElement('div');
    const setTotalEntries = (count: number) => (totalEntries = count);
    const setOffset = (count: number) => (offset = offset + count);
    const getContainer = () => elementContainer;
    const getTotalEntries = () => totalEntries;
    const getOffset = () => offset;
    let totalEntries = 0;
    let offset = 0;

    elementContainer.classList.add(FEEDS_EVENTS_CONTAINER);
    elementContainer.appendChild(loader);

    CreateFeed({
      ...props,
      getTotalEntries,
      getOffset,
      getContainer,
      setTotalEntries,
      setOffset,
    });

    return elementContainer;
  })();

export default {
  CreateElement: CreateFeedsEventElement,
  Styles: STYLES_FEED_EVENT_ELEMENT,
};
