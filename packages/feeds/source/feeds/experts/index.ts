/**
 * Expert Feeds
 *
 * Various layouts for displaying expert profiles.
 *
 * @module feeds/experts
 */

/**
 * Grid layout for expert profiles
 * Displays experts in a multi-column responsive grid
 */
export { expertsGrid as grid } from './grid';

/**
 * List layout for expert profiles
 * Displays experts in a single-column vertical list
 */
export { expertsList as list } from './list';

/**
 * Bio layout for single expert
 * Displays a single expert's full biography
 * Use data-display="full" to show full bio instead of summary
 */
export { expertsBio as bio } from './bio';

/**
 * In The News layout for expert with news coverage
 * Displays an expert profile alongside related news articles
 * Two-column layout: expert overlay card (left) + news list (right)
 */
export { expertsInTheNews as inTheNews } from './in-the-news';
