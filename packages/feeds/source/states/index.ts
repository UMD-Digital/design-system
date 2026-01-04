/**
 * Feed States Module
 *
 * Provides state management for feed UI including loading, empty states,
 * pagination, and accessibility announcements.
 *
 * @example
 * ```typescript
 * import { LoadingState, EmptyState } from 'states';
 *
 * const loading = new LoadingState({ isThemeDark: false });
 * loading.show(container);
 * // ... async operation
 * loading.hide();
 * ```
 *
 * @module states
 */

export { LoadingState, createLoadingElement } from './loading';
export { EmptyState, createEmptyElement } from './empty';
export { PaginationState, createPaginationElement } from './pagination';
export { Announcer, createAnnouncerElement } from './announcer';

export type {
  LoadingStateConfig,
  EmptyStateConfig,
  PaginationStateConfig,
  AnnouncerConfig,
  FeedStateEvent,
  FeedState,
} from './_types';
