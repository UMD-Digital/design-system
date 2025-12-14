/**
 * Feed Factory Module
 *
 * Factory pattern for creating reusable, composable feeds.
 * Eliminates boilerplate and provides a consistent API.
 *
 * @module factory
 *
 * @example
 * ```typescript
 * import { createBaseFeed } from './factory';
 * import { eventsFetchStrategy } from './strategies/fetch/events';
 * import { eventsDisplayStrategy } from './strategies/display/events';
 * import { gridGapLayout } from './strategies/layout';
 *
 * const feed = createBaseFeed({
 *   token: 'my-token',
 *   numberOfRowsToStart: 2,
 *   numberOfColumnsToShow: 3,
 *   fetchStrategy: eventsFetchStrategy,
 *   displayStrategy: eventsDisplayStrategy,
 *   layoutStrategy: gridGapLayout,
 * });
 *
 * document.body.appendChild(feed.element);
 * ```
 */

// Export factory
export { createBaseFeed } from './core';

// Export types
export type {
  BaseFeedConfig,
  FeedHelpers,
  FetchStrategy,
  DisplayStrategy,
  LayoutStrategy,
  CardMappingOptions,
  ImageConfig,
  DisplayResultsProps,
  NoResultsConfig,
  FeedLifecycle,
  FeedEvents,
  FeedFactoryResult,
  LayoutOptions,
} from './core/types';

// Export helpers (for advanced usage)
export {
  createFeedHelpers,
  createDisplayHandlers,
  createFetchHandlers,
  setShadowStyles,
} from './helpers';
