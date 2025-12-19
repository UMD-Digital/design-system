/**
 * News Fetch Strategy
 *
 * Strategy for fetching news article data from the Maryland Today GraphQL API.
 *
 * @module strategies/fetch/news
 */

import { createGraphQLFetchStrategy } from './graphql';
import { NewsEntry } from 'types/data';

/**
 * GraphQL fragments for news article data
 */
const FRAGMENT_ARTICLE_BASIC = `
  fragment ArticleBasicFields on articles_today_Entry {
    id
    title
    url
  }
`;

const FRAGMENT_ARTICLE_DATES = `
  fragment ArticleDateFields on articles_today_Entry {
    date: postDate
    dateFormatted: postDate @formatDateTime(format: "M d, Y")
  }
`;

const FRAGMENT_ARTICLE_CONTENT = `
  fragment ArticleContentFields on articles_today_Entry {
    summary: genericText
    image: articlesHeroImage {
      url
      ... on hero_Asset {
        id
        altText: genericText
      }
    }
  }
`;

const FRAGMENT_ARTICLE_CATEGORIES = `
  fragment ArticleCategoryFields on articles_today_Entry {
    categories: categoryTodaySectionMultiple {
      title
      url
    }
  }
`;

/**
 * GraphQL query for news articles
 */
export const ARTICLES_QUERY = `
  query getArticles($related: [QueryArgument], $relatedToAll: [QueryArgument], $limit: Int, $offset: Int, $not: [QueryArgument]) {
    entryCount(section: "articles", relatedTo: $related, relatedToAll: $relatedToAll)
    entries(
      section: "articles",
      relatedTo: $related,
      relatedToAll: $relatedToAll,
      limit: $limit,
      offset: $offset,
      id: $not
    ) {
      ... on articles_today_Entry {
        ...ArticleBasicFields
        ...ArticleDateFields
        ...ArticleContentFields
        ...ArticleCategoryFields
      }
    }
  }
  ${FRAGMENT_ARTICLE_BASIC}
  ${FRAGMENT_ARTICLE_DATES}
  ${FRAGMENT_ARTICLE_CONTENT}
  ${FRAGMENT_ARTICLE_CATEGORIES}
`;

/**
 * News fetch strategy
 *
 * Fetches news article data from the Maryland Today GraphQL API.
 * Handles category filtering (both union and intersection), pagination,
 * and entry exclusion.
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   token: 'my-token',
 *   fetchStrategy: newsFetchStrategy,
 *   categories: ['research', 'campus-news'],
 *   // ...
 * });
 * ```
 */
export const newsFetchStrategy = createGraphQLFetchStrategy<NewsEntry>({
  endpoint: 'https://today.umd.edu/graphql',

  queries: {
    entries: ARTICLES_QUERY,
  },

  transformResponse: (data) => {
    if (!data || !data.data || !data.data.entries) {
      return null;
    }
    return data.data.entries || null;
  },

  transformCount: (data) => {
    if (!data || !data.data) {
      return 0;
    }
    return data.data.entryCount || 0;
  },

  composeVariables: (baseVariables) => {
    const { categories, isUnion, entriesToRemove, ...rest } = baseVariables;

    const variables: any = { ...rest };

    // Handle categories (union vs intersection)
    if (!isUnion && categories) {
      variables.relatedToAll = categories;
    }

    if (isUnion && categories) {
      variables.related = categories;
    }

    // Handle entry exclusion
    if (entriesToRemove) {
      variables.not = ['not', ...entriesToRemove];
    }

    return variables;
  },
});
