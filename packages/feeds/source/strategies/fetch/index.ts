/**
 * Fetch Strategies
 *
 * Strategies for fetching feed data from APIs.
 * Each strategy handles API-specific details like queries, transformations, and variables.
 *
 * @module strategies/fetch
 */

export { createGraphQLFetchStrategy } from './graphql';
export type { GraphQLFetchConfig } from './graphql';

export { eventsFetchStrategy, eventsFetchStrategyRange } from './events';
export { EVENTS_QUERY, EVENTS_COUNT_QUERY, EVENTS_SLIDER_QUERY } from './events';

export { newsFetchStrategy } from './news';
export { ARTICLES_QUERY } from './news';

export { expertsFetchStrategy } from './experts';
export { EXPERTS_QUERY } from './experts';

export { ACADEMIC_SLIDER_QUERY } from './academic';
