/**
 * Feed Strategies
 *
 * Strategy patterns for composable, reusable feeds.
 * Separate concerns into fetch, display, and layout strategies.
 *
 * @module strategies
 *
 * @example
 * ```typescript
 * import { createBaseFeed } from './factory';
 * import {
 *   eventsFetchStrategy,
 *   eventsDisplayStrategy,
 *   gridGapLayout,
 * } from './strategies';
 *
 * const feed = createBaseFeed({
 *   token: 'my-token',
 *   numberOfRowsToStart: 2,
 *   fetchStrategy: eventsFetchStrategy,
 *   displayStrategy: eventsDisplayStrategy,
 *   layoutStrategy: gridGapLayout,
 * });
 * ```
 */

// Display strategies
export {
  eventsDisplayStrategy,
  newsDisplayStrategy,
  expertsDisplayStrategy,
} from './display';

export type { EventType, NewsEntryType, ExpertType } from './display';

// Fetch strategies
export {
  createGraphQLFetchStrategy,
  eventsFetchStrategy,
  eventsFetchStrategyRange,
  newsFetchStrategy,
} from './fetch';

export type { GraphQLFetchConfig } from './fetch';

// Layout strategies
export {
  gridLayout,
  gridGapLayout,
  stackedLayout,
  gridOffsetLayout,
  createFeaturedLayoutStrategy,
} from './layout';

export type { FeaturedLayoutConfig } from './layout';
