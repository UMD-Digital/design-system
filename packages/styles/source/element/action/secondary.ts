/**
 * @module element/action/secondary
 * Provides secondary action button styles.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { base, baseLarge, iconBase, iconBaseLarge } from './_base';

// Consistent naming
const classNamePrefix = 'umd-action-secondary';

const secondaryBase = {
  color: color.black,
  padding: 0,
  maxWidth: 'initial',
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  '&:has(svg), &:has(img)': {
    paddingLeft: `calc(${spacing.md} - 4px)`,
  },
};

const secondaryLargeBase = {
  ...baseLarge,

  '&:has(svg), &:has(img)': {
    paddingLeft: `calc(${spacing.md} - 4px)`,
  },
};

const secondaryBaseIcon = {
  ...iconBase,
  left: `0`,

  '& path': {
    fill: `${color.red} !important`,
  },
};

const secondaryBaseLargeIcon = {
  ...iconBaseLarge,
  left: `0`,

  [`@media (${media.queries.tablet.min})`]: {
    left: `0`,
  },

  '& path': {
    fill: `${color.red} !important`,
  },
};

/**
 * Normal secondary button style.
 * @returns {JssObject} The JSS object for the normal secondary button style.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.secondary.normal
 * ```
 * @example
 * ```css
 * class="umd-action-secondary"
 * ```
 * @since 1.1.0
 */
export const normal: JssObject = create.jss.objectWithClassName({
  ...base,
  ...secondaryBase,
  className: `${classNamePrefix}`,
  color: `${color.black}`,

  '& svg': {
    ...secondaryBaseIcon,
  },
});

/**
 * Large secondary button style.
 * @returns {JssObject} The JSS object for the large secondary button style.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.secondary.large
 * ```
 * @example
 * ```css
 * class="umd-action-secondary-large"
 * ```
 * @since 1.1.0
 */
export const large: JssObject = create.jss.objectWithClassName({
  ...baseLarge,
  ...secondaryLargeBase,
  className: `${classNamePrefix}-large`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: 0,
  },

  '& svg': {
    ...secondaryBaseLargeIcon,
  },
});

/**
 * White secondary button style.
 * @returns {JssObject} The JSS object for the white secondary button style.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.secondary.white
 * ```
 * @example
 * ```css
 * class="umd-action-secondary-white"
 * ```
 * @since 1.1.0
 */
export const white: JssObject = create.jss.objectWithClassName({
  ...base,
  ...secondaryBase,
  color: color.white,
  className: `${classNamePrefix}-white`,

  '& svg': {
    ...secondaryBaseIcon,
  },
});

/**
 * Gold secondary button style.
 * @returns {JssObject} The JSS object for the gold secondary button style.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.secondary.gold
 * ```
 * @example
 * ```css
 * class="umd-action-secondary-gold"
 * ```
 * @since 1.1.0
 */
export const gold: JssObject = create.jss.objectWithClassName({
  ...base,
  ...secondaryBase,
  color: color.white,
  className: `${classNamePrefix}-gold`,

  '& svg': {
    ...secondaryBaseIcon,
    fill: color.gold,
  },
});
