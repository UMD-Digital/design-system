/**
 * @module typography/campaign
 * Provides campaign typography styles with various sizes and responsive behavior.
 */

import { font, media } from '../token';
import { create } from '../utilities';
import type { JssObject } from '../_types';

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
export const maxium = {
  ...base,
  ...sizeSmall,

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
export const extralarge = {
  ...base,
  ...sizeSmall,

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
export const large = {
  ...base,
  ...sizeSmall,

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
export const medium = {
  ...base,
  ...sizeSmall,

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
export const CampaignSmall = {
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
export const extraSmall = {
  ...base,
  ...sizeExtraSmall,
};

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
  maximum: create.jssObject({
    className: 'umd-campaign-maximum',
    ...maxium,
  }),

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
  extraLarge: create.jssObject({
    className: 'umd-campaign-extralarge',
    ...extralarge,
  }),

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
  large: create.jssObject({
    className: 'umd-campaign-large',
    ...large,
  }),

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
  medium: create.jssObject({
    className: 'umd-campaign-medium',
    ...medium,
  }),

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
  small: create.jssObject({
    className: 'umd-campaign-small',
    ...CampaignSmall,
  }),

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
  extraSmall: create.jssObject({
    className: 'umd-campaign-extrasmall',
    ...extraSmall,
  }),
};
