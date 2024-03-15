import { Tokens } from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { FetchGraphQL } from 'helpers/xhr';
import { ARTICLES_QUERY } from 'helpers/queries';
import { CreateArticleCards, STYLES_ARTICLE } from 'elements/article';
import { CreateGridGapLayout, STYLES_GRID_LAYOUT } from 'elements/grid';
import {
  CreateCallToActionElement,
  STYLES_CALL_TO_ACTION_ELEMENT,
} from 'elements/call-to-action';
import {
  CreateNoResultsInterface,
  STYLES_NO_RESULTS,
  NoResultsContentType,
} from 'elements/no-results';
import { MakeLoader, STYLES_LOADER } from 'elements/loader';
import { UMDNewsFeedType } from '../component';

type VariablesType = {
  related?: string[];
  limit?: number;
  offset?: number;
};

const { Spacing } = Tokens;

const FEEDS_NEWS_CONTAINER = 'umd-feeds-news-container';
const LAZY_LOAD_BUTTON = 'umd-feeds-news-lazy-load-button';

const TODAY_PRODUCTION_URL = 'https://today.umd.edu/graphql';

const LazyLoadButtonStyles = `
  .${LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${Spacing.lg};
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_GRID_LAYOUT}
  ${LazyLoadButtonStyles}
  ${STYLES_ARTICLE}
  ${STYLES_CALL_TO_ACTION_ELEMENT}
  ${STYLES_NO_RESULTS}
  ${STYLES_LOADER}
`;

const NoResultsContent: NoResultsContentType = {
  message: 'No results found',
  linkUrl: 'https://today.umd.edu',
  linkText: 'View All Articles',
};

const CheckForLazyLoad = ({ element }: { element: UMDNewsFeedType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${LAZY_LOAD_BUTTON}`,
  ) as HTMLDivElement;

  if (!container) return;
  if (!element._lazyLoad) return;
  if (!element._totalEntries) {
    container.remove();
    return;
  }

  if (element._offset >= element._totalEntries) {
    container.remove();
  }
};

const CreateLazyLoadButton = ({ element }: { element: UMDNewsFeedType }) => {
  const container = document.createElement('div');
  const button = document.createElement('button');
  button.innerHTML = 'Load More';
  button.addEventListener('click', () => {
    LoadMoreEntries({ element });
  });

  const ctaButton = CreateCallToActionElement({
    cta: button,
    type: 'outline',
  });

  container.classList.add(LAZY_LOAD_BUTTON);
  container.appendChild(ctaButton);

  return container;
};

const LoadMoreEntries = async ({ element }: { element: UMDNewsFeedType }) => {
  const loader = MakeLoader();
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_NEWS_CONTAINER}`,
  ) as HTMLDivElement;
  const gridContainer = container.querySelector(`[grid-count]`);

  if (!gridContainer) return;
  container.appendChild(loader);

  if (container) {
    const feedData = await FetchFeed({ element });
    const entries = CreateArticleCards({ entries: feedData });

    loader.remove();

    entries.forEach((entry) => {
      gridContainer.appendChild(entry);
    });
  }
};

const FetchFeed = async ({ element }: { element: UMDNewsFeedType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_NEWS_CONTAINER}`,
  ) as HTMLDivElement;
  if (!element._token) throw new Error('Token not found');

  const variables: VariablesType = {
    limit: element._showCount * element._showRows,
    related: element._categories,
    offset: element._offset,
  };

  const feedData = await FetchGraphQL({
    query: ARTICLES_QUERY,
    url: TODAY_PRODUCTION_URL,
    token: element._token,
    variables,
  });

  if (
    !feedData ||
    !feedData.data ||
    !feedData.data.entries ||
    feedData.message
  ) {
    CreateNoResultsInterface({ container, ...NoResultsContent });
    if (!feedData) throw new Error('Feed not found');
    if (!feedData.data) throw new Error('Feed data not found');
    if (!feedData.data.entries) throw new Error('Feed entries not found');
    if (!feedData.message)
      throw new Error(`Feed data errors: ${feedData.message}`);
  }

  if (feedData.data.entryCount) {
    element._totalEntries = feedData.data.entryCount;
  }

  if (feedData.data.entries) {
    element._offset += feedData.data.entries.length;
    CheckForLazyLoad({ element });
    return feedData.data.entries;
  }

  return null;
};

export const CreateFeed = async ({ element }: { element: UMDNewsFeedType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_NEWS_CONTAINER}`,
  ) as HTMLDivElement;
  const feedData = await FetchFeed({ element });
  const lazyLoadButton = CreateLazyLoadButton({ element });

  if (!container) {
    throw new Error('Container not found');
  }

  if (feedData.length === 0) {
    container.innerHTML = '';
    CreateNoResultsInterface({ container, ...NoResultsContent });
    return container;
  }

  if (feedData.length > 0) {
    const entries = CreateArticleCards({ entries: feedData });
    const grid = CreateGridGapLayout({ count: element._showCount });

    entries.forEach((entry) => {
      grid.appendChild(entry);
    });

    container.innerHTML = '';
    container.appendChild(grid);

    if (element._lazyLoad) container.appendChild(lazyLoadButton);
  }
};

export const CreateShadowDom = ({ element }: { element: UMDNewsFeedType }) => {
  const loader = MakeLoader();
  const container = document.createElement('div');

  container.classList.add(FEEDS_NEWS_CONTAINER);
  container.appendChild(loader);

  return container;
};
