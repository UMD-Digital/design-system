import * as Feeds from '@universityofmaryland/web-feeds-library';
import { Attributes, Register } from 'model';
import { CommonFeedNewsData } from './common';
import { CreateComponentFunction, ComponentRegistration } from 'api/_types';

/**
 * Tag name for the featured news feed component
 * @internal
 */
const tagName = 'umd-feed-news-featured';

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyPosition({
    callback: (element, value) => element.events?.setPosition(value),
  }),
);

const createComponent: CreateComponentFunction = (element) => {
  const data = CommonFeedNewsData({ element });

  if (!data) {
    return { element: document.createElement('div'), styles: '' };
  }

  const topPosition = Attributes.getValue.topPosition({ element });

  return Feeds.news.featured({
    ...data,
    numberOfRowsToStart: 1,
    isTransparent: Attributes.isVisual.transparent({ element }),
    isLayoutReversed: Attributes.isLayout.reverse({ element }),
    overwriteStickyPosition: topPosition ? parseInt(topPosition) : undefined,
  });
};

/**
 * Featured News Feed Component
 *
 * Displays a featured news article with sticky positioning and prominent layout.
 * Designed for highlighting top stories with visual impact.
 *
 * ## Custom Element
 * `<umd-feed-news-featured>`
 *
 * ## Attributes
 * - `data-token` - API authentication token (required)
 * - `data-filter-group-ids` - Comma-separated category IDs to filter news
 * - `data-entry-remove-ids` - Comma-separated entry IDs to exclude
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-visual-transparent` - Transparent card background
 * - `data-layout-reverse` - Reverse content layout
 * - `data-top-position` - Override sticky position in pixels
 * - `data-is` - Data flags:
 *   - `union` - Union-specific feed configuration
 *
 * ## Observed Attributes
 * - `data-layout-position` - Updates sticky position dynamically
 *
 * @example
 * ```html
 * <!-- Basic featured news -->
 * <umd-feed-news-featured
 *   data-token="your-api-token">
 * </umd-feed-news-featured>
 * ```
 *
 * @example
 * ```html
 * <!-- Featured news with custom positioning -->
 * <umd-feed-news-featured
 *   data-token="your-api-token"
 *   data-filter-group-ids="headlines"
 *   data-top-position="100"
 *   data-theme="dark">
 * </umd-feed-news-featured>
 * ```
 *
 * @example
 * ```html
 * <!-- Reversed layout with transparency -->
 * <umd-feed-news-featured
 *   data-token="your-api-token"
 *   data-layout-reverse="true"
 *   data-visual-transparent
 *   data-entry-remove-ids="12345">
 * </umd-feed-news-featured>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  attributes,
  createComponent,
  afterConnect: (element, shadow) => {
    element?.events?.callback(shadow);
  },
});

export default registration;
