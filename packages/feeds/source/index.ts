/**
 * Academic feed components for displaying academic content.
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const academicSlider = Feeds.academic.slider({ token: 'your-token' });
 * ```
 * @since 1.9.0
 */
export * as academic from './feeds/academic';

/**
 * Events feed components for displaying event listings.
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const eventsList = Feeds.events.list({ token: 'your-token' });
 * ```
 * @since 1.9.0
 */
export * as events from './feeds/events';

/**
 * News feed components for displaying news articles.
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const newsGrid = Feeds.news.grid({ token: 'your-token' });
 * ```
 * @since 1.9.0
 */
export * as news from './feeds/news';
