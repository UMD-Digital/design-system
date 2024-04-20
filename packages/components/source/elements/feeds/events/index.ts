import { Tokens, Elements } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import FeedDisplay, { EventType } from './display';
import Fetch, { TypeAPIFeedVariables } from './api';
import NoResults from '../no-results';
import {
  ButtonLazyLoad,
  LayoutGridGap,
  LoaderElement,
} from '../../shared-elements';

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

const FEEDS_EVENTS_CONTAINER = 'umd-feeds-events-container';
const ELEMENT_FEEDS_EVENTS_NO_RESULTS = 'feeds-events-no-results';

const { ConvertJSSObjectToStyles } = Styles;
const { Eyebrow } = Elements;
const { Colors, Spacing } = Tokens;

const EventsNoResults = `
  .${ELEMENT_FEEDS_EVENTS_NO_RESULTS} {

  }

  .${ELEMENT_FEEDS_EVENTS_NO_RESULTS} hr {
    border: none;
    background-color: ${Colors.black};
    height: 1px;
    margin-bottom: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_FEEDS_EVENTS_NO_RESULTS} > p`]: Eyebrow.Ribbon,
    },
  })}

  .${ELEMENT_FEEDS_EVENTS_NO_RESULTS} > p {
    margin-bottom: ${Spacing.md};
  }
`;

const STYLES_FEED_EVENT_ELEMENT = `
  ${NoResults.Styles}
  ${LayoutGridGap.Styles}
  ${ButtonLazyLoad.Styles}
  ${LoaderElement.Styles}
  ${FeedDisplay.Styles}
  ${EventsNoResults}
`;

const NoResultsContent = {
  message: 'No Related Events',
  isAlignedCenter: false,
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

const CreateNoResult = (props: TypeFeedProps) => {
  const { getContainer, setTotalEntries } = props;
  const container = getContainer();
  const noResultsContainer = document.createElement('div');
  const noResultsSpacer = document.createElement('hr');
  const noResultsText = document.createElement('p');
  const noResultsProps = {
    ...props,
    numberOfRowsToStart: 3,
    numberOfColumnsToShow: 1,
    lazyLoad: false,
    isTypeGrid: false,
    isTypeList: true,
  };

  delete noResultsProps.categories;
  container.appendChild(noResultsContainer);
  noResultsContainer.classList.add(ELEMENT_FEEDS_EVENTS_NO_RESULTS);

  noResultsText.innerHTML = 'Other Events';

  NoResults.DisplayElement({
    container: noResultsContainer,
    ...NoResultsContent,
  });

  noResultsContainer.appendChild(noResultsSpacer);
  noResultsContainer.appendChild(noResultsText);

  Fetch.Entries({
    variables: MakeApiVariables(noResultsProps),
  }).then((feedData) => {
    if (feedData.length > 0) {
      LayoutGridGap.CreateElement({ container: noResultsContainer, count: 1 });
      DisplayEntries({ ...noResultsProps, feedData });
      setTotalEntries(3);
    }
  });
};

const CreateFeed = (props: TypeFeedProps) => {
  const { getContainer, numberOfColumnsToShow } = props;
  const container = getContainer();

  Fetch.Entries({
    variables: MakeApiVariables(props),
  }).then((feedData) => {
    const count = 'numberOfColumnsToShow' in props ? numberOfColumnsToShow : 1;

    if (feedData.length === 0) {
      CreateNoResult(props);
    }

    if (feedData.length > 0) {
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
