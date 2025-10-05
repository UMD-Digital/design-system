import { list } from '@universityofmaryland/web-feeds-library/events';
import { Attributes, Register } from 'model';
import { CommonFeedEventsData } from './common';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-feed-events-list';

const createComponent: CreateComponentFunction = (element) => {
  const data = CommonFeedEventsData({ element });

  if (!data) {
    console.error('Feed events requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 5;

  return list({
    ...data,
    numberOfRowsToStart: Math.min(Math.max(rowCount, 1), 10),
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
 * - `data-filter-group-ids` - Comma-separated category IDs to filter events
 * - `data-layout-row-count` - Initial rows to display (1-10, default: 5)
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-lazy-load` - Enable lazy loading of additional events
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
 *   data-filter-group-ids="<added-category-id>, <another-category-id>"
 *   data-layout-row-count="10"
 *   data-lazy-load="true">
 * </umd-feed-events-list>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme events list -->
 * <umd-feed-events-list
 *   data-token="your-api-token"
 *   data-theme="dark"
 *   data-layout-row-count="7">
 * </umd-feed-events-list>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: (element, shadow) => {
    element?.events?.callback(shadow);
  },
});

export default registration;
