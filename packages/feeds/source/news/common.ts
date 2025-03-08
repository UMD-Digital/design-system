import { Utilities } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import Fetch, { TypeAPIFeedVariables } from './api';
import {
  DisplayResultsProps,
  NoResultsProps,
  FeedDisplay,
  EntryType,
  HelperFunctionProps,
  BlockProps,
  ListProps,
} from './_types';

interface CommonProps extends HelperFunctionProps, BlockProps, ListProps {}

interface DisplayProps extends CommonProps, DisplayResultsProps {}

interface DisplayStartProps extends DisplayProps, FeedDisplay {}

interface DataApiProps extends CommonProps {}

interface LoadMoreProps extends DisplayProps {}

interface DisplayLoadProps extends DisplayProps {
  entries: { element: HTMLElement; styles: string }[];
}

interface LazyLoadProps extends DisplayProps {
  callback: (props: DisplayStartProps) => Promise<void>;
}

interface CreateProps extends DisplayProps {
  displayResultStart: (props: DisplayStartProps) => void;
  displayNoResults: (props: NoResultsProps) => void;
}

export const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

export const dataLazyLoadVariables = (props: LazyLoadProps) => ({
  ...props,
  totalEntries: props.getTotalEntries(),
  offset: props.getOffset(),
  container: props.getContainer(),
  callback: () => loadMoreEntries(props),
});

export const dataApiVariables = (props: DataApiProps): TypeAPIFeedVariables => {
  const {
    getContainer,
    isUnion,
    categories,
    getOffset,
    token,
    numberOfRowsToStart,
    numberOfColumnsToShow = 1,
    entriesToRemove,
  } = props;
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

export const dataDisplay = ({
  entry,
  isThemeDark,
}: {
  entry: EntryType;
  isThemeDark?: boolean;
  isTransparent?: boolean;
}) => ({
  newsId: entry.id.toString(),
  headline: feedElements.text.headline({
    text: entry.title,
    url: entry.url,
  }),
  text: feedElements.text.summary({ text: entry.summary }),
  date: feedElements.text.date({
    date: entry.date,
    dateFormatted: entry.dateFormatted,
  }),
  isThemeDark,
});

export const setShadowStyles = async ({
  shadowRoot,
  styles,
}: {
  shadowRoot: ShadowRoot;
  styles: string;
}) => {
  const styleElement = document.createElement('style');
  const optimizedCss = await Utilities.styles.optimizedCss(styles);
  styleElement.textContent = optimizedCss;
  shadowRoot.appendChild(styleElement);
};

export const loadMoreEntries = async (props: LoadMoreProps) => {
  const { getContainer, getOffset, displayResults, getTotalEntries } = props;
  const container = getContainer();
  const currentCount = getOffset();
  const totalEntries = getTotalEntries();

  feedElements.buttonLazyLoad.remove({ container });
  feedElements.loader.display({ container });

  Fetch.Entries({
    variables: dataApiVariables(props),
  }).then((feedData) => {
    displayResults({ feedData: feedData.entries });

    feedElements.ariaLive.update({
      container,
      message: `Showing ${
        currentCount + feedData.entries.length
      } of ${totalEntries} articles`,
    });
  });
};

export const displayResultLoad = async (
  props: DisplayLoadProps,
): Promise<void> => {
  const { entries, getContainer, setStyles } = props;
  const container = getContainer();
  const grid = container.querySelector(
    `#${ID_GRID_LAYOUT_CONTAINER}`,
  ) as HTMLDivElement;

  feedElements.loader.remove({ container });
  feedElements.buttonLazyLoad.remove({ container });

  return new Promise<void>((resolve) => {
    entries.forEach((entry) => {
      grid.appendChild(entry.element);
      setStyles(entry.styles);
    });

    feedElements.buttonLazyLoad.display(
      dataLazyLoadVariables({
        ...props,
        callback: loadMoreEntries,
      }),
    );
    resolve();
  });
};

export const displayResultStart = (props: DisplayStartProps) => {
  const {
    feedData,
    numberOfColumnsToShow = 1,
    numberOfRowsToStart,
    isLazyLoad,
    isTypeOverlay,
    displayResults,
    getContainer,
    getTotalEntries,
    setOffset,
    setTotalEntries,
    setStyles,
  } = props;

  const grid = feedElements.grid({
    count: numberOfColumnsToShow,
    isTypeGap: !isTypeOverlay,
  });
  const container = getContainer();
  const totalEntries = getTotalEntries();
  const showAmount = numberOfColumnsToShow || 1 * numberOfRowsToStart;
  const message = isLazyLoad
    ? `Showing ${showAmount} of ${totalEntries} articles`
    : `Showing ${showAmount} articles`;

  setOffset(feedData.length);

  if (totalEntries) setTotalEntries(totalEntries);

  grid.element.setAttribute('id', ID_GRID_LAYOUT_CONTAINER);
  container.appendChild(grid.element);
  setStyles(grid.styles);

  displayResults({ feedData });
  container.appendChild(
    feedElements.ariaLive.create({
      message,
    }),
  );
};

export const displayNoResults = ({
  container,
  message = 'No results found',
  linkUrl = 'https://today.umd.edu',
  linkText = 'View all articles',
}: NoResultsProps) => {
  const noResultsContent = feedElements.noResults({
    message,
    linkUrl,
    linkText,
  });
  const ariaLiveContent = feedElements.ariaLive.create({
    message,
  });

  container.innerHTML = '';

  container.appendChild(noResultsContent.element);
  container.appendChild(ariaLiveContent);
};

export const createFeed = async (props: CreateProps) => {
  const { displayNoResults, displayResultStart } = props;

  Fetch.Entries({
    variables: dataApiVariables(props),
  }).then((feedData) => {
    const totalEntries = feedData.count;

    if (totalEntries === 0) {
      displayNoResults({ container: props.getContainer() });
      return;
    }

    return displayResultStart({ ...props, feedData: feedData.entries });
  });
};
