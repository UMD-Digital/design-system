/**
 * @module element/action/secondary
 * Provides secondary action button styles.
 */

import { color, media, spacing } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { base, baseLarge, iconBase, iconBaseLarge } from './_base';

// Consistent naming
const classNamePrefix = 'umd-action-secondary';

/**
 * Options for secondary action style variants
 * @since 1.7.0
 */
export interface SecondaryOptions {
  size?: 'normal' | 'large';
  color?: 'default' | 'white' | 'gold';
}

/**
 * Base secondary styles.
 * @type {object}
 * @private
 */
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

/**
 * Base secondary icon styles.
 * @type {object}
 * @private
 */
const secondaryBaseIcon = {
  ...iconBase,
  left: `0`,

  '& path': {
    fill: `${color.red} !important`,
  },
};

/**
 * Base large secondary icon styles.
 * @type {object}
 * @private
 */
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
 * Composable secondary action button style selector
 *
 * Creates secondary button styles with configurable size and color options.
 * Secondary buttons are used for less prominent actions on a page.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Normal size, default color
 * const styles = composeSecondary();
 *
 * // Large size
 * const styles = composeSecondary({ size: 'large' });
 *
 * // White color variant
 * const styles = composeSecondary({ color: 'white' });
 *
 * // Gold color variant
 * const styles = composeSecondary({ color: 'gold' });
 * ```
 *
 * @since 1.7.0
 */
export function composeSecondary(options?: SecondaryOptions): JssObject {
  const { size = 'normal', color: buttonColor = 'default' } = options || {};

  let composed: Record<string, any> = {};

  // Apply size base
  if (size === 'normal') {
    composed = {
      ...base,
      ...secondaryBase,
    };
  } else if (size === 'large') {
    composed = {
      ...baseLarge,
      ...secondaryBase,

      '&:has(svg), &:has(img)': {
        paddingLeft: `calc(${spacing.md} - 4px)`,
      },

      [`@media (${media.queries.tablet.min})`]: {
        padding: 0,
      },
    };
  }

  // Apply color styles
  if (buttonColor === 'default') {
    composed = {
      ...composed,
      color: `${color.black}`,

      '& svg': size === 'large'
        ? { ...secondaryBaseLargeIcon }
        : { ...secondaryBaseIcon },
    };
  } else if (buttonColor === 'white') {
    composed = {
      ...composed,
      color: color.white,

      '& svg': size === 'large'
        ? { ...secondaryBaseLargeIcon }
        : { ...secondaryBaseIcon },
    };
  } else if (buttonColor === 'gold') {
    composed = {
      ...composed,
      color: color.white,

      '& svg': size === 'large'
        ? { ...secondaryBaseLargeIcon, fill: color.gold }
        : { ...secondaryBaseIcon, fill: color.gold },
    };
  }

  // Generate appropriate className
  let className = `${classNamePrefix}`;

  if (size === 'large' && buttonColor === 'default') {
    className = `${classNamePrefix}-large`;
  } else if (size === 'normal' && buttonColor === 'white') {
    className = `${classNamePrefix}-white`;
  } else if (size === 'normal' && buttonColor === 'gold') {
    className = `${classNamePrefix}-gold`;
  } else if (size === 'large' && buttonColor === 'white') {
    className = `${classNamePrefix}-large-white`;
  } else if (size === 'large' && buttonColor === 'gold') {
    className = `${classNamePrefix}-large-gold`;
  }

  return create.jss.objectWithClassName({
    ...composed,
    className,
  });
}

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
export const normal: JssObject = composeSecondary();

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
export const large: JssObject = composeSecondary({ size: 'large' });

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
export const white: JssObject = composeSecondary({ color: 'white' });

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
export const gold: JssObject = composeSecondary({ color: 'gold' });
