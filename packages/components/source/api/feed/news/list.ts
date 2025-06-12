import * as Feeds from '@universityofmaryland/web-feeds-library';
import { Attributes, Register } from 'model';
import { CommonFeedNewsData } from './common';
import { CreateComponentFunction, ComponentRegistration } from 'api/_types';

/**
 * Tag name for the news list feed component
 * @internal
 */
const tagName = 'umd-feed-news-list';

const createComponent: CreateComponentFunction = (element) => {
  const data = CommonFeedNewsData({ element });

  if (!data) {
    return { element: document.createElement('div'), styles: '' };
  }

  const rowCount = Number(Attributes.getValue.layoutRowCount({ element })) || 5;

  return Feeds.news.list({
    ...data,
    numberOfRowsToStart: rowCount >= 1 && rowCount <= 10 ? rowCount : 5,
  });
};

/**
 * News List Feed Component
 *
 * Displays a dynamic list of news articles fetched from an external feed.
 * Optimized for vertical scanning with publication dates.
 *
 * ## Custom Element
 * `<umd-feed-news-list>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-filter-group-ids` - Comma-separated category IDs to filter news
 * - `data-layout-row-count` - Initial rows to display (1-10, default: 5)
 * - `data-entry-remove-ids` - Comma-separated entry IDs to exclude
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-lazy-load` - Enable lazy loading of additional articles
 * - `data-is` - Data flags:
 *   - `union` - Union-specific feed configuration
 *
 * @example
 * ```html
 * <!-- Basic news list -->
 * <umd-feed-news-list
 *   data-token="your-api-token">
 * </umd-feed-news-list>
 * ```
 *
 * @example
 * ```html
 * <!-- News list with filters and more items -->
 * <umd-feed-news-list
 *   data-token="your-api-token"
 *   data-filter-group-ids="faculty,awards"
 *   data-layout-row-count="10"
 *   data-lazy-load="true">
 * </umd-feed-news-list>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with exclusions -->
 * <umd-feed-news-list
 *   data-token="your-api-token"
 *   data-theme="dark"
 *   data-entry-remove-ids="12345,67890"
 *   data-layout-row-count="7">
 * </umd-feed-news-list>
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
