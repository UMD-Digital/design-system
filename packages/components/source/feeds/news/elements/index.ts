import { spacing, umdGrid } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { FetchGraphQL } from 'helpers/xhr';
import { CreateEntries, STYLES_ARTICLE } from 'elements/article';
import {
  CreateCallToActionElement,
  STYLES_CALL_TO_ACTION_ELEMENT,
} from 'elements/call-to-action';
import {
  CreateNoResultsInterface,
  STYLES_NO_RESULTS,
  NoResultsContentType,
} from 'elements/no-results';
import { UMDNewsFeedType } from '../component';

type VariablesType = {
  related?: string[];
  limit?: number;
  offset?: number;
};

const FEEDS_NEWS_CONTAINER = 'umd-feeds-news-container';
const LAYOUT_CONTAINER = 'umd-feeds-news-layout-container';
const LAZY_LOAD_BUTTON = 'umd-feeds-news-lazy-load-button';

const TODAY_PRODUCTION_URL = 'https://today.umd.edu/graphql';
const ARTICLES_QUERY = `
  query getArticlesByCategories($related: [QueryArgument], $limit: Int, $offset: Int) {
    entryCount(section: "articles", relatedTo: $related)
    entries(
      section: "articles",
      relatedTo: $related,
      limit: $limit,
      offset: $offset,
    ) {
      ... on articles_today_Entry {
        id
        title
        date: postDate
        dateFormatted: postDate @formatDateTime(format: "M d, Y")
        summary: genericText
        url
        image:articlesHeroImage {
          url
          ... on hero_Asset {
            id
            altText: genericText
          }
        }
        categories:categoryTodaySectionMultiple {
          title
          url
        }
      }
    }
  }
`;

const LazyLoadButtonStyles = `
  .${LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${spacing.lg};
  }
`;

const LayoutStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="2"]`]: umdGrid['.umd-grid'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="3"]`]: umdGrid['.umd-grid-three'],
    },
  })}


  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="4"]`]: umdGrid['.umd-grid-four'],
    },
  })}
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${LayoutStyles}
  ${LazyLoadButtonStyles}
  ${STYLES_ARTICLE}
  ${STYLES_CALL_TO_ACTION_ELEMENT}
  ${STYLES_NO_RESULTS}
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

const CreateGridLayout = ({ element }: { element: UMDNewsFeedType }) => {
  const container = document.createElement('div');

  container.classList.add(LAYOUT_CONTAINER);
  container.setAttribute('grid-count', `${element._showCount}`);

  return container;
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
  const feedData = await FetchFeed({ element });
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${LAYOUT_CONTAINER}`,
  ) as HTMLDivElement;
  const entries = CreateEntries({ entries: feedData });

  entries.forEach((entry) => {
    container.appendChild(entry);
  });
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

export const CreateShadowDom = async ({
  element,
}: {
  element: UMDNewsFeedType;
}) => {
  const feedData = await FetchFeed({ element });
  const container = document.createElement('div');
  const lazyLoadButton = CreateLazyLoadButton({ element });

  if (feedData.length === 0) {
    CreateNoResultsInterface({ container, ...NoResultsContent });
    return container;
  }

  const entries = CreateEntries({ entries: feedData });
  const grid = CreateGridLayout({ element });

  entries.forEach((entry) => {
    grid.appendChild(entry);
  });

  container.classList.add(FEEDS_NEWS_CONTAINER);
  container.appendChild(grid);

  if (element._lazyLoad) container.appendChild(lazyLoadButton);

  return container;
};
