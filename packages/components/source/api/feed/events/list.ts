import * as Feeds from '@universityofmaryland/web-feeds-library';
import { CommonFeedEventsData } from './common';
import { Attributes, Model, Register } from 'model';

/**
 * Tag name for the events list feed component
 * @internal
 */
const tagName = 'umd-feed-events-list';

const createComponent = (element: HTMLElement) => {
  const data = CommonFeedEventsData({
    element,
  });
  let numberOfRowsToStart =
    Number(element.getAttribute(Attributes.names.FEED_ROW_COUNT)) || 5;

  if (numberOfRowsToStart > 10 || numberOfRowsToStart < 1) {
    numberOfRowsToStart = 5;
  }

  if (!data) {
    console.error('Feed news requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  return Feeds.events.list({
    ...data,
    numberOfRowsToStart,
  });
};

/**
 * Events List Feed Component
 *
 * Displays a dynamic list of events fetched from an external feed.
 * Optimized for vertical scanning with date/time/location details.
 *
 * ## Custom Element
 * `<umd-feed-events-list>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-categories` - Comma-separated category IDs to filter events
 * - `data-row-count` - Initial rows to display (1-10, default: 5)
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-feature` - Feature options:
 *   - `lazy-load` - Enable lazy loading of additional events
 *
 * @example
 * ```html
 * <!-- Basic events list -->
 * <umd-feed-events-list
 *   data-token="your-api-token">
 * </umd-feed-events-list>
 * ```
 *
 * @example
 * ```html
 * <!-- Events list with filters and more items -->
 * <umd-feed-events-list
 *   data-token="your-api-token"
 *   data-categories="<added-category-id>, <another-category-id>"
 *   data-row-count="10"
 *   data-feature="lazy-load">
 * </umd-feed-events-list>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme events list -->
 * <umd-feed-events-list
 *   data-token="your-api-token"
 *   data-theme="dark"
 *   data-row-count="7">
 * </umd-feed-events-list>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      afterConnect: (element, shadow) => {
        element?.events?.callback(shadow);
      },
    }),
  });
};
