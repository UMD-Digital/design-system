import { Utilities } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedFetch from './fetch';
import * as dataComposed from './data';
import {
  NoResultsProps,
  DisplayStartResultsProps,
  DisplayProps,
} from '../_types';

interface DisplayLoadProps extends DisplayProps {
  entries: { element: HTMLElement; styles: string }[];
}

export const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

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

export const noResults = ({
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

export const resultLoad = async (props: DisplayLoadProps): Promise<void> => {
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

    const lazyLoadButton = feedElements.buttonLazyLoad.create(
      dataComposed.lazyLoadVariables({
        ...props,
        callback: feedFetch.load,
      }),
    );

    if (lazyLoadButton) {
      container.appendChild(lazyLoadButton.element);
      setStyles(lazyLoadButton.styles);
    }

    resolve();
  });
};

export const resultStart = (props: DisplayStartResultsProps) => {
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
    layoutElement,
  } = props;

  const container = getContainer();
  const totalEntries = getTotalEntries();
  const showAmount = numberOfColumnsToShow || 1 * numberOfRowsToStart;
  const message = isLazyLoad
    ? `Showing ${showAmount} of ${totalEntries} articles`
    : `Showing ${showAmount} articles`;

  setOffset(feedData.length);

  if (totalEntries) setTotalEntries(totalEntries);

  layoutElement.element.setAttribute('id', ID_GRID_LAYOUT_CONTAINER);
  container.appendChild(layoutElement.element);
  setStyles(layoutElement.styles);

  displayResults({ feedData });
  container.appendChild(
    feedElements.ariaLive.create({
      message,
    }),
  );
};
