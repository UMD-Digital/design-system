/**
 * @module typography/serif
 * Provides serif typography styles with various sizes and responsive scaling options.
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
 * Base serif typography properties.
 * @type {object}
 * @private
 */
const base = {
  fontFamily: font.family['serif'],
};

/**
 * Larger size serif typography constants.
 * @type {object}
 * @private
 */
const sizeLarger = {
  fontSize: font.size['4xl'],
  lineHeight: `1.18em`,
};

/**
 * Large size serif typography constants.
 * @type {object}
 * @private
 */
const sizeLarge = {
  fontSize: font.size['3xl'],
  lineHeight: `1em`,
};

/**
 * Medium size serif typography constants.
 * @type {object}
 * @private
 */
const sizeMedium = {
  fontSize: font.size['xl'],
  lineHeight: `1.5em`,
};

/**
 * Maximum size serif typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Serif font family
 * @property {string} fontSize - Extra large size that scales dramatically at breakpoints
 * @property {string} lineHeight - Appropriate line height for heading text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.serif.maxium };
 * ```
 * @since 1.1.0
 */
export const maxium = {
  ...base,
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['4xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['9xl'],
    fontWeight: font.weight['light'],
    lineHeight: `1.025em`,
  },
};

/**
 * Extra large serif typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Serif font family
 * @property {string} fontSize - Large size that scales up at breakpoints
 * @property {string} lineHeight - Appropriate line height for heading text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.serif.extralarge };
 * ```
 * @since 1.1.0
 */
export const extralarge = {
  ...base,
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['4xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['6xl'],
    lineHeight: `1.07em`,
  },
};

/**
 * Larger serif typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Serif font family
 * @property {string} fontSize - Large size that scales up at breakpoints
 * @property {string} lineHeight - Appropriate line height for heading text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.serif.larger };
 * ```
 * @since 1.1.0
 */
export const larger = {
  ...base,
  ...sizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['3xl']} + 0.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeLarger,
  },
};

/**
 * Large serif typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Serif font family
 * @property {string} fontSize - Medium size that scales up to large at breakpoints
 * @property {string} lineHeight - Appropriate line height for text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.serif.large };
 * ```
 * @since 1.1.0
 */
export const large = {
  ...base,
  ...sizeMedium,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['xl']} + 0.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeLarge,
  },
};

/**
 * Medium serif typography style.
 * @type {object}
 * @property {string} fontFamily - Serif font family
 * @property {string} fontSize - Medium font size
 * @property {string} lineHeight - Comfortable line height for reading
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.serif.medium };
 * ```
 * @since 1.1.0
 */
export const medium = {
  ...base,
  ...sizeMedium,
};

/**
 * Ready-to-use serif typography styles as JSS objects with class names.
 * @type {Object<string, JssObject>}
 * @property {JssObject} maximum - JSS object for maximum size text
 * @property {JssObject} extraLarge - JSS object for extra large size text
 * @property {JssObject} larger - JSS object for larger size text
 * @property {JssObject} large - JSS object for large size text
 * @property {JssObject} medium - JSS object for medium size text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use as a complete JSS object including className
 * Styles.typography.serif.fonts.large
 * ```
 * @since 1.1.0
 */
export const fonts = {
  maximum: create.jss.objectWithClassName({
    className: 'umd-serif-maximum',
    ...maxium,
  }),

  extraLarge: create.jss.objectWithClassName({
    className: 'umd-serif-extralarge',
    ...extralarge,
  }),

  larger: create.jss.objectWithClassName({
    className: 'umd-serif-larger',
    ...larger,
  }),

  large: create.jss.objectWithClassName({
    className: 'umd-serif-large',
    ...large,
  }),

  medium: create.jss.objectWithClassName({
    className: 'umd-serif-medium',
    ...medium,
  }),
};
