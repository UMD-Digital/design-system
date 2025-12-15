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
export { default as grid } from './grid';

/**
 * List layout for expert profiles
 * Displays experts in a single-column vertical list
 */
export { default as list } from './list';

/**
 * Bio layout for single expert
 * Displays a single expert's full biography
 * Use data-display="full" to show full bio instead of summary
 */
export { default as bio } from './bio';
