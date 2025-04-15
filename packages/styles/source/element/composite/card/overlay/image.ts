/**
 * @module element/composite/card/overlay/image
 * Provides styles for image overlay card components with tinted effects.
 */

import { color, media, spacing } from '../../../../token';
import { image as imageElement } from '../../../asset';
import { create } from '../../../../utilities';
import { JssObject } from '../../../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-overlay-image';

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
 * Creates image styles for image overlay cards.
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
 * Creates text styles for image overlay cards.
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
 * Creates container styles for image overlay cards.
 * @param {object} customStyles - Additional custom styles to apply
 * @returns {object} Container styles for overlay card
 * @private
 */
const createContainerStyles = (customStyles = {}) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: `${spacing.lg} ${spacing.md}`,
    paddingTop: `${spacing['4xl']}`,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    minHeight: '360px',

    ...createContainerQuery(media.breakpointValues.medium.min, 'min-width', {
      paddingTop: `${spacing['8xl']}`,
      minHeight: `450px`,
    }),
    ...customStyles,
  };
};

/**
 * Quote container for image overlay cards.
 * @returns {JssObject} Styles for quote icon container in overlay cards.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.overlay.image.quoateContainer
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-overlay-image-element-quote"
 * ```
 * @since 1.8.0
 */
export const quoateContainer: JssObject = create.jssObject({
  className: `${classNamePrefix}-element-quote`,
  width: '41px',
  height: '30px',
  marginBottom: `${spacing.xs}`,

  '& svg': {
    fill: `${color.red}`,
  },
});

/**
 * Tinted image overlay card.
 * @returns {JssObject} Styles for tinted image overlay card with gradient effect.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.overlay.image.tint
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-overlay-image"
 * ```
 * @since 1.8.0
 */
export const tint: JssObject = create.jssObject({
  className: `${classNamePrefix}`,
  ...createContainerStyles({}),
  ...createTextStyles({
    height: 'auto',
  }),
  ...createImageStyles({
    [`&:before`]: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      opacity: 1,
      transition: `opacity 0.5s ease-in-out`,
      background:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 60%, rgba(0, 0, 0, 0.9) 100%)',
    },

    [`&[data-size="large"]:before`]: {
      background:
        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 30%, rgba(0, 0, 0, 0.9) 100%)',
    },

    [`&:hover:before`]: {
      opacity: 0.7,
    },

    '&:hover & img': {
      transform: 'scale(1)',
      transition: 'transform 0.5s ease-in-out',
    },
  }),
});
