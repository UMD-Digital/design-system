import { Utilities } from '@universityofmaryland/web-elements-library';
import * as feedMacros from 'macros';
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
  const noResultsContent = feedMacros.noResults({
    message,
    linkUrl,
    linkText,
  });
  const ariaLiveContent = feedMacros.ariaLive.create({
    message,
  });

  container.innerHTML = '';

  container.appendChild(noResultsContent.element);
  container.appendChild(ariaLiveContent);
};

export const resultLoad = async (props: DisplayLoadProps): Promise<void> => {
  const { entries, getContainer, setStyles, setOffset } = props;
  const container = getContainer();
  const grid = container.querySelector(
    `#${ID_GRID_LAYOUT_CONTAINER}`,
  ) as HTMLDivElement;

  feedMacros.loader.remove({ container });
  feedMacros.buttonLazyLoad.remove({ container });
  setOffset(entries.length);

  return new Promise<void>((resolve) => {
    entries.forEach((entry) => {
      grid.appendChild(entry.element);
      setStyles(entry.styles);
    });

    const lazyLoadButton = feedMacros.buttonLazyLoad.create(
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
    feedMacros.ariaLive.create({
      message,
    }),
  );
};
