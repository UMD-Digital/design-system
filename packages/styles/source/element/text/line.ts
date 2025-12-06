/**
 * @module element/text/line
 * Provides styles for text with line decorations like underlines, dividers, and borders.
 */

import { color, spacing, media } from '@universityofmaryland/web-token-library';
import { elements } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-line';

/**
 * Options for trailing line style variants
 * @since 1.7.0
 */
export interface TrailingOptions {
  theme?: 'default' | 'light' | 'dark';
}

/**
 * Options for adjacent line style variants
 * @since 1.7.0
 */
export interface AdjacentOptions {
  inset?: boolean;
}

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
 * Composable trailing line text style selector
 *
 * Creates trailing line styles with configurable theme options.
 * Trailing lines extend horizontally from the text to the right edge.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Default white background
 * const styles = composeTrailing();
 *
 * // Light background
 * const styles = composeTrailing({ theme: 'light' });
 *
 * // Dark background
 * const styles = composeTrailing({ theme: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composeTrailing(options?: TrailingOptions): JssObject {
  const { theme = 'default' } = options || {};

  let composed: Record<string, any> = {
    ...elements.labelSmall,
    textTransform: 'uppercase',
    position: 'relative',
    overflow: 'hidden',

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
  };

  // Apply theme-specific styles
  if (theme === 'default') {
    composed = {
      ...composed,
      backgroundColor: `${color.white}`,
    };
  } else if (theme === 'light') {
    composed = {
      ...composed,
      backgroundColor: `${color.gray.lighter}`,
    };
  } else if (theme === 'dark') {
    composed = {
      ...composed,
      backgroundColor: `${color.gray.darker}`,
      color: `${color.white}`,

      '&::before': {
        ...trailingBefore,
        background: `${color.white}`,
      },
    };
  }

  // Generate appropriate className
  let className = `${classNamePrefix}-trailing`;
  const deprecatedAliases: string[] = [];

  if (theme === 'light') {
    className = `${classNamePrefix}-trailing-light`;
    deprecatedAliases.push('umd-tailwing-right-headline[theme="light"]');
  } else if (theme === 'dark') {
    className = `${classNamePrefix}-trailing-dark`;
    deprecatedAliases.push('umd-tailwing-right-headline[theme="dark"]');
  } else {
    deprecatedAliases.push('umd-tailwing-right-headline');
  }

  return create.jss.objectWithClassName({
    ...composed,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * Composable adjacent line decoration style selector
 *
 * Creates vertical line decoration styles with optional inset padding.
 * Adjacent lines appear as vertical red bars to the left of text.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Adjacent line without inset
 * const styles = composeAdjacent();
 *
 * // Adjacent line with inset padding
 * const styles = composeAdjacent({ inset: true });
 * ```
 *
 * @since 1.7.0
 */
export function composeAdjacent(options?: AdjacentOptions): JssObject {
  const { inset = false } = options || {};

  let composed: Record<string, any> = {
    position: 'relative',

    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      width: '2px',
      height: '100%',
      backgroundColor: color.red,
    },
  };

  if (inset) {
    composed = {
      ...composed,
      paddingLeft: `${spacing.md}`,
      '&::before': {
        ...composed['&::before'],
        left: 0,
      },
    };
  } else {
    composed = {
      ...composed,
      '&::before': {
        ...composed['&::before'],
        left: `-${spacing.md}`,
      },
    };
  }

  // Generate appropriate className
  const className = inset
    ? `${classNamePrefix}-adjustent-inset`
    : `${classNamePrefix}-adjustent`;

  const deprecatedAliases = inset ? [] : ['umd-adjacent-line-text'];

  return create.jss.objectWithClassName({
    ...composed,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * Tailwing text with centered line decoration.
 * @returns {JssObject} Styles for text with horizontal centered line.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.tailwing
 * ```
 * @example
 * ```css
 * class="umd-text-line-tailwing"
 * ```
 * @example
 * ```text
 * Use 'umd-text-line-tailwing' instead of 'umd-tailwings-headline'.
 * ```
 * @since 1.1.0
 */
export const tailwing: JssObject = create.jss.objectWithClassName({
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
 * Trailing line text style.
 * @returns {JssObject} Styles for text with trailing horizontal line.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.trailing
 * ```
 * @example
 * ```css
 * class="umd-text-line-trailing"
 * ```
 * @example
 * ```text
 * Use 'umd-text-line-trailing' instead of 'umd-tailwing-right-headline'.
 * ```
 * @since 1.1.0
 */
export const trailing: JssObject = composeTrailing();

/**
 * Light-themed trailing line text style.
 * @returns {JssObject} Styles for text with trailing horizontal line on light background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.trailingLight
 * ```
 * @example
 * ```css
 * class="umd-text-line-trailing-light"
 * ```
 * @example
 * ```text
 * Use 'umd-text-line-trailing-light' instead of 'umd-tailwing-right-headline[theme="light"]'.
 * ```
 * @since 1.1.0
 */
export const trailingLight: JssObject = composeTrailing({ theme: 'light' });

/**
 * Dark-themed trailing line text style.
 * @returns {JssObject} Styles for text with trailing horizontal line on dark background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.trailingDark
 * ```
 * @example
 * ```css
 * class="umd-text-line-trailing-dark"
 * ```
 * @example
 * ```text
 * Use 'umd-text-line-trailing-dark' instead of 'umd-tailwing-right-headline[theme="dark"]'.
 * ```
 * @since 1.1.0
 */
export const trailingDark: JssObject = composeTrailing({ theme: 'dark' });

/**
 * Adjacent vertical line decoration style.
 * @returns {JssObject} Styles for text with vertical red line decoration on the left.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.adjustent
 * ```
 * @example
 * ```css
 * class="umd-text-line-adjustent"
 * ```
 * @example
 * ```text
 * Use 'umd-text-line-adjustent' instead of 'umd-adjacent-line-text'.
 * ```
 * @since 1.1.0
 */
export const adjustent: JssObject = composeAdjacent();

/**
 * Inset vertical line decoration style.
 * @returns {JssObject} Styles for text with inset vertical red line and left padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.line.adjustentInset
 * ```
 * @example
 * ```css
 * class="umd-text-line-adjustent-inset"
 * ```
 * @since 1.1.0
 */
export const adjustentInset: JssObject = composeAdjacent({ inset: true });
