/**
 * Feed States Module
 *
 * Provides state management for feed UI including loading, empty states,
 * pagination, and accessibility announcements.
 *
 * @example
 * ```typescript
 * // New class-based API (recommended)
 * import { LoadingState, EmptyState } from 'states';
 *
 * const loading = new LoadingState({ isThemeDark: false });
 * loading.show(container);
 * // ... async operation
 * loading.hide();
 *
 * // Legacy function API (backwards compatible)
 * import * as feedStates from 'states';
 * const loader = feedStates.loader.create({ isThemeDark: false });
 * container.appendChild(loader.element);
 * ```
 *
 * @module states
 */

// Export class-based APIs (NEW - Recommended)
export {
  LoadingState,
  createLoadingElement,
} from './loading';

export {
  EmptyState,
  createEmptyElement,
} from './empty';

export {
  PaginationState,
  createPaginationElement,
} from './pagination';

export {
  Announcer,
  createAnnouncerElement,
} from './announcer';

// Export types
export type {
  LoadingStateConfig,
  EmptyStateConfig,
  PaginationStateConfig,
  AnnouncerConfig,
  FeedStateEvent,
  FeedState,
} from './_types';

// Export legacy APIs for backwards compatibility
export { default as loader } from './loading';
export { default as noResults } from './empty';
export { default as buttonLazyLoad } from './pagination';
export { default as ariaLive } from './announcer';
