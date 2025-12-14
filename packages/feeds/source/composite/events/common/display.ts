import * as Styles from '@universityofmaryland/web-styles-library';
import { EmptyState, Announcer, PaginationState, LoadingState } from 'states';
import * as feedFetch from './fetch';
import * as dataComposed from './data';
import { events } from '../../../utilities';
import {
  NoResultsProps,
  DisplayStartResultsProps,
  DisplayProps,
} from '../_types';

interface DisplayLoadProps extends DisplayProps {
  entries: { element: HTMLElement; styles: string }[];
  query?: string;
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
  const optimizedCss = await Styles.utilities.transform.css.removeDuplicates(
    styles,
  );
  styleElement.textContent = optimizedCss;
  shadowRoot.appendChild(styleElement);
};

export const noResults = ({
  getContainer,
  getStyles,
  getShadowRoot,
  setStyles,
  isThemeDark,
  message = 'No events found',
  linkUrl = 'https://calendar.umd.edu',
  linkText = 'View all events',
}: NoResultsProps) => {
  const container = getContainer();
  const shadowRoot = getShadowRoot();

  // Use new class-based EmptyState API
  const emptyState = new EmptyState({
    message,
    linkUrl,
    linkText,
    isThemeDark,
  });

  // Use new class-based Announcer API
  const announcer = new Announcer({ message });

  container.innerHTML = '';

  emptyState.render(container);
  container.appendChild(announcer.getElement());
  setStyles(emptyState.styles);

  events.dispatch(container, events.eventNames.FEED_ERROR, {
    error: 'No results found',
    message,
  });

  setTimeout(() => {
    const styles = getStyles();
    if (shadowRoot) {
      setShadowStyles({
        shadowRoot,
        styles,
      });
    }
  }, 100);
};

export const resultLoad = async (props: DisplayLoadProps): Promise<void> => {
  const { entries, getContainer, setStyles, setOffset } = props;
  const container = getContainer();
  const grid = container.querySelector(
    `#${ID_GRID_LAYOUT_CONTAINER}`,
  ) as HTMLDivElement;

  // Remove existing loading and pagination states using new API
  const existingLoader = container.querySelector('.umd-loader-container');
  existingLoader?.remove();

  const existingPagination = container.querySelector(
    `.${Styles.layout.alignment.block.center.className}`
  );
  existingPagination?.remove();

  setOffset(entries.length);

  return new Promise<void>((resolve) => {
    entries.forEach((entry) => {
      grid.appendChild(entry.element);
      setStyles(entry.styles);
    });

    const callback = () => feedFetch.load(props);
    const lazyLoadVariables = dataComposed.lazyLoadVariables({
      ...props,
      callback,
    });

    // Use new class-based PaginationState API
    const pagination = new PaginationState(lazyLoadVariables);
    const paginationElement = pagination.render(container);

    if (paginationElement) {
      setStyles(paginationElement.styles);
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
    setStyles,
    layoutElement,
  } = props;

  const container = getContainer();
  const totalEntries = getTotalEntries();
  const showAmount = numberOfColumnsToShow || 1 * numberOfRowsToStart;
  const message = isLazyLoad
    ? `Showing ${showAmount} of ${totalEntries} articles`
    : `Showing ${showAmount} articles`;

  layoutElement.element.setAttribute('id', ID_GRID_LAYOUT_CONTAINER);
  container.appendChild(layoutElement.element);
  setStyles(layoutElement.styles);

  events.dispatch(container, events.eventNames.FEED_LOADED, {
    items: feedData,
    count: feedData.length,
    total: totalEntries || feedData.length,
  });

  displayResults({ feedData });

  // Use new class-based Announcer API
  const announcer = new Announcer({ message });
  container.appendChild(announcer.getElement());
};
