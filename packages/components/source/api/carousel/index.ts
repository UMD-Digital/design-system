/**
 * @module Carousel
 * @category Components
 * Carousel components for displaying scrollable content with navigation controls
 */

/**
 * Base carousel component for generic content blocks
 * @see {@link base} for the base carousel implementation
 */
export { default as base } from './base';

/**
 * Carousel component optimized for card layouts
 * @see {@link cards} for the cards carousel implementation
 */
export { default as cards } from './cards';

/**
 * Single image carousel with caption support
 * @see {@link imageSingle} for the single image carousel implementation
 */
export { default as imageSingle } from './image/single';

/**
 * Multiple images carousel for galleries
 * @see {@link imageMultiple} for the multiple image carousel implementation
 */
export { default as imageMultiple } from './image/multiple';

/**
 * Carousel with thumbnail navigation
 * @see {@link thumbnail} for the thumbnail carousel implementation
 */
export { default as thumbnail } from './thumbnail';
