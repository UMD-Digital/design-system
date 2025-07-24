/**
 * @module element/composite/card/block
 * Provides block card components with various styles and configurations.
 */

import { color, media, spacing } from '../../../token';
import { image } from '../../asset';
import { create } from '../../../utilities';
import type { JssObject } from '../../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-composite-card-block';
const mediumBreakpointStart = media.breakpointValues.medium.min;

/**
 * Creates a container query media rule for specific breakpoint.
 * @param {number} breakpoint - The breakpoint in pixels
 * @param {string} comparison - The comparison operator, defaults to 'max-width'
 * @param {object} styles - The styles to apply at this breakpoint
 * @returns {object} Media query object
 */
const createContainerQuery = (
  breakpoint: number,
  comparison = 'max-width',
  styles = {},
) => {
  return {
    [`@media (${comparison}: ${breakpoint}px)`]: styles,
  };
};

const personImageContainer = {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: `${color.gray.lighter}`,
  marginBottom: `${spacing.md}`,
};

const personImage = {
  display: 'block',
  width: '100%',
  objectFit: 'contain',
  height: '140px',

  ...createContainerQuery(mediumBreakpointStart, 'min-width', {
    height: '200px',
  }),
};

/**
 * Person block card.
 * @returns {JssObject} Block card optimized for person/profile display.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.block.person
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-block-person"
 * ```
 * @since 1.1.0
 */
export const person: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-person`,

  [`.${image.wrapper.className}`]: {
    ...personImageContainer,

    ['img, svg']: {
      ...personImage,
    },
  },
});

/**
 * Person block card with dark background.
 * @returns {JssObject} Block card for person/profile with dark background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.block.personDark
 * ```
 * @example
 * ```css
 * class="umd-element-composite-card-block-person-dark"
 * ```
 * @since 1.1.0
 */
export const personDark: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-person-dark`,

  [`.${image.wrapper.className}`]: {
    ...personImageContainer,
    backgroundColor: `${color.gray.darker}`,

    ['img, svg']: {
      ...personImage,
    },
  },
});
