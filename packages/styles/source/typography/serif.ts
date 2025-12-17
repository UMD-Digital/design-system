/**
 * @module typography/serif
 * Provides serif typography styles with various sizes and responsive scaling options.
 */

import { color, font, media } from '@universityofmaryland/web-token-library';
import { create } from '../utilities';
import type { JssObject } from '../_types';

/**
 * Size types for serif typography
 * @since 1.7.0
 */
export type SerifSize =
  | 'maximum'
  | 'extralarge'
  | 'larger'
  | 'large'
  | 'medium';

/**
 * Options for composable serif typography
 * @since 1.7.0
 */
export interface SerifComposeOptions {
  /** Theme variant for color (overridden by color if provided) */
  theme?: 'light' | 'dark';
  /** Explicit color value (overrides theme) */
  color?: string;
}

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
const maximumBase = {
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
const extralargeBase = {
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
const largerBase = {
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
const largeBase = {
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
const mediumBase = {
  ...base,
  ...sizeMedium,
};

/**
 * Composable serif typography style selector
 *
 * Creates serif typography styles with configurable size and theme options.
 *
 * @param size - Typography size variant
 * @param options - Configuration for theme and color
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Basic usage
 * const heading = serif.compose('large');
 *
 * // With dark theme
 * const darkHeading = serif.compose('large', { theme: 'dark' });
 *
 * // With explicit color
 * const grayHeading = serif.compose('large', { color: token.color.gray.dark });
 *
 * // With theme-aware subdued color
 * import { theme } from '@universityofmaryland/web-utilities-library/theme';
 * const subtitle = serif.compose('medium', { color: theme.subdued(isThemeDark) });
 * ```
 *
 * @since 1.7.0
 */
export function compose(
  size: SerifSize,
  options?: SerifComposeOptions,
): JssObject {
  const { theme, color: explicitColor } = options || {};

  const sizes: Record<SerifSize, any> = {
    maximum: maximumBase,
    extralarge: extralargeBase,
    larger: largerBase,
    large: largeBase,
    medium: mediumBase,
  };

  const base = sizes[size];

  // Determine final color (explicit color overrides theme)
  const finalColor =
    explicitColor || (theme === 'dark' ? color.white : color.black);

  // Apply color
  const composed = {
    ...base,
    ...(theme && {
      color: finalColor,
    }),
  };

  // Generate className
  const classNameParts = ['umd-serif', size];
  if (theme === 'dark') classNameParts.push('dark');

  return create.jss.objectWithClassName({
    ...composed,
    className: classNameParts.join('-'),
  });
}

/**
 * Maximum size serif typography (static export).
 * @since 1.1.0
 */
export const maximum: JssObject = compose('maximum');

/**
 * Extra large size serif typography (static export).
 * @since 1.1.0
 */
export const extralarge: JssObject = compose('extralarge');

/**
 * Larger size serif typography (static export).
 * @since 1.1.0
 */
export const larger: JssObject = compose('larger');

/**
 * Large size serif typography (static export).
 * @since 1.1.0
 */
export const large: JssObject = compose('large');

/**
 * Medium size serif typography (static export).
 * @since 1.1.0
 */
export const medium: JssObject = compose('medium');

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
  maximum: compose('maximum'),
  extraLarge: compose('extralarge'),
  larger: compose('larger'),
  large: compose('large'),
  medium: compose('medium'),
};
