/**
 * @module token/media
 * Provides responsive design tokens for breakpoints and media queries.
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
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.media.breakpointValues.desktop.min // 1024
 * ```
 * @since 1.8.0
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
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.token.media.breakpoints.desktop.min // "1024px"
 * ```
 * @since 1.8.0
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
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in JSS/CSS-in-JS
 * const styles = {
 *   [`@media (${Styles.token.media.queries.desktop.min})`]: {
 *     // Desktop-specific styles
 *   }
 * };
 * ```
 * @since 1.8.0
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
