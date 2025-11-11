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
 * Options for simple rich text style variants
 * @since 1.7.0
 */
export interface SimpleRichTextOptions {
  size?: 'base' | 'large' | 'largest';
  theme?: 'light' | 'dark';
  color?: string;
  scaling?: boolean;
}

/**
 * Options for advanced rich text style variants
 * @since 1.7.0
 */
export interface AdvancedRichTextOptions {
  theme?: 'light' | 'dark';
  color?: string;
}

/**
 * Dark theme color styles for rich text.
 * @type {object}
 * @private
 */
const themeDarkColors = {
  ...animation.nestedElements.linksDark,
  color: color.white,

  '& *': {
    color: `${color.white}`,
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
 * Composable simple rich text style selector
 *
 * Creates rich text styles with configurable size, theme, color, and scaling options.
 * This function replaces the need for multiple separate exports like
 * simpleLarge, simpleDark, simpleLargeDark, etc.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Base simple text
 * const styles = composeSimple();
 *
 * // Large size with dark theme
 * const styles = composeSimple({ size: 'large', theme: 'dark' });
 *
 * // With explicit gray color
 * const styles = composeSimple({ color: token.color.gray.dark });
 *
 * // With theme-aware subdued color
 * import { theme } from '@universityofmaryland/web-utilities-library/theme';
 * const styles = composeSimple({ color: theme.subdued(isThemeDark) });
 *
 * // Largest size with scaling
 * const styles = composeSimple({ size: 'largest', scaling: true });
 * ```
 *
 * @since 1.7.0
 */
export function composeSimple(options?: SimpleRichTextOptions): JssObject {
  const { size = 'base', theme = 'light', color: explicitColor, scaling = false } = options || {};
  let composed: Record<string, any> = { ...simpleBase };

  if (size === 'large') {
    composed = {
      ...composed,
      fontSize: font.size.lg,
      '& > *': {
        ...composed['& > *'],
        fontSize: font.size.lg,
      },
    };
  } else if (size === 'largest') {
    composed = {
      ...composed,
      fontSize: font.size.lg,
      [`@media (${media.queries.desktop.min})`]: {
        ...largestTypography,
      },
      '& > *': {
        ...composed['& > *'],
        fontSize: font.size.lg,
        [`@media (${media.queries.desktop.min})`]: {
          ...largestTypography,
        },
      },
    };
  }

  if (scaling) {
    const baseFontSize = size === 'base' ? font.size.base : font.size.lg;
    const scaledFontSize = font.size.lg;

    composed = {
      ...composed,
      fontSize: baseFontSize,
      '& > *': {
        ...composed['& > *'],
        fontSize: baseFontSize,
      },
      [`@container (min-width: ${scalingContainerMedium}px)`]: {
        fontSize: scaledFontSize,
        '& > *': {
          fontSize: scaledFontSize,
          ...childSpacing,
        },
      },
    };
  }

  // Determine final color and apply appropriate styles
  const finalColor = explicitColor || (theme === 'dark' ? color.white : color.black);
  const useWhiteLinks = finalColor === color.white;

  composed = {
    ...composed,
    color: finalColor,
    '& *': {
      color: finalColor,
    },
    // Apply white link styles if color is white
    ...(useWhiteLinks ? animation.nestedElements.linksDark : {}),
  };

  // Generate appropriate className
  const classNameParts = [classNamePrefix, 'simple'];
  if (size !== 'base') classNameParts.push(size);
  if (scaling) classNameParts.push('scaling');
  if (theme === 'dark') classNameParts.push('dark');

  const className = classNameParts.join('-');

  // Deprecated aliases
  const deprecatedAliases: string[] = [];
  if (size === 'base' && !scaling && theme === 'light') {
    deprecatedAliases.push('umd-text-simple');
  }
  if (size === 'large' && !scaling && theme === 'light') {
    deprecatedAliases.push('umd-text-simple-large');
  }

  return create.jss.objectWithClassName({
    ...composed,
    className:
      deprecatedAliases.length > 0
        ? [className, ...deprecatedAliases]
        : className,
  });
}

/**
 * Composable advanced rich text style selector
 *
 * Creates advanced rich text styles with support for lists, tables, code blocks,
 * and quotes. Supports theme and color configuration.
 *
 * @param options - Configuration object for theme and color variant
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Light theme (default)
 * const styles = composeAdvanced();
 *
 * // Dark theme
 * const styles = composeAdvanced({ theme: 'dark' });
 *
 * // With explicit gray color
 * const styles = composeAdvanced({ color: token.color.gray.dark });
 *
 * // With theme-aware subdued color
 * import { theme } from '@universityofmaryland/web-utilities-library/theme';
 * const styles = composeAdvanced({ color: theme.subdued(isThemeDark) });
 * ```
 *
 * @since 1.7.0
 */
export function composeAdvanced(options?: AdvancedRichTextOptions): JssObject {
  const { theme = 'light', color: explicitColor } = options || {};

  let composed: Record<string, any> = {
    FontWeight: font.weight.normal,
    ...advancedBase,
    ...code,
    ...quote,
    [`& ul, & ol ul`]: {
      ...list.unordered,
    },
    [`& ol, & ul ol`]: {
      ...list.ordered,
    },
    '& + ol, &ol + ul': {
      marginTop: spacing.sm,
    },
    '& table': {
      ...table.inline,
    },
  };

  // Determine final color and apply appropriate styles
  const finalColor = explicitColor || (theme === 'dark' ? color.white : color.black);
  const useWhiteLinks = finalColor === color.white;

  composed = {
    ...composed,
    color: finalColor,
    '& *': {
      color: finalColor,
    },
    // Apply white link styles if color is white
    ...(useWhiteLinks ? animation.nestedElements.linksDark : {}),
    // Additional dark theme styles for tables and lists when using white color
    ...(useWhiteLinks && {
      '& table': {
        ...table.inline,
        '& tr:nth-child(even)': {
          background: 'none',
        },
      },
      [`& ul, & ol ul`]: {
        ...list.unordered,
        '& *, & * > *': {
          color: color.white,
        },
      },
      [`& ol, & ul ol`]: {
        ...list.ordered,
        '& *, & * > *': {
          color: color.white,
        },
      },
    }),
  };

  // Generate className
  const className =
    theme === 'dark'
      ? `${classNamePrefix}-advanced-dark`
      : `${classNamePrefix}-advanced`;

  // Add deprecated aliases
  const deprecatedAliases =
    theme === 'dark' ? ['umd-rich-text-dark'] : ['umd-rich-text'];

  return create.jss.objectWithClassName({
    ...composed,
    className: [className, ...deprecatedAliases],
  });
}

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
export const simple: JssObject = composeSimple();

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
export const simpleDark: JssObject = composeSimple({ theme: 'dark' });

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
export const simpleLarge: JssObject = composeSimple({ size: 'large' });

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
export const simpleLargeDark: JssObject = composeSimple({
  size: 'large',
  theme: 'dark',
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
export const simpleLargest: JssObject = composeSimple({ size: 'largest' });

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
export const simpleLargestDark: JssObject = composeSimple({
  size: 'largest',
  theme: 'dark',
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
export const simpleScaling: JssObject = composeSimple({ scaling: true });

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
export const simpleScalingDark: JssObject = composeSimple({
  scaling: true,
  theme: 'dark',
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
export const advanced: JssObject = composeAdvanced();

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
export const advancedDark: JssObject = composeAdvanced({ theme: 'dark' });
