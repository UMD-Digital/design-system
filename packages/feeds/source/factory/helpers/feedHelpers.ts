/**
 * Feed Helper Utilities
 *
 * Creates standard helper functions for managing feed state.
 * These helpers are passed to all strategies and lifecycle handlers.
 *
 * @module factory/helpers/feedHelpers
 */

import { FeedHelpers } from '../core/types';

/**
 * Configuration for creating feed helpers
 */
interface FeedHelpersConfig {
  /** The feed container element */
  container: HTMLElement;
  /** Initial styles */
  initialStyles?: string;
  /** Shadow root if available */
  shadowRoot?: ShadowRoot | null;
}

/**
 * Internal state managed by the helpers
 */
interface FeedState {
  totalEntries: number;
  offset: number;
  styles: string;
  shadowRoot: ShadowRoot | null;
}

/**
 * Create feed helper functions
 *
 * These helpers provide a consistent API for managing feed state
 * across different feed types and layouts.
 *
 * @param config - Configuration for the helpers
 * @returns Feed helper functions
 *
 * @example
 * ```typescript
 * const container = document.createElement('div');
 * const helpers = createFeedHelpers({ container });
 *
 * helpers.setTotalEntries(100);
 * helpers.setOffset(10);
 * console.log(helpers.getTotalEntries()); // 100
 * console.log(helpers.getOffset()); // 10
 * ```
 */
export function createFeedHelpers(config: FeedHelpersConfig): FeedHelpers {
  const { container, initialStyles = '', shadowRoot: initialShadowRoot = null } = config;

  // Internal state
  const state: FeedState = {
    totalEntries: 0,
    offset: 0,
    styles: initialStyles,
    shadowRoot: initialShadowRoot,
  };

  return {
    setTotalEntries: (count: number) => {
      state.totalEntries = count;
    },

    setOffset: (count: number) => {
      state.offset = state.offset + count;
    },

    setStyles: (additionalStyles: string) => {
      state.styles += additionalStyles;
    },

    setShadowRoot: (shadow: ShadowRoot) => {
      state.shadowRoot = shadow;
    },

    getContainer: () => container,

    getOffset: () => state.offset,

    getTotalEntries: () => state.totalEntries,

    getStyles: () => state.styles,

    getShadowRoot: () => state.shadowRoot,
  };
}

/**
 * Update the shadow root reference in helpers
 *
 * This is called when a shadow root becomes available
 * (typically from a web component callback)
 *
 * @param helpers - The feed helpers
 * @param shadowRoot - The shadow root to set
 *
 * @internal
 */
export function updateShadowRoot(
  helpers: FeedHelpers,
  shadowRoot: ShadowRoot
): void {
  // We need to mutate the internal state
  // This is safe because helpers is always created fresh per feed instance
  const state = (helpers as any).state || {};
  state.shadowRoot = shadowRoot;
}
