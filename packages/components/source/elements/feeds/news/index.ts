import { AnimationLoader, ButtonLazyLoad, LayoutGridGap } from 'macros';
import FeedDisplay, { ArticleType } from './display';
import Fetch, { TypeAPIFeedVariables } from './api';
import NoResults from '../no-results';

const FEEDS_NEWS_CONTAINER = 'umd-feeds-news-container';

export type TypeNewsFeedRequirements = {
  token: string;
  numberOfRowsToStart: number;
  numberOfColumnsToShow?: number;
  categories?: string[];
  isLazyLoad: boolean;
  isUnion: boolean;
  isTypeGrid?: boolean;
  isTypeList?: boolean;
};

type TypeFeedProps = TypeNewsFeedRequirements & {
  getOffset: () => number;
  getTotalEntries: () => number | null;
  getContainer: () => HTMLDivElement;
  setTotalEntries: (count: number) => void;
  setOffset: (count: number) => void;
};

type TypeDisplayEntries = TypeFeedProps & {
  feedData: ArticleType[];
};

const STYLES_FEED_NEWS_ELEMENT = `
  ${NoResults.Styles}
  ${LayoutGridGap.Styles}
  ${ButtonLazyLoad.Styles}
  ${AnimationLoader.Styles}
  ${FeedDisplay.Styles}
`;

const NoResultsContent = {
  message: 'No results found',
  linkUrl: 'https://today.umd.edu',
  linkText: 'View All Articles',
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
    offset: getOffset(),
    token,
    limit: numberOfRowsToStart,
  };

  if (numberOfColumnsToShow) {
    obj.limit = numberOfColumnsToShow * numberOfRowsToStart;
  }

  if (!isUnion && categories) {
    obj.relatedToAll = categories;
  }

  if (isUnion && categories) {
    obj.related = categories;
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
  const displayEntries = FeedDisplay.CreateElement({
    entries: feedData,
    isTypeGrid,
  });

  setOffset(displayEntries.length);

  AnimationLoader.Remove({ container });
  ButtonLazyLoad.Remove({ container });
  displayEntries.forEach((entry) => {
    grid.appendChild(entry);
  });
  ButtonLazyLoad.Display(MakeLazyLoadVariables(props));
};

const LoadMoreEntries = async (props: TypeFeedProps) => {
  const { getContainer } = props;
  const container = getContainer();

  ButtonLazyLoad.Remove({ container });
  AnimationLoader.Display({ container });
  Fetch.Entries({
    variables: MakeApiVariables(props),
  }).then((feedData) => {
    DisplayEntries({ ...props, feedData: feedData.entries });
  });
};

const CreateFeed = async (props: TypeFeedProps) => {
  const { getContainer, numberOfColumnsToShow, setTotalEntries } = props;
  const container = getContainer();

  Fetch.Entries({
    variables: MakeApiVariables(props),
  }).then((feedData) => {
    const totalEntries = feedData.count;

    if (totalEntries === 0) {
      NoResults.DisplayElement({ container, ...NoResultsContent });
      return;
    }

    if (totalEntries > 0) {
      const count =
        'numberOfColumnsToShow' in props ? numberOfColumnsToShow : 1;

      setTotalEntries(totalEntries);

      LayoutGridGap.CreateElement({ container, count });
      DisplayEntries({ ...props, feedData: feedData.entries });
    }
  });
};

const CreateFeedsEventElement = (props: TypeNewsFeedRequirements) =>
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

    elementContainer.classList.add(FEEDS_NEWS_CONTAINER);
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
  Styles: STYLES_FEED_NEWS_ELEMENT,
};
