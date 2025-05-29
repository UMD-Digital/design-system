import * as Feeds from '@universityofmaryland/web-feeds-library';
import { CommonFeedNewsData } from './common';
import { Attributes, Model, Register } from 'model';

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

const createComponent = (element: HTMLElement) => {
  const overwriteTopPosition = Attributes.getValue.topPosition({ element });
  const data = CommonFeedNewsData({
    element,
  });

  if (!data) {
    console.error('Feed news requires a token to be set');
    return { element: document.createElement('div'), styles: '' };
  }

  return Feeds.news.featured({
    ...data,
    numberOfRowsToStart: 1,
    isTransparent: element.getAttribute('transparent') === 'true',
    isLayoutReversed: element.getAttribute('layout') === 'reversed',
    overwriteStickyPosition: overwriteTopPosition
      ? parseInt(overwriteTopPosition)
      : undefined,
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
 * - `data-categories` - Comma-separated category IDs to filter news
 * - `data-not-entries` - Comma-separated entry IDs to exclude
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-transparent` - Transparency options:
 *   - `true` - Transparent card background
 * - `data-layout` - Layout options:
 *   - `reversed` - Reverse content layout
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
 *   data-categories="headlines"
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
 *   data-layout="reversed"
 *   data-transparent="true"
 *   data-feed-not-entries="12345">
 * </umd-feed-news-featured>
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
      attributes,
      createComponent,
      afterConnect: (element, shadow) => {
        element?.events?.callback(shadow);
      },
    }),
  });
};
