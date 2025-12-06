/**
 * @module token/media
 * Provides responsive design tokens for breakpoints and media queries.
 * @packageDocumentation
 * @since 1.0.0
 */

/**
 * Numeric breakpoint values in pixels.
 * @type {Object<string, {min: number, max?: number}>}
 * @property {Object} small - Small screen breakpoint (320px-479px)
 * @property {Object} medium - Medium screen breakpoint (480px-649px)
 * @property {Object} large - Large screen breakpoint (650px-767px)
 * @property {Object} tablet - Tablet breakpoint (768px-1023px)
 * @property {Object} desktop - Desktop breakpoint (1024px-1199px)
 * @property {Object} highDef - High-definition screen breakpoint (1200px-1499px)
 * @property {Object} maximum - Maximum screen size breakpoint (1500px+)
 * @example
 * ```typescript
 * import * as token from '@universityofmaryland/web-token-library';
 * token.media.breakpointValues.desktop.min // 1024
 * ```
 * @since 1.0.0
 */
export const breakpointValues = {
  small: { min: 320, max: 479 },
  medium: { min: 480, max: 649 },
  large: { min: 650, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1199 },
  highDef: { min: 1200, max: 1499 },
  maximum: { min: 1500 },
};

/**
 * Breakpoint values with 'px' units for CSS usage.
 * @type {Object<string, {min: string, max?: string}>}
 * @property {Object} small - Small screen breakpoint strings ("320px"-"479px")
 * @property {Object} medium - Medium screen breakpoint strings ("480px"-"649px")
 * @property {Object} large - Large screen breakpoint strings ("650px"-"767px")
 * @property {Object} tablet - Tablet breakpoint strings ("768px"-"1023px")
 * @property {Object} desktop - Desktop breakpoint strings ("1024px"-"1199px")
 * @property {Object} highDef - High-definition screen breakpoint strings ("1200px"-"1499px")
 * @property {Object} maximum - Maximum screen size breakpoint string ("1500px"+)
 * @example
 * ```typescript
 * import * as token from '@universityofmaryland/web-token-library';
 * token.media.breakpoints.desktop.min // "1024px"
 * ```
 * @since 1.0.0
 */
export const breakpoints = {
  small: {
    min: `${breakpointValues.small.min}px`,
    max: `${breakpointValues.small.max}px`,
  },
  medium: {
    min: `${breakpointValues.medium.min}px`,
    max: `${breakpointValues.medium.max}px`,
  },
  large: {
    min: `${breakpointValues.large.min}px`,
    max: `${breakpointValues.large.max}px`,
  },
  tablet: {
    min: `${breakpointValues.tablet.min}px`,
    max: `${breakpointValues.tablet.max}px`,
  },
  desktop: {
    min: `${breakpointValues.desktop.min}px`,
    max: `${breakpointValues.desktop.max}px`,
  },
  highDef: {
    min: `${breakpointValues.highDef.min}px`,
    max: `${breakpointValues.highDef.max}px`,
  },
  maximum: { min: `${breakpointValues.maximum.min}px` },
};

/**
 * Complete media query strings ready for use in CSS.
 * @type {Object<string, {min: string, max?: string}>}
 * @property {Object} small - Small screen media queries
 * @property {Object} medium - Medium screen media queries
 * @property {Object} large - Large screen media queries
 * @property {Object} tablet - Tablet media queries
 * @property {Object} desktop - Desktop media queries
 * @property {Object} highDef - High-definition screen media queries
 * @property {Object} maximum - Maximum screen size media query
 * @example
 * ```typescript
 * import * as token from '@universityofmaryland/web-token-library';
 * // Use in JSS/CSS-in-JS
 * const styles = {
 *   [`@media (${token.media.queries.desktop.min})`]: {
 *     // Desktop-specific styles
 *   }
 * };
 * ```
 * @since 1.0.0
 */
export const queries = {
  small: {
    min: `min-width: ${breakpoints.small.min}`,
    max: `max-width: ${breakpoints.small.max}`,
  },
  medium: {
    min: `min-width: ${breakpoints.medium.min}`,
    max: `max-width: ${breakpoints.medium.max}`,
  },
  large: {
    min: `min-width: ${breakpoints.large.min}`,
    max: `max-width: ${breakpoints.large.max}`,
  },
  tablet: {
    min: `min-width: ${breakpoints.tablet.min}`,
    max: `max-width: ${breakpoints.tablet.max}`,
  },
  desktop: {
    min: `min-width: ${breakpoints.desktop.min}`,
    max: `max-width: ${breakpoints.desktop.max}`,
  },
  highDef: {
    min: `min-width: ${breakpoints.highDef.min}`,
    max: `max-width: ${breakpoints.highDef.max}`,
  },
  maximum: { min: `min-width: ${breakpoints.maximum.min}` },
};

/**
 * Conditional media query variables that set boolean flags for different breakpoints.
 * These variables can be used in CSS to conditionally apply styles based on screen size.
 * Each media query uses custom CSS properties (variables) that are set to `true` when the query matches.
 * @type {Object<string, boolean | Object>}
 * @property {boolean} --isMediaSmall - Flag for small breakpoint
 * @property {boolean} --isMediaSmallMax - Flag for max small breakpoint
 * @property {boolean} --isMediaMedium - Flag for medium breakpoint
 * @property {boolean} --isMediaMediumMax - Flag for max medium breakpoint
 * @property {boolean} --isMediaLarge - Flag for large breakpoint
 * @property {boolean} --isMediaLargeMax - Flag for max large breakpoint
 * @property {boolean} --isMediaTablet - Flag for tablet breakpoint
 * @property {boolean} --isMediaTabletMax - Flag for max tablet breakpoint
 * @property {boolean} --isMediaDesktop - Flag for desktop breakpoint
 * @property {boolean} --isMediaDesktopMax - Flag for max desktop breakpoint
 * @property {boolean} --isMediaHighDef - Flag for high-definition screens
 *  * @example
 * ```typescript
 * // Load Reset styles or consume conditionals and append to your own styles
 * import * as token from '@universityofmaryland/web-token-library';
 * token.media.conditionals;
 * ```
 * @example
 * ```css
 *  .element {
 *    display: none;
 *    @container style(--isMediaDesktop: true) {
 *      display: block;
 *    }
 *  };
 * ```
 * @since 1.0.0
 */
export const conditionals = {
  '--isMediaSmall': false,
  '--isMediaSmallMax': false,
  '--isMediaMedium': false,
  '--isMediaMediumMax': false,
  '--isMediaLarge': false,
  '--isMediaLargeMax': false,
  '--isMediaTablet': false,
  '--isMediaTabletMax': false,
  '--isMediaDesktop': false,
  '--isMediaDesktopMax': false,
  '--isMediaHighDef': false,

  [`@media (${queries.small.min})`]: {
    '--isBreakpointSmall': true,
  },

  [`@media (${queries.small.max})`]: {
    '--isBreakpointSmallMax': true,
  },

  [`@media (${queries.medium.min})`]: {
    '--isBreakpointMedium': true,
  },

  [`@media (${queries.medium.max})`]: {
    '--isBreakpointMediumMax': true,
  },

  [`@media (${queries.large.min})`]: {
    '--isBreakpointLarge': true,
  },

  [`@media (${queries.large.max})`]: {
    '--isBreakpointLargeMax': true,
  },

  [`@media (${queries.tablet.min})`]: {
    '--isTablet': true,
  },

  [`@media (${queries.tablet.max})`]: {
    '--isTabletMax': true,
  },

  [`@media (${queries.desktop.min})`]: {
    '--isDesktop': true,
  },

  [`@media (${queries.desktop.max})`]: {
    '--isDesktopMax': true,
  },

  [`@media (${queries.highDef.min})`]: {
    '--isHighDef': true,
  },
};
