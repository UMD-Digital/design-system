import { type ElementModel } from '../_types';

/**
 * Configuration for loading state
 */
export interface LoadingStateConfig {
  isThemeDark?: boolean;
}

/**
 * Configuration for empty/no results state
 */
export interface EmptyStateConfig {
  message?: string;
  linkUrl?: string;
  linkText?: string;
  isThemeDark?: boolean;
  isAlignedCenter?: boolean;
}

/**
 * Configuration for pagination state
 */
export interface PaginationStateConfig {
  callback: () => void;
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  totalEntries: number | null;
  offset: number;
}

/**
 * Configuration for announcer (aria-live)
 */
export interface AnnouncerConfig {
  message: string;
  politeness?: 'polite' | 'assertive';
}

/**
 * Feed state events for custom event dispatching
 */
export enum FeedStateEvent {
  LOADING_START = 'feed:loading:start',
  LOADING_END = 'feed:loading:end',
  EMPTY_SHOWN = 'feed:empty:shown',
  PAGINATION_LOADED = 'feed:pagination:loaded',
  ANNOUNCEMENT = 'feed:announcement',
}

/**
 * Standard feed state interface
 */
export interface FeedState {
  element: HTMLElement;
  styles: string;
  show?: (container: HTMLElement) => void;
  hide?: () => void;
  destroy?: () => void;
}

/**
 * Legacy loader API (backwards compatible)
 */
export interface LoaderLegacyAPI {
  create: (config: LoadingStateConfig) => ElementModel;
  display: (props: { container: HTMLElement; isThemeDark?: boolean }) => void;
  remove: (props: { container: HTMLElement }) => void;
}

/**
 * Legacy announcer API (backwards compatible)
 */
export interface AnnouncerLegacyAPI {
  create: (config: AnnouncerConfig) => HTMLElement;
  update: (props: { container: HTMLElement; message: string }) => void;
}

/**
 * Legacy pagination API (backwards compatible)
 */
export interface PaginationLegacyAPI {
  create: (config: PaginationStateConfig) => ElementModel | undefined;
  remove: (props: { container: HTMLElement }) => void;
}
