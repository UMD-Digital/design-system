/**
 * @module typography/sans
 * Provides sans-serif typography styles with various sizes and responsive scaling options.
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
 * Container query breakpoints for container-based scaling.
 * @type {number}
 * @private
 */
const scalingContainerSmall = media.breakpointValues.small.min;
const scalingContainerMedium = media.breakpointValues.medium.min;

/**
 * Extra large size constants.
 * @type {object}
 * @private
 */
const sizeExtraLarge = {
  fontSize: font.size['4xl'],
  lineHeight: `1.125em`,
};

/**
 * Extra large responsive size constants.
 * @type {object}
 * @private
 */
const sizeExtraLargeResponsive = {
  fontSize: `calc(${font.size['lg']} + 1.16vw)`,
};

/**
 * Larger size constants.
 * @type {object}
 * @private
 */
const sizeLarger = {
  fontSize: font.size['2xl'],
  lineHeight: `1.25em`,
};

/**
 * Larger responsive size constants.
 * @type {object}
 * @private
 */
const sizeLargerResponsive = {
  fontSize: `calc(${font.size['lg']} + 0.5vw)`,
};

/**
 * Large size constants.
 * @type {object}
 * @private
 */
const sizeLarge = {
  fontSize: font.size['lg'],
  lineHeight: `1.25em`,
};

/**
 * Small size constants.
 * @type {object}
 * @private
 */
const sizeSmall = {
  fontSize: font.size['base'],
  lineHeight: `1.375em`,
};

/**
 * Smaller size constants.
 * @type {object}
 * @private
 */
const sizeSmaller = {
  fontSize: font.size['sm'],
  lineHeight: `1.28em`,
};

/**
 * Minimum size constants.
 * @type {object}
 * @private
 */
const sizeMin = {
  fontSize: font.size['min'],
  lineHeight: `1.16em`,
};

/**
 * Largest size sans-serif typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Sans-serif font family
 * @property {string} fontWeight - Bold weight
 * @property {string} fontSize - Base size that scales up dramatically at breakpoints
 * @property {string} lineHeight - Appropriate line height for size
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.largest };
 * ```
 * @since 1.1.0
 */
export const largest = {
  fontFamily: font.family['sans'],
  fontWeight: font.weight['bold'],
  textWrap: 'pretty',
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['3xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['5xl'],
    lineHeight: `1.04em`,
  },
};

/**
 * Extra large size sans-serif typography style with responsive scaling.
 * @returns {Object} Typography styles for extra large responsive text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.extraLarge };
 * ```
 * @since 1.1.0
 */
export const extraLarge = {
  fontFamily: font.family['sans'],
  textWrap: 'pretty',
  ...sizeLarge,

  [`@media (${breakpointLarge})`]: {
    ...sizeExtraLargeResponsive,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeExtraLarge,
  },
};

/**
 * Larger size sans-serif typography style with responsive scaling.
 * @returns {Object} Typography styles for larger responsive text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.larger };
 * ```
 * @since 1.1.0
 */
export const larger = {
  fontFamily: font.family['sans'],
  ...sizeLarge,
  textWrap: 'pretty',
  lineHeight: `1.40em`,

  [`@media (${breakpointLarge})`]: {
    ...sizeLargerResponsive,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeLarger,
  },
};

/**
 * Container-responsive larger size sans-serif typography style.
 * @returns {Object} Typography styles with container-based scaling for larger text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.scalingLarger };
 * ```
 * @since 1.1.0
 */
export const scalingLarger = {
  fontFamily: font.family['sans'],
  fontSize: font.size['lg'],
  lineHeight: `1.25em`,
  textWrap: 'pretty',

  [`@container (min-width: ${scalingContainerSmall}px)`]: {
    ...sizeLargerResponsive,
  },

  [`@container (min-width: ${scalingContainerMedium}px)`]: {
    fontSize: font.size['4xl'],
  },
};

/**
 * Large size sans-serif typography style.
 * @returns {Object} Typography styles for large, bold text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.large };
 * ```
 * @since 1.1.0
 */
export const large = {
  fontFamily: font.family['sans'],
  fontWeight: font.weight['bold'],
  ...sizeLarge,
};

/**
 * Medium size sans-serif typography style with responsive scaling.
 * @returns {Object} Typography styles for medium text with responsive scaling.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.medium };
 * ```
 * @since 1.1.0
 */
export const medium = {
  fontFamily: font.family['sans'],
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['base']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['lg'],
    lineHeight: `1.55em`,
  },
};

/**
 * Small size sans-serif typography style with responsive scaling.
 * @returns {Object} Typography styles for small text with responsive scaling.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.small };
 * ```
 * @since 1.1.0
 */
export const small = {
  fontFamily: font.family['sans'],
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeSmall,
  },
};

/**
 * Smaller size sans-serif typography style with responsive scaling.
 * @returns {Object} Typography styles for smaller text with responsive scaling.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.smaller };
 * ```
 * @since 1.1.0
 */
export const smaller = {
  fontFamily: font.family['sans'],
  ...sizeSmaller,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['min']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeSmaller,
  },
};

/**
 * Minimum size sans-serif typography style.
 * @returns {Object} Typography styles for minimum size text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.min };
 * ```
 * @since 1.1.0
 */
export const min = {
  fontFamily: font.family['sans'],
  ...sizeMin,
};

/**
 * Container-responsive minimum size sans-serif typography style.
 * @returns {Object} Typography styles with container-based scaling for minimum size text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.sans.scalingMin };
 * ```
 * @since 1.1.0
 */
export const scalingMin = {
  ...min,

  [`@container (min-width: ${scalingContainerMedium}px)`]: {
    ...small,
  },
};

/**
 * Ready-to-use sans-serif typography styles as JSS objects with class names.
 * @type {Object<string, JssObject>}
 * @property {JssObject} maximum - JSS object for maximum size text
 * @property {JssObject} largest - JSS object for largest size text
 * @property {JssObject} extraLarge - JSS object for extra large size text
 * @property {JssObject} larger - JSS object for larger size text
 * @property {JssObject} large - JSS object for large size text
 * @property {JssObject} medium - JSS object for medium size text
 * @property {JssObject} small - JSS object for small size text
 * @property {JssObject} smaller - JSS object for smaller size text
 * @property {JssObject} min - JSS object for minimum size text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use as a complete JSS object including className
 * Styles.typography.sans.fonts.large
 * ```
 * @since 1.1.0
 */
export const fonts = {
  largest: create.jss.objectWithClassName({
    className: 'umd-sans-largest',
    ...largest,
  }),

  extraLarge: create.jss.objectWithClassName({
    className: 'umd-sans-extralarge',
    ...extraLarge,
  }),

  larger: create.jss.objectWithClassName({
    className: 'umd-sans-larger',
    ...larger,
  }),

  large: create.jss.objectWithClassName({
    className: 'umd-sans-large',
    ...large,
  }),

  medium: create.jss.objectWithClassName({
    className: 'umd-sans-medium',
    ...medium,
  }),

  small: create.jss.objectWithClassName({
    className: 'umd-sans-small',
    ...small,
  }),

  smaller: create.jss.objectWithClassName({
    className: 'umd-sans-smaller',
    ...smaller,
  }),

  min: create.jss.objectWithClassName({
    className: 'umd-sans-min',
    ...min,
  }),
};

/**
 * Container-responsive sans-serif typography styles as JSS objects.
 * @type {Object<string, JssObject>}
 * @property {JssObject} larger - JSS object for larger size text with container-based scaling
 * @property {JssObject} min - JSS object for minimum size text with container-based scaling
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use as a complete JSS object with container query scaling
 * Styles.typography.sans.scalingFonts.larger
 * ```
 * @since 1.1.0
 */
export const scalingFonts = {
  larger: create.jss.objectWithClassName({
    ...scalingLarger,
    className: 'umd-sans-scaling-larger',
  }),
  min: create.jss.objectWithClassName({
    ...scalingMin,
    className: 'umd-sans-scaling-min',
  }),
};

/**
 * Transformed typography variants with different weights and transformations.
 * @type {Object<string, JssObject>}
 * @property {JssObject} largestUppercase - Extra bold, uppercase variant of largest size
 * @property {JssObject} extraLargeUppercase - Extra bold, uppercase variant of extraLarge size
 * @property {JssObject} extraLargeBold - Bold variant of extraLarge size
 * @property {JssObject} largerBold - Bold variant of larger size
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use transformed variants
 * Styles.typography.sans.transformations.extraLargeBold
 * ```
 * @since 1.1.0
 */
export const transformations = {
  largestUppercase: create.jss.objectWithClassName({
    className: 'umd-sans-largest-uppercase',
    ...largest,

    fontWeight: font.weight['extraBold'],
    textTransform: 'uppercase',
  }),

  extraLargeUppercase: create.jss.objectWithClassName({
    className: 'umd-sans-extralarge-uppercase',
    ...extraLarge,

    fontWeight: font.weight['extraBold'],
    textTransform: 'uppercase',
  }),

  extraLargeBold: create.jss.objectWithClassName({
    className: 'umd-sans-extralarge-bold',
    ...extraLarge,

    fontWeight: font.weight['bold'],
  }),

  largerBold: create.jss.objectWithClassName({
    className: 'umd-sans-larger-bold',
    ...larger,

    fontWeight: font.weight['bold'],
  }),
};
