/**
 * @module typography/stats
 * Provides typography styles for statistics and numeric callouts with campaign font styling.
 */

import { color, font, media } from '../token';
import { create } from '../utilities';
import type { JssObject } from '../_types';

/**
 * Size types for stats typography
 * @since 1.7.0
 */
export type StatsSize = 'large' | 'medium' | 'small';

/**
 * Options for composable stats typography
 * @since 1.7.0
 */
export interface StatsComposeOptions {
  /** Theme variant for color */
  theme?: 'light' | 'dark';
}

/**
 * Breakpoint variables for responsive typography.
 * @type {string}
 * @private
 */
const breakpointLarge = media.queries.large.min;
const breakpointDesktop = media.queries.desktop.min;

/**
 * Large statistic typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Campaign condensed font family
 * @property {string} fontSize - Extra large size that scales dramatically at breakpoints
 * @property {string} fontWeight - Extra bold weight for emphasis
 * @property {string} fontStyle - Italic style for additional emphasis
 * @property {string} lineHeight - Tight line height for numeric display
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.stats.large };
 * ```
 * @since 1.1.0
 */
const largeBase = {
  fontFamily: font.family['campaign'],
  fontSize: font.size['9xl'],
  fontWeight: font.weight['extraBold'],
  fontStyle: 'italic',
  lineHeight: '1',

  [`@media (${breakpointDesktop})`]: {
    fontSize: '112px',
  },
};

/**
 * Medium statistic typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Campaign condensed font family
 * @property {string} fontSize - Large size that scales up at breakpoints
 * @property {string} fontStyle - Italic style for emphasis
 * @property {string} fontWeight - Extra bold weight for emphasis
 * @property {string} lineHeight - Tight line height for numeric display
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.stats.medium };
 * ```
 * @since 1.1.0
 */
const mediumBase = {
  fontFamily: font.family['campaign'],
  fontSize: font.size['7xl'],
  fontStyle: 'italic',
  fontWeight: font.weight['extraBold'],
  lineHeight: '1',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['7xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['10xl'],
  },
};

/**
 * Small statistic typography style.
 * @type {object}
 * @property {string} fontFamily - Campaign condensed font family
 * @property {string} fontSize - Large size for statistic display
 * @property {string} fontStyle - Italic style for emphasis
 * @property {string} fontWeight - Extra bold weight for emphasis
 * @property {string} lineHeight - Extra tight line height for compact display
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.stats.small };
 * ```
 * @since 1.1.0
 */
const smallBase = {
  fontFamily: font.family['campaign'],
  fontSize: font.size['7xl'],
  fontStyle: 'italic',
  fontWeight: font.weight['extraBold'],
  lineHeight: '0.87em',
};

/**
 * Composable stats typography style selector
 *
 * Creates stats typography styles with configurable size and theme options.
 *
 * @param size - Typography size variant
 * @param options - Configuration for theme
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Basic usage
 * const stat = stats.compose('large');
 *
 * // With dark theme
 * const darkStat = stats.compose('large', { theme: 'dark' });
 *
 * // In element builder with theme
 * const styleElements = {
 *   ...typography.stats.compose('medium', {
 *     theme: isThemeDark ? 'dark' : 'light'
 *   }),
 * };
 * ```
 *
 * @since 1.7.0
 */
export function compose(
  size: StatsSize,
  options?: StatsComposeOptions
): JssObject {
  const { theme = 'light' } = options || {};

  const sizes: Record<StatsSize, any> = {
    large: largeBase,
    medium: mediumBase,
    small: smallBase,
  };

  const base = sizes[size];

  // Apply theme color
  const composed = {
    ...base,
    color: theme === 'dark' ? color.gold : color.red,
  };

  // Generate className
  const classNameParts = ['umd-statistic-sans', size];
  if (theme === 'dark') classNameParts.push('dark');

  return create.jss.objectWithClassName({
    ...composed,
    className: classNameParts.join('-'),
  });
}

/**
 * Large statistic typography (static export).
 * @since 1.1.0
 */
export const large: JssObject = compose('large');

/**
 * Medium statistic typography (static export).
 * @since 1.1.0
 */
export const medium: JssObject = compose('medium');

/**
 * Small statistic typography (static export).
 * @since 1.1.0
 */
export const small: JssObject = compose('small');

/**
 * Ready-to-use statistics typography styles as JSS objects with class names.
 * @type {Object<string, JssObject>}
 * @property {JssObject} statLarge - JSS object for large statistics
 * @property {JssObject} statMedium - JSS object for medium statistics
 * @property {JssObject} statSmall - JSS object for small statistics
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use as a complete JSS object including className
 * Styles.typography.stats.fonts.statLarge
 * ```
 * @since 1.1.0
 */
export const fonts = {
  statLarge: compose('large'),
  statMedium: compose('medium'),
  statSmall: compose('small'),
};
