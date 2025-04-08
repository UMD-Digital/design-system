/**
 * @module element/text/line
 * Provides styles for text with line decorations like underlines, dividers, and borders.
 */

import { color, spacing, media } from '../../token';
import { elements } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-line';

/**
 * Tailwing text with centered line decoration.
 * @returns {JssObject} Styles for text with horizontal centered line.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.tailwing
 * ```
 * @since 1.8.0
 */
export const tailwing: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-tailwing`,
    /** @deprecated Use 'umd-text-line-tailwing' instead */
    'umd-tailwings-headline',
  ],

  ...elements.labelSmall,
  textAlign: 'center',
  textTransform: 'uppercase',
  overflow: 'hidden',
  position: 'relative',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '9px',
    left: `0`,
    width: `100vw`,
    height: '1px',
    background: `${color.black}`,
    zIndex: -1,
  },

  '& > span': {
    position: 'relative',
    display: 'inline-block',
    maxWidth: '70%',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: `-2px`,
      right: `-2px`,
      height: '100%',
      backgroundColor: `${color.white}`,
      zIndex: -1,

      [`@media (${media.queries.medium.min})`]: {
        left: `-${spacing.min}`,
        right: `-${spacing.min}`,
      },

      [`@media (${media.queries.large.min})`]: {
        left: `-${spacing.sm}`,
        right: `-${spacing.sm}`,
      },
    },
  },

  '& + *': {
    marginTop: spacing.md,
  },
});

/**
 * Common styles for trailing line before element.
 * @type {object}
 * @private
 */
const trailingBefore = {
  content: '""',
  position: 'absolute',
  top: '9px',
  right: `0`,
  width: `100vw`,
  height: '1px',
  background: `${color.black}`,
  zIndex: 1,
};

/**
 * Trailing line text style.
 * @returns {JssObject} Styles for text with trailing horizontal line.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.trailing
 * ```
 * @since 1.8.0
 */
export const trailing = create.jssObject({
  className: [
    `${classNamePrefix}-trailing`,
    /** @deprecated Use 'umd-text-line-trailing' instead */
    'umd-tailwing-right-headline',
  ],

  ...elements.labelSmall,
  textTransform: 'uppercase',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: `${color.white}`,

  '&::before': {
    ...trailingBefore,
  },

  '& > span': {
    position: 'relative',
    backgroundColor: `inherit`,
    paddingRight: spacing.min,
    zIndex: 2,
  },

  '& + *': {
    marginTop: spacing.xl,
  },
});

/**
 * Light-themed trailing line text style.
 * @returns {JssObject} Styles for text with trailing horizontal line on light background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.trailingLight
 * ```
 * @since 1.8.0
 */
export const trailingLight: JssObject = create.jssObject({
  ...trailing,
  backgroundColor: `${color.gray.lighter}`,

  className: [
    `${classNamePrefix}-trailing-light`,
    /** @deprecated Use 'umd-text-line-trailing-light' instead */
    'umd-tailwing-right-headline[theme="light"]',
  ],
});

/**
 * Dark-themed trailing line text style.
 * @returns {JssObject} Styles for text with trailing horizontal line on dark background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.trailingDark
 * ```
 * @since 1.8.0
 */
export const trailingDark: JssObject = create.jssObject({
  ...trailing,
  backgroundColor: `${color.gray.darker}`,
  color: `${color.white}`,

  className: [
    `${classNamePrefix}-trailing-dark`,
    /** @deprecated Use 'umd-text-line-trailing-dark' instead */
    'umd-tailwing-right-headline[theme="dark"]',
  ],

  '&::before': {
    ...trailingBefore,
    background: `${color.white}`,
  },
});

/**
 * Adjacent vertical line decoration style.
 * @returns {JssObject} Styles for text with vertical red line decoration on the left.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.adjustent
 * ```
 * @since 1.8.0
 */
export const adjustent: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-adjustent`,
    /** @deprecated Use 'umd-text-line-adjustent' instead */
    'umd-adjacent-line-text',
  ],

  position: 'relative',

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: `-${spacing.md}`,
    width: '2px',
    height: '100%',
    backgroundColor: color.red,
  },
});

/**
 * Inset vertical line decoration style.
 * @returns {JssObject} Styles for text with inset vertical red line and left padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.adjustentInset
 * ```
 * @since 1.8.0
 */
export const adjustentInset: JssObject = create.jssObject({
  className: `${classNamePrefix}-adjustent-inset`,
  position: 'relative',
  paddingLeft: `${spacing.md}`,

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '2px',
    height: '100%',
    backgroundColor: color.red,
  },
});
