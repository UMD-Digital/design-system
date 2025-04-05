/**
 * @module element/composite/card/overlay/icon
 * Provides styles for icon overlay card components with different themes.
 */

import { color, media, spacing } from '../../../../token';
import { image as imageElement } from '../../../asset';
import { create } from '../../../../utilities';
import { JssObject } from '../../../../utilities/transform';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-overlay-icon';

/**
 * Creates container query for responsive layouts.
 * @param {number} breakpoint - The breakpoint value in pixels
 * @param {string} comparison - The comparison operator ('min-width' or 'max-width')
 * @param {object} styles - The styles to apply at this breakpoint
 * @returns {object} Container query object with styles
 * @private
 */
const createContainerQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@container (${comparison}: ${breakpoint}px)`]: styles,
  };
};

/**
 * Creates image styles for icon overlay cards.
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
 * Creates text styles for icon overlay cards.
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
 * Creates container styles for icon overlay cards.
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
 * Icon container for icon overlay cards.
 * @returns {JssObject} Styles for the icon container within overlay cards.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.overlay.icon.elementIconContainer
 * ```
 * @since 1.8.0
 */
export const elementIconContainer: JssObject = create.jssObject({
  className: `${classNamePrefix}-element-container`,
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: `${spacing.lg}`,

  '& *': {
    maxHeight: '120px',
  },
});

/**
 * Base styles for icon containers.
 * @private
 */
const iconContainerBase = {
  padding: `${spacing.sm}`,
  paddingBottom: `${spacing.md}`,
};

/**
 * Base text styles for icon containers.
 * @private
 */
const iconContainerTextBase = {
  height: 'auto',
};

/**
 * Light theme icon overlay card.
 * @returns {JssObject} Styles for light themed icon overlay card.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.overlay.icon.light
 * ```
 * @since 1.8.0
 */
export const light: JssObject = create.jssObject({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles({
    backgroundColor: color.gray.lightest,
    ...iconContainerBase,
  }),
  ...createTextStyles({
    ...iconContainerTextBase,
  }),
  ...createImageStyles({}),
});

/**
 * Dark theme icon overlay card.
 * @returns {JssObject} Styles for dark themed icon overlay card.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.overlay.icon.dark
 * ```
 * @since 1.8.0
 */
export const dark: JssObject = create.jssObject({
  className: `${classNamePrefix}-dark`,
  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    ...iconContainerBase,
  }),
  ...createTextStyles({
    ...iconContainerTextBase,
  }),
  ...createImageStyles({}),
});
