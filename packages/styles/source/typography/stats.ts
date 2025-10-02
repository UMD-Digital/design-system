/**
 * @module typography/stats
 * Provides typography styles for statistics and numeric callouts with campaign font styling.
 */

import { font, media } from '../token';
import { create } from '../utilities';

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
export const large = {
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
export const medium = {
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
export const small = {
  fontFamily: font.family['campaign'],
  fontSize: font.size['7xl'],
  fontStyle: 'italic',
  fontWeight: font.weight['extraBold'],
  lineHeight: '0.87em',
};

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
  statLarge: create.jss.objectWithClassName({
    className: 'umd-statistic-sans-large',
    ...large,
  }),

  statMedium: create.jss.objectWithClassName({
    className: 'umd-statistic-sans-medium',
    ...medium,
  }),

  statSmall: create.jss.objectWithClassName({
    className: 'umd-statistic-sans-small',
    ...small,
  }),
};
