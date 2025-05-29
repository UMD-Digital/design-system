/**
 * @module Feed
 * @category Components
 * Dynamic feed components that fetch and display content from external sources
 */

/**
 * Events feed with grid layout
 * @see {@link eventsGrid} for the events grid feed implementation
 */
export { default as eventsGrid } from './events/grid';

/**
 * Events feed with list layout
 * @see {@link eventsList} for the events list feed implementation
 */
export { default as eventsList } from './events/list';

/**
 * Featured news feed with sticky positioning
 * @see {@link newsFeatured} for the featured news feed implementation
 */
export { default as newsFeatured } from './news/featured';

/**
 * News feed with grid layout
 * @see {@link newsGrid} for the news grid feed implementation
 */
export { default as newsGrid } from './news/grid';

/**
 * News feed with list layout
 * @see {@link newsList} for the news list feed implementation
 */
export { default as newsList } from './news/list';
