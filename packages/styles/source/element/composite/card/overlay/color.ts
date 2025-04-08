/**
 * @module element/composite/card/overlay/color
 * Provides styles for color overlay card components with different themes.
 */

import { color, media, spacing } from '../../../../token';
import { image as imageElement } from '../../../asset';
import { create } from '../../../../utilities';
import type { JssObject } from '../../../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-overlay-color';

/**
 * Creates media query for responsive layouts.
 * @param {number} breakpoint - The breakpoint value in pixels
 * @param {string} comparison - The comparison operator ('min-width' or 'max-width')
 * @param {object} styles - The styles to apply at this breakpoint
 * @returns {object} Media query object with styles
 * @private
 */
const createMediaQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@media (${comparison}: ${breakpoint}px)`]: styles,
  };
};

/**
 * Creates image styles for overlay cards.
 * @param {object} customStyles - Additional custom styles to apply
 * @returns {object} Image styles for overlay card
 * @private
 */
const createImageStyles = (customStyles = {}) => {
  const baseStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    ...customStyles,
  };

  return {
    [`.${imageElement.wrapperScaled.className}`]: {
      ...baseStyles,

      '& img': {},
    },
  };
};

/**
 * Creates text styles for overlay cards.
 * @param {object} customStyles - Additional custom styles to apply
 * @returns {object} Text styles for overlay card content
 * @private
 */
const createTextStyles = (customStyles = {}) => {
  return {
    [`& > div:last-child`]: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9,
      position: 'relative',
      ...customStyles,
    },
  };
};

/**
 * Creates container styles for overlay cards.
 * @param {object} customStyles - Additional custom styles to apply
 * @returns {object} Container styles for overlay card
 * @private
 */
const createContainerStyles = (customStyles = {}) => {
  return {
    maxWidth: `${spacing.maxWidth.smallest}`,
    padding: `${spacing.md}`,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    ...customStyles,
  };
};

/**
 * Base styles for color overlay containers.
 * @private
 */
const colorContainerBase = {
  padding: `${spacing.lg} ${spacing.md}`,
  ...createMediaQuery(media.breakpointValues.tablet.min, 'min-width', {
    minHeight: '456px',
  }),
};

/**
 * Light theme color overlay card.
 * @returns {JssObject} Styles for light themed color overlay card.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.overlay.color.light
 * ```
 * @since 1.8.0
 */
export const light: JssObject = create.jssObject({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles({
    backgroundColor: color.gray.lightest,
    ...colorContainerBase,
  }),
  ...createTextStyles(),
  ...createImageStyles(),
});

/**
 * Dark theme color overlay card.
 * @returns {JssObject} Styles for dark themed color overlay card.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.overlay.color.dark
 * ```
 * @since 1.8.0
 */
export const dark: JssObject = create.jssObject({
  className: `${classNamePrefix}-dark`,
  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    ...colorContainerBase,
  }),
  ...createTextStyles(),
  ...createImageStyles(),
});
