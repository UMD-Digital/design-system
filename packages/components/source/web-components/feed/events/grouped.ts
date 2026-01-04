import { grouped } from '@universityofmaryland/web-feeds-library/events';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import { CommonFeedEventsData } from './common';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-events-grouped';

const createComponent: CreateComponentFunction = (element) => {
  const data = CommonFeedEventsData({ element });

  if (!data) {
    console.error('Feed events requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  const rowCount =
    Number(Attributes.getValue.layoutRowCount({ element })) || 10;

  return grouped({
    ...data,
    isLazyLoad: true,
    numberOfRowsToStart: rowCount,
  });
};

/**
 * Events Grouped List Feed Component
 *
 * Displays a dynamic list of event cards grouped by date, fetched from an external feed.
 * Supports lazy loading.
 *
 * ## Custom Element
 * `<umd-feed-events-grouped>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 *
 * @example
 * ```html
 * <!-- Basic events grid -->
 * <umd-feed-events-grouped
 *   data-token="your-api-token">
 * </umd-feed-events-grouped>
 * ```
 *
 *
 * @category Components
 * @since 1.13.0
 */
export const FeedEventsGrouped: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: (element, shadow) => {
    element?.events?.callback(shadow);
  },
});

/** Backwards compatibility alias for grouped exports */
export { FeedEventsGrouped as eventsGrouped };
