/**
 * @module typography/elements
 * Provides typography styles for various UI elements.
 */

import { color, font, media } from '@universityofmaryland/web-token-library';
import { create } from '../utilities';
import type { JssObject } from '../_types';

/**
 * Common breakpoint variables for responsive typography.
 * @type {string}
 * @private
 */
const breakpointLarge = media.queries.large.min;
const breakpointDesktop = media.queries.desktop.min;

/**
 * Eyebrow typography style object.
 * @type {object}
 * @property {number} fontWeight - Bold weight (700)
 * @property {string} color - Black text color
 * @property {string} fontSize - Minimum font size
 * @property {number} lineHeight - Tight line height (1)
 * @property {string} textTransform - Uppercase transformation
 * @property {string} letterSpacing - Slight letter spacing
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.elements.eyebrow };
 * ```
 * @since 1.1.0
 */
export const eyebrow = {
  fontWeight: 700,
  color: color.black,
  fontSize: font.size.min,
  lineHeight: 1,
  textTransform: `uppercase`,
  letterSpacing: `.05em`,
};

/**
 * Medium label typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Sans-serif font family
 * @property {string} fontSize - Small font size that scales up on larger screens
 * @property {string} lineHeight - Readable line height for text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.elements.labelMedium };
 * ```
 * @since 1.1.0
 */
export const labelMedium = {
  fontFamily: font.family['sans'],
  fontSize: font.size['sm'],
  lineHeight: `1.42em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['base'],
    letterSpacing: '0.16em',
    lineHeight: `1.5em`,
  },
};

/**
 * Small label typography style.
 * @type {object}
 * @property {string} fontFamily - Sans-serif font family
 * @property {string} fontSize - Small font size
 * @property {string} letterSpacing - Wide letter spacing for legibility
 * @property {string} lineHeight - Readable line height
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.elements.labelSmall };
 * ```
 * @since 1.1.0
 */
export const labelSmall = {
  fontFamily: font.family['sans'],
  fontSize: font.size['sm'],
  letterSpacing: '0.16em',
  lineHeight: `1.42em`,
};

/**
 * Medium interactive typography style with responsive scaling.
 * @type {object}
 * @property {string} fontFamily - Sans-serif font family
 * @property {string} fontSize - Base font size that scales up on larger screens
 * @property {string} lineHeight - Tight line height suitable for interactive elements
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.elements.interativeMedium };
 * ```
 * @since 1.1.0
 */
export const interativeMedium = {
  fontFamily: font.family['sans'],
  fontSize: font.size['base'],
  lineHeight: `1.125em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['base']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['lg'],
    fontWeight: font.weight['bold'],
    letterSpacing: '-0.01em',
    lineHeight: `1.11em`,
  },
};

/**
 * Small interactive typography style.
 * @type {object}
 * @property {string} fontFamily - Sans-serif font family
 * @property {string} fontSize - Base font size
 * @property {string} fontWeight - Bold weight for emphasis
 * @property {string} letterSpacing - Slightly tighter letter spacing
 * @property {string} lineHeight - Tight line height suitable for interactive elements
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use in object spread syntax
 * const myStyle = { ...Styles.typography.elements.interativeSmall };
 * ```
 * @since 1.1.0
 */
export const interativeSmall = {
  fontFamily: font.family['sans'],
  fontSize: font.size['base'],
  fontWeight: font.weight['bold'],
  letterSpacing: '-0.01em',
  lineHeight: `1.125em`,
};

/**
 * Element types for typography
 * @since 1.7.0
 */
export type ElementType =
  | 'eyebrow'
  | 'labelMedium'
  | 'labelSmall'
  | 'medium'
  | 'small';

/**
 * Options for composable element typography
 * @since 1.7.0
 */
export interface ElementComposeOptions {
  /** Theme variant for color (overridden by color if provided) */
  theme?: 'light' | 'dark';
  /** Explicit color value (overrides theme) */
  color?: string;
}

/**
 * Composable element typography style selector
 *
 * Creates element typography styles with configurable type and theme.
 *
 * @param type - Typography element type
 * @param options - Configuration for theme and color
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Basic usage
 * const eyebrowStyle = elements.compose('eyebrow');
 *
 * // With dark theme
 * const darkEyebrow = elements.compose('eyebrow', { theme: 'dark' });
 *
 * // With explicit color
 * const grayLabel = elements.compose('labelSmall', { color: token.color.gray.dark });
 *
 * // With theme-aware subdued color
 * import { theme } from '@universityofmaryland/web-utilities-library/theme';
 * const caption = elements.compose('small', { color: theme.subdued(isThemeDark) });
 * ```
 *
 * @since 1.7.0
 */
export function compose(
  type: ElementType,
  options?: ElementComposeOptions,
): JssObject {
  const { theme = 'light', color: explicitColor } = options || {};

  // Select base variant
  const bases: Record<ElementType, any> = {
    eyebrow: eyebrow,
    labelMedium: labelMedium,
    labelSmall: labelSmall,
    medium: interativeMedium,
    small: interativeSmall,
  };

  const base = bases[type];

  // Determine final color (explicit color overrides theme)
  const finalColor = explicitColor || (theme === 'dark' ? color.white : color.black);

  // Apply color
  const composed = {
    ...base,
    color: finalColor,
  };

  // Generate className
  const classNameParts = ['umd-element', type];
  if (theme === 'dark') classNameParts.push('dark');

  return create.jss.objectWithClassName({
    ...composed,
    className: classNameParts.join('-'),
  });
}

/**
 * Ready-to-use typography styles as JSS objects with class names.
 * @type {Object<string, JssObject>}
 * @property {JssObject} eyebrow - JSS object for eyebrow text
 * @property {JssObject} labelMedium - JSS object for medium labels
 * @property {JssObject} labelSmall - JSS object for small labels
 * @property {JssObject} medium - JSS object for medium interactive text
 * @property {JssObject} small - JSS object for small interactive text
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * // Use as a complete JSS object including className
 * Styles.typography.elements.fonts.eyebrow
 * ```
 * @since 1.1.0
 */
export const fonts = {
  eyebrow: create.jss.objectWithClassName({
    className: 'umd-eyebrow',
    ...eyebrow,
  }),

  labelMedium: create.jss.objectWithClassName({
    className: 'umd-label-sans-medium',
    ...labelMedium,
  }),

  labelSmall: create.jss.objectWithClassName({
    className: 'umd-label-sans-small',
    ...labelSmall,
  }),

  medium: create.jss.objectWithClassName({
    className: 'umd-interactive-sans-medium',
    ...interativeMedium,
  }),

  small: create.jss.objectWithClassName({
    className: 'umd-interactive-sans-small',
    ...interativeSmall,
  }),
};
