import { Tokens, Elements } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import { AnimationLoader, ButtonLazyLoad, LayoutGridGap } from 'macros';
import FeedDisplay, { EventType } from './display';
import Fetch, { TypeAPIFeedVariables } from './api';
import NoResults from '../no-results';

export type TypeEventFeedRequirements = {
  token: string;
  numberOfRowsToStart: number;
  numberOfColumnsToShow?: number;
  categories?: string[];
  isLazyLoad: boolean;
  isUnion: boolean;
  isTypeGrid?: boolean;
  isTypeList?: boolean;
  isTypeGrouped?: boolean;
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
const ELEMENT_FEEDS_EVENTS_GROUPED_HEADLINE = 'feeds-events-grouped-headline';
const ELEMENT_FEEDS_EVENTS_GROUPED_CONTAINER = 'feeds-events-grouped-container';
const ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE = 'text-lockup-small-headline';

const { ConvertJSSObjectToStyles } = Styles;
const { Eyebrow } = Elements;
const { Colors, Spacing, Breakpoints } = Tokens;

const EventsGrouped = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_FEEDS_EVENTS_GROUPED_HEADLINE}`]: Eyebrow.Ribbon,
    },
  })}

  .${ELEMENT_FEEDS_EVENTS_GROUPED_HEADLINE} {
    margin-bottom: ${Spacing.lg};
  }

  .${ELEMENT_FEEDS_EVENTS_GROUPED_CONTAINER} {
    margin-bottom: ${Spacing.lg};
  }
`;

const EventsNoResults = `
  .${ELEMENT_FEEDS_EVENTS_NO_RESULTS} hr {
    border: none;
    background-color: ${Colors.black};
    height: 1px;
    margin-bottom: ${Spacing.md};
  }

  @media (min-width: ${Breakpoints.tablet.min}) {
    .${ELEMENT_FEEDS_EVENTS_NO_RESULTS} hr {
      margin-top: ${Spacing.md};
    }
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
  .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} * {
    color: ${Colors.black} !important;
  }

  ${NoResults.Styles}
  ${LayoutGridGap.Styles}
  ${ButtonLazyLoad.Styles}
  ${AnimationLoader.Styles}
  ${FeedDisplay.Styles}
  ${EventsNoResults}
  ${EventsGrouped}
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

  if (!isUnion && categories) {
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

const DisplayDefault = (props: TypeDisplayEntries) => {
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
  entries.forEach((entry) => {
    grid.appendChild(entry);
  });
};

const DisplayGrouped = (props: TypeDisplayEntries) => {
  const { getContainer, setOffset, feedData } = props;
  const container = getContainer();
  const aggregatedEntries = FeedDisplay.CreateGroupedElement({
    entries: feedData,
  });
  const entriesLength = aggregatedEntries.reduce((acc, entries) => {
    return acc + entries.entries.length;
  }, 0);

  setOffset(entriesLength);

  aggregatedEntries.forEach((group) => {
    const id = `feeds-group-${group.timestamp}`;
    const existingGroup = container.querySelector(`#${id}`);

    if (existingGroup) {
      group.entries.forEach((entry) => {
        existingGroup.appendChild(entry);
      });
    } else {
      const groupContainer = document.createElement('div');
      const groupHeader = document.createElement('h2');

      groupHeader.innerHTML = group.dateBanner;
      groupHeader.classList.add(ELEMENT_FEEDS_EVENTS_GROUPED_HEADLINE);

      groupContainer.setAttribute('id', id);
      groupContainer.classList.add(ELEMENT_FEEDS_EVENTS_GROUPED_CONTAINER);
      groupContainer.appendChild(groupHeader);

      group.entries.forEach((entry) => {
        groupContainer.appendChild(entry);
      });

      container.appendChild(groupContainer);
    }
  });
};

const DisplayEntries = (props: TypeDisplayEntries) => {
  const { isTypeGrouped, getContainer } = props;
  const container = getContainer();

  AnimationLoader.Remove({ container });
  ButtonLazyLoad.Remove({ container });
  if (isTypeGrouped) {
    DisplayGrouped(props);
  } else {
    DisplayDefault(props);
  }
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
  AnimationLoader.Display({ container });
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
    const loader = AnimationLoader.Create();
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
