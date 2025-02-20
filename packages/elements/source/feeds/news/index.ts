import buttonLazyLoad from '../elements/lazy-load';
import { GridGap as LayoutGridGap } from 'layout';
import { AriaLive, AnimationLoader } from 'macros';
import FeedDisplay, { ArticleType } from './display';
import Fetch, { TypeAPIFeedVariables } from './api';
import NoResults from '../no-results';

const FEEDS_NEWS_CONTAINER = 'umd-feeds-news-container';

export type TypeNewsFeedRequirements = {
  token: string;
  isThemeDark?: boolean;
  numberOfRowsToStart: number;
  numberOfColumnsToShow?: number;
  categories?: string[];
  isLazyLoad: boolean;
  isUnion: boolean;
  isTypeGrid?: boolean;
  isTypeOverlay?: boolean;
  isTypeList?: boolean;
  isTypeFeatured?: boolean;
  isTransparent?: boolean;
  isLayoutReversed?: boolean;
  entriesToRemove?: string[];
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
  ${buttonLazyLoad.styles}
  ${AnimationLoader.Styles}
  ${FeedDisplay.Styles}
`;

const NoResultsContent = {
  message: 'No results found',
  linkUrl: 'https://today.umd.edu',
  linkText: 'View all articles',
};

const MakeApiVariables = ({
  getContainer,
  isUnion,
  categories,
  getOffset,
  token,
  numberOfColumnsToShow,
  numberOfRowsToStart,
  entriesToRemove,
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

  if (entriesToRemove) {
    obj.not = ['not', ...entriesToRemove];
  }

  return obj;
};

const MakeLazyLoadVariables = (props: TypeFeedProps) => ({
  ...props,
  totalEntries: props.getTotalEntries(),
  offset: props.getOffset(),
  container: props.getContainer(),
  callback: () => LoadMoreEntries(props),
});

const DisplayEntries = (props: TypeDisplayEntries) => {
  const {
    isTypeGrid,
    isTypeOverlay,
    isTypeFeatured,
    getContainer,
    setOffset,
    feedData,
    isThemeDark,
    isTransparent,
    isLayoutReversed,
  } = props;
  const container = getContainer();
  const grid = container.querySelector(
    `.${LayoutGridGap.ID}`,
  ) as HTMLDivElement;

  const displayEntries = FeedDisplay.CreateElement({
    entries: feedData,
    isTypeGrid,
    isTypeOverlay,
    isTypeFeatured,
    isThemeDark,
    isTransparent,
  });

  setOffset(displayEntries.length);

  if (isLayoutReversed) grid.setAttribute('data-reversed', '');

  AnimationLoader.Remove({ container });
  buttonLazyLoad.remove({ container });
  displayEntries.forEach((entry) => {
    if (entry) grid.appendChild(entry);
  });
  buttonLazyLoad.display(MakeLazyLoadVariables(props));
};

const LoadMoreEntries = async (props: TypeFeedProps) => {
  const { getContainer, getOffset } = props;
  const container = getContainer();
  const currentCount = getOffset();

  buttonLazyLoad.remove({ container });
  AnimationLoader.Display({ container });
  Fetch.Entries({
    variables: MakeApiVariables(props),
  }).then((feedData) => {
    DisplayEntries({ ...props, feedData: feedData.entries });

    AriaLive.Update({
      container,
      message: `Showing ${
        currentCount + feedData.entries.length
      } of ${props.getTotalEntries()} articles`,
    });
  });
};

const CreateFeed = async (props: TypeFeedProps) => {
  const {
    getContainer,
    numberOfColumnsToShow,
    setTotalEntries,
    isTypeOverlay,
    isLazyLoad,
  } = props;
  const container = getContainer();
  let count = 1;
  let isTypeGap = true;

  if (numberOfColumnsToShow) {
    count = numberOfColumnsToShow;
  }

  Fetch.Entries({
    variables: MakeApiVariables(props),
  }).then((feedData) => {
    const totalEntries = feedData.count;

    if (totalEntries === 0) {
      NoResults.DisplayElement({ container, ...NoResultsContent });
      container.appendChild(
        AriaLive.Create({
          message: NoResultsContent.message,
        }),
      );

      return;
    }

    const showAmount = count * props.numberOfRowsToStart;
    const message = isLazyLoad
      ? `Showing ${showAmount} of ${totalEntries} articles`
      : `Showing ${showAmount} articles`;

    if (isTypeOverlay) isTypeGap = false;

    setTotalEntries(totalEntries);

    LayoutGridGap.CreateElement({ container, count, isTypeGap });
    DisplayEntries({ ...props, feedData: feedData.entries });

    container.appendChild(
      AriaLive.Create({
        message,
      }),
    );
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
