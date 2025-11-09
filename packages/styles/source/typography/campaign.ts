/**
 * @module typography/campaign
 * Provides campaign typography styles with various sizes and responsive behavior.
 */

import { color, font, media } from '../token';
import { create } from '../utilities';
import type { JssObject } from '../_types';

/**
 * Size types for campaign typography
 * @since 1.7.0
 */
export type CampaignSize =
  | 'maximum'
  | 'extralarge'
  | 'large'
  | 'medium'
  | 'small'
  | 'extrasmall';

/**
 * Options for composable campaign typography
 * @since 1.7.0
 */
export interface CampaignComposeOptions {
  /** Theme variant for color */
  theme?: 'light' | 'dark';
}

/**
 * Breakpoint constants for responsive styles
 * @private
 */
const breakpointLarge = media.queries.large.min;
const breakpointDesktop = media.queries.desktop.min;

/**
 * Base campaign typography styles
 * @private
 */
const base = {
  fontFamily: font.family['campaign'],
  fontStyle: 'italic',
  fontWeight: font.weight['bold'],
};

/**
 * Extra small size base properties
 * @private
 */
const sizeExtraSmall = {
  fontSize: font.size['4xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.94em`,
};

/**
 * Small size base properties
 * @private
 */
const sizeSmall = {
  fontSize: font.size['5xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.91em`,
};

/**
 * Maximum size campaign typography
 * @private
 */
const maximumBase = {
  ...base,
  ...sizeSmall,
  textWrap: 'pretty',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['9xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: '120px',
    lineHeight: `0.9em`,
  },
};

/**
 * Extra large size campaign typography
 * @private
 */
const extralargeBase = {
  ...base,
  ...sizeSmall,
  textWrap: 'pretty',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['5xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['10xl'],
    lineHeight: `0.91em`,
  },
};

/**
 * Large size campaign typography
 * @private
 */
const largeBase = {
  ...base,
  ...sizeSmall,
  textWrap: 'pretty',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['5xl']} + 2.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['9xl'],
    lineHeight: `0.91em`,
  },
};

/**
 * Medium size campaign typography
 * @private
 */
const mediumBase = {
  ...base,
  ...sizeSmall,
  textWrap: 'pretty',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['5xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['7xl'],
    letterSpacing: '0.02em',
    lineHeight: `0.94em`,
  },
};

/**
 * Small size campaign typography
 * @private
 */
const campaignSmallBase = {
  ...base,
  ...sizeExtraSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['4xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeSmall,
  },
};

/**
 * Extra small size campaign typography
 * @private
 */
const extraSmallBase = {
  ...base,
  ...sizeExtraSmall,
};

/**
 * Composable campaign typography style selector
 *
 * Creates campaign typography styles with configurable size and theme options.
 *
 * @param size - Typography size variant
 * @param options - Configuration for theme
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Basic usage
 * const heading = campaign.compose('large');
 *
 * // With dark theme
 * const darkHeading = campaign.compose('large', { theme: 'dark' });
 *
 * // In element builder with theme
 * const styleElements = {
 *   ...typography.campaign.compose('extralarge', {
 *     theme: isThemeDark ? 'dark' : 'light'
 *   }),
 * };
 * ```
 *
 * @since 1.7.0
 */
export function compose(
  size: CampaignSize,
  options?: CampaignComposeOptions,
): JssObject {
  const { theme = 'light' } = options || {};

  const sizes: Record<CampaignSize, any> = {
    maximum: maximumBase,
    extralarge: extralargeBase,
    large: largeBase,
    medium: mediumBase,
    small: campaignSmallBase,
    extrasmall: extraSmallBase,
  };

  const base = sizes[size];

  // Apply theme color
  const composed = {
    ...base,
    color: theme === 'dark' ? color.white : color.black,
  };

  // Generate className
  const classNameParts = ['umd-campaign', size];
  if (theme === 'dark') classNameParts.push('dark');

  return create.jss.objectWithClassName({
    ...composed,
    className: classNameParts.join('-'),
  });
}

/**
 * Maximum size campaign typography (static export).
 * @since 1.1.0
 */
export const maximum: JssObject = compose('maximum');

/**
 * Extra large size campaign typography (static export).
 * @since 1.1.0
 */
export const extralarge: JssObject = compose('extralarge');

/**
 * Large size campaign typography (static export).
 * @since 1.1.0
 */
export const large: JssObject = compose('large');

/**
 * Medium size campaign typography (static export).
 * @since 1.1.0
 */
export const medium: JssObject = compose('medium');

/**
 * Small size campaign typography (static export).
 * @since 1.1.0
 */
export const small: JssObject = compose('small');

/**
 * Extra small size campaign typography (static export).
 * @since 1.1.0
 */
export const extraSmall: JssObject = compose('extrasmall');

/**
 * Campaign typography styles with various responsive sizes.
 * @returns {object} An object containing all campaign typography variants as JssObjects.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.typography.campaign.fonts.maximum
 * Styles.typography.campaign.fonts.large
 * ```
 * @since 1.1.0
 */
export const fonts = {
  /**
   * Maximum size campaign typography.
   * @returns {JssObject} Maximum size campaign typography with responsive behavior.
   * @example
   * ```typescript
   * import * as Styles from '@universityofmaryland/web-styles-library';
   * Styles.typography.campaign.fonts.maximum
   * ```
   * @example
   * ```css
   * class="umd-campaign-maximum"
   * ```
   * @since 1.1.0
   */
  maximum: compose('maximum'),

  /**
   * Extra large size campaign typography.
   * @returns {JssObject} Extra large size campaign typography with responsive behavior.
   * @example
   * ```typescript
   * import * as Styles from '@universityofmaryland/web-styles-library';
   * Styles.typography.campaign.fonts.extraLarge
   * ```
   * @example
   * ```css
   * class="umd-campaign-extralarge"
   * ```
   * @since 1.1.0
   */
  extraLarge: compose('extralarge'),

  /**
   * Large size campaign typography.
   * @returns {JssObject} Large size campaign typography with responsive behavior.
   * @example
   * ```typescript
   * import * as Styles from '@universityofmaryland/web-styles-library';
   * Styles.typography.campaign.fonts.large
   * ```
   * @example
   * ```css
   * class="umd-campaign-large"
   * ```
   * @since 1.1.0
   */
  large: compose('large'),

  /**
   * Medium size campaign typography.
   * @returns {JssObject} Medium size campaign typography with responsive behavior.
   * @example
   * ```typescript
   * import * as Styles from '@universityofmaryland/web-styles-library';
   * Styles.typography.campaign.fonts.medium
   * ```
   * @example
   * ```css
   * class="umd-campaign-medium"
   * ```
   * @since 1.1.0
   */
  medium: compose('medium'),

  /**
   * Small size campaign typography.
   * @returns {JssObject} Small size campaign typography with responsive behavior.
   * @example
   * ```typescript
   * import * as Styles from '@universityofmaryland/web-styles-library';
   * Styles.typography.campaign.fonts.small
   * ```
   * @example
   * ```css
   * class="umd-campaign-small"
   * ```
   * @since 1.1.0
   */
  small: compose('small'),

  /**
   * Extra small size campaign typography.
   * @returns {JssObject} Extra small size campaign typography.
   * @example
   * ```typescript
   * import * as Styles from '@universityofmaryland/web-styles-library';
   * Styles.typography.campaign.fonts.extraSmall
   * ```
   * @example
   * ```css
   * class="umd-campaign-extrasmall"
   * ```
   * @since 1.1.0
   */
  extraSmall: compose('extrasmall'),
};
