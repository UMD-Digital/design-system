/**
 * @module element/text/rich
 * Provides rich text styles for formatted HTML content with various variants.
 */

import { color, font, media, spacing } from '../../token';
import { sans } from '../../typography';
import * as animation from '../../animation';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import * as list from '../list';
import * as table from '../table';
import { code } from './code';
import { quote } from './quote';

// Consistent naming
const classNamePrefix = 'umd-text-rich';
const scalingContainerMedium = 650;

/**
 * Dark theme color styles for rich text.
 * @type {object}
 * @private
 */
const themeDarkColors = {
  ...animation.nestedElements.linksDark,
  color: color.white,

  '& *': {
    color: `${color.white} !important`,
  },
};

/**
 * Consistent spacing for child elements.
 * @type {object}
 * @private
 */
const childSpacing = {
  marginTop: spacing.md,

  '&:first-child': {
    marginTop: '0',
  },

  '&:empty': {
    marginTop: 0,
  },
};

/**
 * Consistent sizing for largest.
 * @type {object}
 * @private
 */
const largestTypography = {
  fontSize: font.size['2xl'],
  lineHeight: '1.25em',
};

/**
 * Base styles for simple rich text.
 * @type {object}
 * @private
 */
const simpleBase = {
  ...animation.nestedElements.linksWhite,
  fontSize: font.size.base,
  lineHeight: '1.5em',

  '& > *': {
    fontSize: font.size.base,
    ...childSpacing,
  },

  '& em, & i': {
    fontStyle: 'italic',
  },

  '& strong, & b': {
    FontWeight: font.weight.bold,
  },

  '& u': {
    textDecoration: 'underline',
  },
};

/**
 * Base styles for advanced rich text.
 * @type {object}
 * @private
 */
const advancedBase = {
  ...simpleBase,
  fontSize: font.size.lg,
  lineHeight: '1.5em',

  '& > *': {
    fontSize: font.size.lg,
    ...childSpacing,
  },

  [`& p,
    & ul,
    & ol,
    & pre,
    & blockquote`]: {
    maxWidth: '960px',
  },

  '& hr': {
    border: 'none',
    height: '1px',
    backgroundColor: 'currentColor',
  },

  '& img': {
    maxWidth: '100%',
  },

  '& sup': {
    fontSize: font.size.min,
  },

  '& sub': {
    fontSize: font.size.min,
  },

  '& small': {
    ...sans.smaller,
    display: 'inline-block',
  },
};

/**
 * Simple rich text styles.
 * @returns {JssObject} Basic rich text styles with standard formatting.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.simple
 * ```
 * @example
 * ```css
 * class="umd-text-rich-simple"
 * ```
 * @example
 * ```text
 * Use 'umd-text-rich-simple' instead of 'umd-text-simple'.
 * ```
 * @since 1.1.0
 */
export const simple: JssObject = create.jss.objectWithClassName({
  ...simpleBase,

  className: [
    `${classNamePrefix}-simple`,
    /** @deprecated Use 'umd-text-rich-simple' instead */
    `umd-text-simple`,
  ],
});

/**
 * Simple rich text with dark theme.
 * @returns {JssObject} Basic rich text styles with dark background theme.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.simpleDark
 * ```
 * @example
 * ```css
 * class="umd-text-rich-simple-dark"
 * ```
 * @since 1.1.0
 */
export const simpleDark: JssObject = create.jss.objectWithClassName({
  ...simpleBase,
  ...themeDarkColors,
  className: `${classNamePrefix}-simple-dark`,
});

/**
 * Large simple rich text styles.
 * @returns {JssObject} Larger font size variant of simple rich text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.simpleLarge
 * ```
 * @example
 * ```css
 * class="umd-text-rich-simple-large"
 * ```
 * @example
 * ```text
 * Use 'umd-text-rich-simple-large' instead of 'umd-text-simple-large'.
 * ```
 * @since 1.1.0
 */
export const simpleLarge: JssObject = create.jss.objectWithClassName({
  ...simpleBase,
  fontSize: font.size.lg,

  '& > *': {
    fontSize: font.size.lg,
    ...childSpacing,
  },

  className: [
    `${classNamePrefix}-simple-large`,
    /** @deprecated Use 'umd-text-rich-simple-large' instead */
    `umd-text-simple-large`,
  ],
});

/**
 * Large simple rich text with dark theme.
 * @returns {JssObject} Larger font size variant of simple rich text with dark background theme.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.simpleLargeDark
 * ```
 * @example
 * ```css
 * class="umd-text-rich-simple-large-dark"
 * ```
 * @since 1.1.0
 */
export const simpleLargeDark: JssObject = create.jss.objectWithClassName({
  ...simpleBase,
  ...themeDarkColors,
  fontSize: font.size.lg,

  '& > *': {
    fontSize: font.size.lg,
    ...childSpacing,
  },

  className: `${classNamePrefix}-simple-large-dark`,
});

/**
 * Large simple rich text styles.
 * @returns {JssObject} Larger font size variant of simple rich text.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.simpleLargest
 * ```
 * @example
 * ```css
 * class="umd-text-rich-simple-largest"
 * ```
 * @since 1.4.8
 */
export const simpleLargest: JssObject = create.jss.objectWithClassName({
  ...simpleBase,
  fontSize: font.size.lg,

  [`@media (${media.queries.desktop.min})`]: {
    ...largestTypography,
  },

  '& > *': {
    fontSize: font.size.lg,
    ...childSpacing,

    [`@media (${media.queries.desktop.min})`]: {
      ...largestTypography,
    },
  },

  className: [`${classNamePrefix}-simple-largest`],
});

/**
 * Large simple rich text with dark theme.
 * @returns {JssObject} Largest font size variant of simple rich text with dark background theme.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.simpleLargestDark
 * ```
 * @example
 * ```css
 * class="umd-text-rich-simple-largest-dark"
 * ```
 * @since 1.4.8
 */
export const simpleLargestDark: JssObject = create.jss.objectWithClassName({
  ...simpleBase,
  ...themeDarkColors,
  fontSize: font.size.lg,

  [`@media (${media.queries.desktop.min})`]: {
    ...largestTypography,
  },

  '& > *': {
    fontSize: font.size.lg,
    ...childSpacing,

    [`@media (${media.queries.desktop.min})`]: {
      ...largestTypography,
    },
  },

  className: `${classNamePrefix}-simple-largest-dark`,
});

/**
 * Container-responsive simple rich text.
 * @returns {JssObject} Simple rich text that scales font size based on container width.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.simpleScaling
 * ```
 * @example
 * ```css
 * class="umd-text-rich-simple-scaling"
 * ```
 * @since 1.1.0
 */
export const simpleScaling: JssObject = create.jss.objectWithClassName({
  ...simpleBase,
  fontSize: font.size.base,

  '& > *': {
    fontSize: font.size.base,
    ...childSpacing,
  },

  [`@container (min-width: ${scalingContainerMedium}px)`]: {
    fontSize: font.size.lg,

    '& > *': {
      fontSize: font.size.lg,
      ...childSpacing,
    },
  },

  className: `${classNamePrefix}-simple-scaling`,
});

/**
 * Container-responsive simple rich text with dark theme.
 * @returns {JssObject} Simple rich text with dark theme that scales font size based on container width.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.simpleScalingDark
 * ```
 * @example
 * ```css
 * class="umd-text-rich-simple-scaling-dark"
 * ```
 * @since 1.1.0
 */
export const simpleScalingDark: JssObject = create.jss.objectWithClassName({
  ...simpleBase,
  ...themeDarkColors,
  fontSize: font.size.base,

  '& > *': {
    fontSize: font.size.base,
    ...childSpacing,
  },

  [`@container (min-width: ${scalingContainerMedium}px)`]: {
    fontSize: font.size.lg,

    '& > *': {
      fontSize: font.size.lg,
      ...childSpacing,
    },
  },

  className: `${classNamePrefix}-simple-scaling-dark`,
});

/**
 * Advanced rich text styles with comprehensive formatting.
 * @returns {JssObject} Enhanced rich text styles with support for lists, tables, code, and quotes.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.advanced
 * ```
 * @example
 * ```css
 * class="umd-text-rich-advanced"
 * ```
 * @example
 * ```text
 * Use 'umd-text-rich-advanced' instead of 'umd-rich-text'.
 * ```
 * @since 1.1.0
 */
export const advanced: JssObject = create.jss.objectWithClassName({
  FontWeight: font.weight.normal,

  ...advancedBase,
  ...code,
  ...quote,

  [`& ul,
    & ol ul`]: {
    ...list.unordered,
  },

  [`& ol,
    & ul ol`]: {
    ...list.ordered,
  },

  '& + ol, &ol + ul': {
    marginTop: spacing.sm,
  },

  '& table': {
    ...table.inline,
  },

  className: [
    `${classNamePrefix}-advanced`,
    /** @deprecated Use 'umd-text-rich-advanced' instead */
    `umd-rich-text`,
  ],
});

/**
 * Advanced rich text styles with dark theme.
 * @returns {JssObject} Enhanced rich text with dark theme and support for lists, tables, code, and quotes.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.rich.advancedDark
 * ```
 * @example
 * ```css
 * class="umd-text-rich-advanced-dark"
 * ```
 * @example
 * ```text
 * Use 'umd-text-rich-advanced-dark' instead of 'umd-rich-text-dark'.
 * ```
 * @since 1.1.0
 */
export const advancedDark: JssObject = create.jss.objectWithClassName({
  ...advanced,
  ...themeDarkColors,

  '& table': {
    ...table.inline,
    '& tr:nth-child(even)': {
      background: 'none',
    },
  },

  className: [
    `${classNamePrefix}-advanced-dark`,
    /** @deprecated Use 'umd-text-rich-advanced-dark' instead */
    `umd-rich-text-dark`,
  ],
});
