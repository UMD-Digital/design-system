import * as Feeds from '@universityofmaryland/web-feeds-library';
import { CommonFeedNewsData } from './common';
import { Attributes, Model, Register } from 'model';
import { CreateComponentFunction, ComponentRegistration } from 'api/_types';

/**
 * Tag name for the news grid feed component
 * @internal
 */
const tagName = 'umd-feed-news';

const createComponent: CreateComponentFunction = (element) => {
  const isTransparent = element.getAttribute('transparent') === 'true';
  const isTypeOverlay = element.getAttribute('type') === 'overlay';
  const numberOfColumnsToShow =
    Number(element.getAttribute(Attributes.names.FEED_COLUMN_COUNT)) || 3;
  const numberOfRowsToStart =
    Number(element.getAttribute(Attributes.names.FEED_ROW_COUNT)) || 1;

  const data = CommonFeedNewsData({
    element,
  });

  if (!data) {
    console.error('Feed news requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  return Feeds.news.grid({
    ...data,
    numberOfColumnsToShow,
    numberOfRowsToStart,
    isTransparent,
    isTypeOverlay,
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
