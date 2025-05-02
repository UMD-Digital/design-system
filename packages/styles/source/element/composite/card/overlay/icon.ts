/**
 * @module element/composite/card/overlay/icon
 * Provides styles for icon overlay card components with different themes.
 */

import { color, media, spacing } from '../../../../token';
import { image as imageElement } from '../../../asset';
import { create } from '../../../../utilities';
import { JssObject } from '../../../../_types';

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
      maxWidth: `${spacing.maxWidth.smallest}`,
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
 * @example
 * ```css
 * class="umd-element-composite-card-overlay-icon-element-container"
 * ```
 * @since 1.1.0
 */
export const elementIconContainer: JssObject = create.jss.objectWithClassName({
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
  padding: `${spacing.md}`,
  paddingTop: `${spacing.sm}`,
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
 * @example
 * ```css
 * class="umd-element-composite-card-overlay-icon-light"
 * ```
 * @since 1.1.0
 */
export const light: JssObject = create.jss.objectWithClassName({
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
 * @example
 * ```css
 * class="umd-element-composite-card-overlay-icon-dark"
 * ```
 * @since 1.1.0
 */
export const dark: JssObject = create.jss.objectWithClassName({
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
