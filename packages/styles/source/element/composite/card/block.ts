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

const smallBreakpoint = media.breakpointValues.small.max;
const mediumBreakpointStart = media.breakpointValues.medium.min;
const mediumBreakpoint = media.breakpointValues.large.min;

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

/**
 * Creates a container query for a range of viewport sizes.
 * @param {number} min - The minimum breakpoint in pixels
 * @param {number} max - The maximum breakpoint in pixels
 * @param {object} styles - The styles to apply within this range
 * @returns {object} Media query object
 */
const createRangeContainerQuery = (min: number, max: number, styles = {}) => {
  return {
    [`@media (min-width: ${min}px) and (max-width: ${max})`]: styles,
  };
};

/**
 * Creates styles for card images with responsive behavior.
 * @param {object} customStyles - Additional custom styles to apply
 * @returns {object} Complete image styles object
 */
const createImageStyles = (customStyles = {}) => {
  const baseStyles = {
    height: 'auto',
    ...customStyles,
  };

  return {
    [`.${image.wrapperScaled.className}`]: {
      ...baseStyles,
      ...createContainerQuery(smallBreakpoint, 'max-width', {
        marginLeft: spacing.sm,
        marginBottom: spacing.md,
        width: '120px',
        float: 'right',
        alignSelf: 'flex-start',
      }),

      ...createContainerQuery(mediumBreakpointStart, 'min-width', {
        display: 'block',
      }),

      '& img': {
        ...createContainerQuery(smallBreakpoint, 'max-width', {
          height: 'auto !important',
        }),
      },
    },
  };
};

/**
 * Creates styles for card text content with responsive behavior.
 * @param {object} customStyles - Additional custom styles to apply
 * @returns {object} Complete text styles object
 */
const createTextStyles = (customStyles = {}) => {
  return {
    [`& > div:not(.${image.wrapperScaled.className})`]: {
      ...createContainerQuery(mediumBreakpointStart, 'min-width', {
        paddingTop: spacing.md,
      }),
      ...createContainerQuery(mediumBreakpoint, 'min-width', {
        paddingTop: spacing.lg,
      }),
      ...customStyles,
    },
  };
};

/**
 * Creates styles for the card container with responsive behavior.
 * @param {object} customStyles - Additional custom styles to apply
 * @returns {object} Complete container styles object
 */
const createContainerStyles = (customStyles = {}) => {
  return {
    maxWidth: `${spacing.maxWidth.smallest}`,

    [`&:has(img)`]: {
      ...createContainerQuery(smallBreakpoint, 'max-width', {}),
    },
    ...customStyles,
  };
};

/**
 * Light theme block card.
 * @returns {JssObject} Light themed block card with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.block.light
 * ```
 * @since 1.8.0
 */
export const light: JssObject = create.jssObject({
  className: `${classNamePrefix}-light`,
  ...createContainerStyles(),
  ...createTextStyles(),
  ...createImageStyles(),
});

/**
 * Bordered block card.
 * @returns {JssObject} Block card with light border and responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.block.border
 * ```
 * @since 1.8.0
 */
export const border: JssObject = create.jssObject({
  className: `${classNamePrefix}-border`,
  ...createContainerStyles({
    border: `1px solid ${color.gray.light}`,
    height: '100%',
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      padding: spacing.md,
    }),
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpointStart, 'min-width', {
      padding: spacing.md,
    }),
  }),
  ...createImageStyles({
    ...createRangeContainerQuery(mediumBreakpointStart, mediumBreakpoint, {
      marginLeft: spacing.sm,
    }),
  }),
});

/**
 * Dark bordered block card.
 * @returns {JssObject} Block card with dark border and responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.block.borderDark
 * ```
 * @since 1.8.0
 */
export const borderDark: JssObject = create.jssObject({
  className: `${classNamePrefix}-border`,
  ...createContainerStyles({
    border: `1px solid ${color.gray.darker}`,
    height: '100%',
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      padding: spacing.md,
    }),
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpointStart, 'min-width', {
      padding: spacing.md,
    }),
  }),
  ...createImageStyles({
    ...createRangeContainerQuery(mediumBreakpointStart, mediumBreakpoint, {
      marginLeft: spacing.sm,
    }),
  }),
});

/**
 * Dark theme block card.
 * @returns {JssObject} Dark themed block card with responsive layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.block.dark
 * ```
 * @since 1.8.0
 */
export const dark: JssObject = create.jssObject({
  className: `${classNamePrefix}-dark`,

  ...createContainerStyles({
    backgroundColor: color.gray.darker,
    color: color.white,
    height: '100%',
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      padding: spacing.md,
    }),
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpointStart, 'min-width', {
      padding: spacing.md,
    }),
  }),
  ...createImageStyles({
    ...createContainerQuery(smallBreakpoint, 'max-width', {
      marginRight: spacing.sm,
      marginTop: spacing.sm,
    }),
  }),
});

/**
 * Transparent block card.
 * @returns {JssObject} Transparent block card with white text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.composite.card.block.transparent
 * ```
 * @since 1.8.0
 */
export const transparent: JssObject = create.jssObject({
  className: `${classNamePrefix}-transparent`,

  ...createContainerStyles({
    backgroundColor: 'transparent',
    color: color.white,
    height: '100%',
  }),
  ...createTextStyles({
    ...createContainerQuery(mediumBreakpointStart, 'min-width', {
      paddingTop: spacing.md,
    }),
  }),
  ...createImageStyles(),
});

const personContainer = {};

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
 * @since 1.8.0
 */
export const person: JssObject = create.jssObject({
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
 * @since 1.8.0
 */
export const personDark: JssObject = create.jssObject({
  className: `${classNamePrefix}-person-dark`,

  [`.${image.wrapper.className}`]: {
    ...personImageContainer,
    backgroundColor: `${color.gray.darker}`,

    ['img, svg']: {
      ...personImage,
    },
  },
});
