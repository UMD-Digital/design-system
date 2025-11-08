/**
 * @module animation/line
 * Provides styles for animation with visual lines.
 */

import { color } from '../token';
import { create } from '../utilities';
import type { JssObject } from '../_types';

// Consistent naming
const classNamePrefix = 'umd-animation-line';

/**
 * Options for slide under line animation
 * @since 1.7.0
 */
export interface SlideUnderOptions {
  color?: 'red' | 'black' | 'white' | 'gold' | 'gray-red' | 'graydark-red';
}

/**
 * Options for fade under line animation
 * @since 1.7.0
 */
export interface FadeUnderOptions {
  color?: 'red' | 'gray' | 'gold' | 'black' | 'white';
}

/**
 * Options for fade in simple line animation
 * @since 1.7.0
 */
export interface FadeInSimpleOptions {
  theme?: 'light' | 'dark';
}

// Base styles shared across animations
const baseStyles = {
  span: {
    display: 'inline',
    position: 'relative',
    backgroundPosition: 'left bottom',
    backgroundRepeat: 'no-repeat',
    transition: 'background 0.5s',
  },
  link: {
    position: 'relative',
    textDecoration: 'none',
  },
};

// Helper functions for gradient creation
const createSolidGradient = (color: string) =>
  `linear-gradient(${color}, ${color})`;

const createTwoColorGradient = (color1: string, color2: string) =>
  `linear-gradient(to left, ${color1} 50%, ${color2} 50% 100%)`;

// Style generators for different animation types
const getSlideUnderStyle = (color: string) => ({
  ...baseStyles.span,
  backgroundSize: '0 2px',
  backgroundImage: createSolidGradient(color),
});

const getSlideUnderTwoColorStyle = (baseColor: string, hoverColor: string) => ({
  ...baseStyles.span,
  backgroundImage: createTwoColorGradient(baseColor, hoverColor),
  backgroundPosition: 'right bottom',
  backgroundSize: '200% 2px',
});

const getFadeUnderStyle = (color: string) => ({
  ...baseStyles.span,
  backgroundSize: '100% 0',
  backgroundImage: createSolidGradient(color),
});

// Color mapping for cleaner lookups
const slideColorMap = {
  red: color.red,
  black: color.black,
  white: color.white,
  gold: color.gold,
};

const fadeColorMap = {
  red: color.red,
  gray: color.gray.mediumAA,
  gold: color.gold,
  black: color.black,
  white: color.white,
};

/**
 * Composable slide under line animation style selector
 *
 * Creates slide under line animation styles with configurable color options.
 * This function replaces the need for multiple separate exports like
 * slideUnderRed, slideUnderBlack, etc.
 *
 * @param options - Configuration object for color variant
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Red slide under (default)
 * const styles = composeSlideUnder();
 *
 * // Gold slide under
 * const styles = composeSlideUnder({ color: 'gold' });
 *
 * // Two-color gradient slide
 * const styles = composeSlideUnder({ color: 'gray-red' });
 * ```
 *
 * @since 1.7.0
 */
export function composeSlideUnder(options?: SlideUnderOptions): JssObject {
  const { color: colorOption = 'red' } = options || {};

  let composed: Record<string, any> = {
    ...baseStyles.link,
  };

  // Handle two-color gradient variants
  if (colorOption === 'gray-red') {
    composed = {
      ...composed,
      [`&:hover > *:not(svg):not(.sr-only),
        &:focus > *:not(svg):not(.sr-only)`]: {
        backgroundPosition: 'left bottom',
        backgroundSize: '200% 2px',
      },
      '& > *:not(svg):not(.sr-only)': getSlideUnderTwoColorStyle(
        color.gray.light,
        color.red,
      ),
    };
  } else if (colorOption === 'graydark-red') {
    composed = {
      ...composed,
      [`&:hover > *:not(svg):not(.sr-only),
        &:focus > *:not(svg):not(.sr-only)`]: {
        backgroundPosition: 'left bottom',
        backgroundSize: '200% 2px',
      },
      '& > *:not(svg):not(.sr-only)': getSlideUnderTwoColorStyle(
        color.gray.dark,
        color.red,
      ),
    };
  } else {
    // Single color variants
    const colorValue = slideColorMap[colorOption as keyof typeof slideColorMap];
    composed = {
      ...composed,
      [`&:hover > *:not(svg):not(.sr-only),
        &:focus > *:not(svg):not(.sr-only)`]: {
        backgroundSize: '100% 2px',
      },
      '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(colorValue),
    };
  }

  // Generate className
  const className = `${classNamePrefix}-slide-${colorOption}`;

  // Deprecated aliases
  const deprecatedAliases: string[] = [];
  if (colorOption === 'red') {
    deprecatedAliases.push('umd-slidein-underline-red');
  } else if (colorOption === 'black') {
    deprecatedAliases.push('umd-slidein-underline-black');
  } else if (colorOption === 'white') {
    deprecatedAliases.push('umd-slidein-underline-white');
  } else if (colorOption === 'gold') {
    deprecatedAliases.push('umd-slidein-underline-gold');
  } else if (colorOption === 'gray-red') {
    deprecatedAliases.push('umd-slidein-underline-gray-red');
  } else if (colorOption === 'graydark-red') {
    deprecatedAliases.push('umd-slidein-underline-graydark-red');
  }

  return create.jss.objectWithClassName({
    ...composed,
    className:
      deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * Composable fade under line animation style selector
 *
 * Creates fade under line animation styles with configurable color options.
 * This function replaces the need for multiple separate exports like
 * fadeUnderRed, fadeUnderGray, etc.
 *
 * @param options - Configuration object for color variant
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Red fade under (default)
 * const styles = composeFadeUnder();
 *
 * // Gray fade under
 * const styles = composeFadeUnder({ color: 'gray' });
 *
 * // Gold fade under
 * const styles = composeFadeUnder({ color: 'gold' });
 * ```
 *
 * @since 1.7.0
 */
export function composeFadeUnder(options?: FadeUnderOptions): JssObject {
  const { color: colorOption = 'red' } = options || {};

  const colorValue = fadeColorMap[colorOption as keyof typeof fadeColorMap];

  const composed: Record<string, any> = {
    ...baseStyles.link,
    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(colorValue),
  };

  // Generate className
  const className = `${classNamePrefix}-fade-${colorOption}`;

  // Deprecated aliases
  const deprecatedAliases: string[] = [];
  if (colorOption === 'red') {
    deprecatedAliases.push('umd-fadein-underline-red');
  } else if (colorOption === 'gray') {
    deprecatedAliases.push('umd-fadein-underline-gray');
  } else if (colorOption === 'gold') {
    deprecatedAliases.push('umd-fadein-underline-gold');
  } else if (colorOption === 'black') {
    deprecatedAliases.push('umd-fadein-underline-black');
  } else if (colorOption === 'white') {
    deprecatedAliases.push('umd-fadein-underline-white');
  }

  return create.jss.objectWithClassName({
    ...composed,
    className:
      deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * Composable fade in simple line animation style selector
 *
 * Creates fade in simple line animation styles with configurable theme options.
 * This function replaces the need for multiple separate exports like
 * fadeInSimpleLight, fadeInSimpleDark.
 *
 * @param options - Configuration object for theme variant
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Light theme (default)
 * const styles = composeFadeInSimple();
 *
 * // Dark theme
 * const styles = composeFadeInSimple({ theme: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composeFadeInSimple(options?: FadeInSimpleOptions): JssObject {
  const { theme = 'light' } = options || {};

  let composed: Record<string, any> = {
    ...baseStyles.link,
  };

  if (theme === 'dark') {
    composed = {
      ...composed,
      backgroundImage: createSolidGradient(color.white),
      backgroundPosition: 'left calc(100% - 1px)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 1px',
      color: color.white,
      transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

      [`&:hover, &:focus`]: {
        backgroundImage: createSolidGradient(color.gold),
        backgroundPosition: 'left calc(100%)',
        color: color.white,
        textDecoration: 'none',
      },
    };
  } else {
    composed = {
      ...composed,
      backgroundImage: createSolidGradient('currentColor'),
      backgroundPosition: 'left calc(100% - 1px)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 1px',
      color: 'currentColor',
      transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

      [`&:hover, &:focus`]: {
        backgroundImage: createSolidGradient(color.red),
        backgroundPosition: 'left calc(100%)',
        color: color.red,
        textDecoration: 'none',
      },
    };
  }

  // Generate className
  const className = `umd-fadein-simple-${theme}`;

  return create.jss.objectWithClassName({
    ...composed,
    className,
  });
}

/**
 * Slide under animation line with red color.
 * @returns {JssObject} Slide under animation line with red color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.slideUnderRed
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-red"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-slide-red' instead of 'umd-slidein-underline-red'.
 * ```
 * @since 1.1.0
 */
export const slideUnderRed: JssObject = composeSlideUnder({ color: 'red' });

/**
 * Slide under animation line with black color.
 * @returns {JssObject} Slide under animation line with black color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.slideUnderBlack
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-black"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-slide-black' instead of 'umd-slidein-underline-black'.
 * ```
 * @since 1.1.0
 */
export const slideUnderBlack: JssObject = composeSlideUnder({ color: 'black' });

/**
 * Slide under animation line with white color.
 * @returns {JssObject} Slide under animation line with white color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.slideUnderWhite
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-white"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-slide-white' instead of 'umd-slidein-underline-white'
 * ```
 * @since 1.1.0
 */
export const slideUnderWhite: JssObject = composeSlideUnder({ color: 'white' });

/**
 * Slide under animation line with gold color.
 * @returns {JssObject} Slide under animation line with gold color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.slideUnderGold
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-gold"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-slide-gold' instead of 'umd-slidein-underline-gold'.
 * ```
 * @since 1.1.0
 */
export const slideUnderGold: JssObject = composeSlideUnder({ color: 'gold' });

/**
 * Slide under animation line with color change from gray to red.
 * @returns {JssObject} Slide under animation line with change from gray to red.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.slideUnderGrayRed
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-gray-red"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-slide-gray-red' instead of 'umd-slidein-underline-gray-red'.
 * ```
 * @since 1.1.0
 */
export const slideUnderGrayRed: JssObject = composeSlideUnder({ color: 'gray-red' });

/**
 * Slide under animation line with color change from gray dark to red.
 * @returns {JssObject} Slide under animation line with change from gray dark to red.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.slideUnderGrayDarkRed
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-graydark-red"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-slide-graydark-red' instead of 'umd-slidein-underline-graydark-red'.
 * ```
 * @since 1.1.0
 */
export const slideUnderGrayDarkRed: JssObject = composeSlideUnder({ color: 'graydark-red' });

/**
 * Fade under animation line with red color.
 * @returns {JssObject} Fade under animation line with red color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.fadeUnderRed
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-red"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-fade-red' instead of 'umd-fadein-underline-red'.
 * ```
 * @since 1.1.0
 */
export const fadeUnderRed: JssObject = composeFadeUnder({ color: 'red' });

/**
 * Fade under animation line with gray color.
 * @returns {JssObject} Fade under animation line with gray color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.fadeUnderGray
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-gray"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-fade-gray' instead of 'umd-fadein-underline-gray'.
 * ```
 * @since 1.1.0
 */
export const fadeUnderGray: JssObject = composeFadeUnder({ color: 'gray' });

/**
 * Fade under animation line with gold color.
 * @returns {JssObject} Fade under animation line with gold color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.fadeUnderGold
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-gold"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-fade-gold' instead of 'umd-fadein-underline-gold'.
 * ```
 * @since 1.1.0
 */
export const fadeUnderGold: JssObject = composeFadeUnder({ color: 'gold' });

/**
 * Fade under animation line with black color.
 * @returns {JssObject} Fade under animation line with black color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.fadeUnderBlack
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-black"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-fade-black' instead of 'umd-fadein-underline-black'.
 * ```
 * @since 1.1.0
 */
export const fadeUnderBlack: JssObject = composeFadeUnder({ color: 'black' });

/**
 * Fade under animation line with white color.
 * @returns {JssObject} Fade under animation line with white color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.fadeUnderWhite
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-white"
 * ```
 * @example
 * ```text
 * Use 'umd-animation-line-fade-white' instead of 'umd-fadein-underline-white'.
 * ```
 * @since 1.1.0
 */
export const fadeUnderWhite: JssObject = composeFadeUnder({ color: 'white' });

/**
 * Fade in animation line with dark theme.
 * @returns {JssObject} Fade in animation line with dark color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.fadeInSimpleDark
 * ```
 * @example
 * ```css
 * class="umd-fadein-simple-dark"
 * ```
 * @since 1.1.0
 */
export const fadeInSimpleDark: JssObject = composeFadeInSimple({ theme: 'dark' });

/**
 * Fade in animation line with light theme.
 * @returns {JssObject} Fade in animation line with light color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.line.fadeInSimpleLight
 * ```
 * @example
 * ```css
 * class="umd-fadein-simple-light"
 * ```
 * @since 1.1.0
 */
export const fadeInSimpleLight: JssObject = composeFadeInSimple({ theme: 'light' });
