import * as Feeds from '@universityofmaryland/web-feeds-library';
import { Attributes, Register } from 'model';
import { CommonFeedEventsData } from './common';
import { CreateComponentFunction, ComponentRegistration } from 'api/_types';

/**
 * Tag name for the events grid feed component
 * @internal
 */
const tagName = 'umd-feed-events';

/**
 * Creates an events grid feed component
 * @param element - The host HTML element
 * @returns Configured feed component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const data = CommonFeedEventsData({ element });

  if (!data) {
    console.error('Feed events requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  const columnCount =
    Number(Attributes.getValue.layoutColumnCount({ element })) || 3;
  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 1;

  return Feeds.events.grid({
    ...data,
    numberOfColumnsToShow: Math.min(Math.max(columnCount, 1), 4),
    numberOfRowsToStart: Math.min(Math.max(rowCount, 1), 2),
    isTransparent: Attributes.isVisual.transparent({ element }),
  });
};

/**
 * Events Grid Feed Component
 *
 * Displays a dynamic grid of event cards fetched from an external feed.
 * Supports responsive column layouts and lazy loading.
 *
 * ## Custom Element
 * `<umd-feed-events>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-categories` - Comma-separated category IDs to filter events
 * - `data-column-count` - Number of columns (1-4, default: 3)
 * - `data-row-count` - Initial rows to display (1-2, default: 1)
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-transparent` - Transparency options:
 *   - `true` - Transparent card backgrounds
 * - `data-feature` - Feature options:
 *   - `lazy-load` - Enable lazy loading of additional events
 *
 * @example
 * ```html
 * <!-- Basic events grid -->
 * <umd-feed-events
 *   data-token="your-api-token">
 * </umd-feed-events>
 * ```
 *
 * @example
 * ```html
 * <!-- Events grid with filters and lazy loading -->
 * <umd-feed-events
 *   data-token="your-api-token"
 *   data-categories="<added-category-id>, <another-category-id>"
 *   data-column-count="4"
 *   data-row-count="2"
 *   data-feature="lazy-load">
 * </umd-feed-events>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with transparent cards -->
 * <umd-feed-events
 *   data-token="your-api-token"
 *   data-theme="dark"
 *   transparent="true"
 *   data-column-count="2">
 * </umd-feed-events>
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
