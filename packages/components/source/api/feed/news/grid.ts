import * as Feeds from '@universityofmaryland/web-feeds-library';
import { Attributes, Register } from 'model';
import { CommonFeedNewsData } from './common';
import { CreateComponentFunction, ComponentRegistration } from 'api/_types';

/**
 * Tag name for the news grid feed component
 * @internal
 */
const tagName = 'umd-feed-news';

const createComponent: CreateComponentFunction = (element) => {
  const data = CommonFeedNewsData({ element });

  if (!data) {
    return { element: document.createElement('div'), styles: '' };
  }

  const columnCount =
    Number(Attributes.getValue.layoutColumnCount({ element })) || 3;
  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 1;

  return Feeds.news.grid({
    ...data,
    numberOfColumnsToShow: Math.min(Math.max(columnCount, 1), 4),
    numberOfRowsToStart: Math.min(Math.max(rowCount, 1), 2),
    isTransparent: Attributes.isVisual.transparent({ element }),
    isTypeOverlay: Attributes.isDisplay.overlay({ element }),
  });
};

/**
 * News Grid Feed Component
 *
 * Displays a dynamic grid of news articles fetched from an external feed.
 * Supports overlay card styles and entry exclusion.
 *
 * ## Custom Element
 * `<umd-feed-news>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-categories` - Comma-separated category IDs to filter news
 * - `data-column-count` - Number of columns (default: 3)
 * - `data-row-count` - Initial rows to display (default: 1)
 * - `data-not-entries` - Comma-separated entry IDs to exclude
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-feature` - Feature options:
 *   - `lazy-load` - Enable lazy loading of additional articles
 * - `data-type` - Display type options:
 *   - `overlay` - Use overlay card style
 * - `data-transparent` - Transparency options:
 *   - `true` - Transparent card backgrounds
 * - `data-is` - Data flags:
 *   - `union` - Union-specific feed configuration
 *
 * @example
 * ```html
 * <!-- Basic news grid -->
 * <umd-feed-news
 *   data-token="your-api-token">
 * </umd-feed-news>
 * ```
 *
 * @example
 * ```html
 * <!-- News grid with overlay style and filters -->
 * <umd-feed-news
 *   data-token="your-api-token"
 *   data-categories="research,innovation"
 *   data-type="overlay"
 *   data-column-count="4"
 *   data-row-count="2"
 *   data-feature="lazy-load">
 * </umd-feed-news>
 * ```
 *
 * @example
 * ```html
 * <!-- News grid excluding specific articles -->
 * <umd-feed-news
 *   data-token="your-api-token"
 *   data-not-entries="12345,67890"
 *   data-theme="dark"
 *   data-transparent="true">
 * </umd-feed-news>
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
