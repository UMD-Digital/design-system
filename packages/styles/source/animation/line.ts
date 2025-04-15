/**
 * @module animation/line
 * Provides styles for animation with visual lines.
 */

import { color } from '../token';
import { create } from '../utilities';
import type { JssObject } from '../_types';

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

const createSolidGradient = (color: string) =>
  `linear-gradient(${color}, ${color})`;

const createTwoColorGradient = (color1: string, color2: string) =>
  `linear-gradient(to left, ${color1} 50%, ${color2} 50% 100%)`;

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

const slideUnder = {
  base: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
  },
  black: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(color.black),
  },
  grayDarkRed: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundPosition: 'left bottom',
      backgroundSize: '200% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderTwoColorStyle(
      color.gray.dark,
      color.red,
    ),
  },
  grayRed: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundPosition: 'left bottom',
      backgroundSize: '200% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderTwoColorStyle(
      color.gray.light,
      color.red,
    ),
  },
  gold: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(color.gold),
  },
  red: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(color.red),
  },
  white: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(color.white),
  },
};

const fadeUnder = {
  base: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
  },
  dark: {
    ...baseStyles.link,
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
  },
  light: {
    ...baseStyles.link,
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
  },
  yellow: {
    ...baseStyles.link,
    backgroundImage: createSolidGradient('currentColor'),
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: 'currentColor',
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover, &:focus`]: {
      backgroundImage: createSolidGradient(color.red),
      backgroundPosition: 'left calc(100%)',
      color: color.black,
      textDecoration: 'none',
    },
  },
};

// Consistent naming
const classNamePrefix = 'umd-animation-line';

/**
 * Color Red.
 * @returns {JssObject} Slide under animation line with red color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.slideUnderRed
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-red"
 * ```
 * @deprecated Use 'umd-animation-line-slide-red' instead of 'umd-slidein-underline-red'.
 * @since 1.8.0
 */

export const slideUnderRed: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-slide-red`,
    /** @deprecated Use 'umd-animation-line-slide-red' instead */
    'umd-slidein-underline-red',
  ],
  ...slideUnder.red,
});

/**
 * Color Black.
 * @returns {JssObject} Slide under animation line with black color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.slideUnderBlack
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-black"
 * ```
 * @deprecated Use 'umd-animation-line-slide-black' instead of 'umd-slidein-underline-black'.
 * @since 1.8.0
 */

export const slideUnderBlack: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-slide-black`,
    /** @deprecated Use 'umd-animation-line-slide-black' instead */
    'umd-slidein-underline-black',
  ],
  ...slideUnder.black,
});

/**
 * Color White.
 * @returns {JssObject} Slide under animation line with white color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.slideUnderWhite
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-white"
 * ```
 * @deprecated Use 'umd-animation-line-slide-white' instead of 'umd-slidein-underline-white'.
 * @since 1.8.0
 */

export const slideUnderWhite: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-slide-white`,
    /** @deprecated Use 'umd-animation-line-slide-white' instead */
    'umd-slidein-underline-white',
  ],
  ...slideUnder.white,
});

/**
 * Color Gold.
 * @returns {JssObject} Slide under animation line with gold color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.slideUnderGold
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-gold"
 * ```
 * @deprecated Use 'umd-animation-line-slide-gold' instead of 'umd-slidein-underline-gold'.
 * @since 1.8.0
 */

export const slideUnderGold: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-slide-gold`,
    /** @deprecated Use 'umd-animation-line-slide-gold' instead */
    'umd-slidein-underline-gold',
  ],
  ...slideUnder.gold,
});

/**
 * Color change from gray to red.
 * @returns {JssObject} Slide under animation line with change from gray to red.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.slideUnderGrayRed
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-gray-red"
 * ```
 * @deprecated Use 'umd-animation-line-slide-gray-red' instead of 'umd-slidein-underline-gray-red'.
 * @since 1.8.0
 */

export const slideUnderGrayRed: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-slide-gray-red`,
    /** @deprecated Use 'umd-animation-line-slide-gray-red' instead */
    'umd-slidein-underline-gray-red',
  ],
  ...slideUnder.grayRed,
});

/**
 * Color change from gray dark to red.
 * @returns {JssObject} Slide under animation line with change from gray dark to red.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.slideUnderGrayDarkRed
 * ```
 * @example
 * ```css
 * class="umd-animation-line-slide-graydark-red"
 * ```
 * @deprecated Use 'umd-animation-line-slide-graydark-red' instead of 'umd-slidein-underline-graydark-red'.
 * @since 1.8.0
 */

export const slideUnderGrayDarkRed: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-slide-graydark-red`,
    /** @deprecated Use 'umd-animation-line-slide-graydark-red' instead */
    'umd-slidein-underline-graydark-red',
  ],
  ...slideUnder.grayDarkRed,
});

/**
 * Color Red.
 * @returns {JssObject} Fade under animation line with change from red color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.fadeUnderRed
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-red"
 * ```
 * @deprecated Use 'umd-animation-line-fade-red' instead of 'umd-fadein-underline-red'.
 * @since 1.8.0
 */

export const fadeUnderRed: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-fade-red`,
    /** @deprecated Use 'umd-animation-line-fade-red' instead */
    'umd-fadein-underline-red',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(color.red),
  },
});

/**
 * Color Gray.
 * @returns {JssObject} Fade under animation line with change from gray color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.fadeUnderGray
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-gray"
 * ```
 * @deprecated Use 'umd-animation-line-fade-gray' instead of 'umd-fadein-underline-gray'.
 * @since 1.8.0
 */

export const fadeUnderGray: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-fade-gray`,
    /** @deprecated Use 'umd-animation-line-fade-gray' instead */
    'umd-fadein-underline-gray',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(color.gray.mediumAA),
  },
});

/**
 * Color Gold.
 * @returns {JssObject} Fade under animation line with change from gold color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.fadeUnderGold
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-gold"
 * ```
 * @deprecated Use 'umd-animation-line-fade-gold' instead of 'umd-fadein-underline-gold'.
 * @since 1.8.0
 */

export const fadeUnderGold: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-fade-gold`,
    /** @deprecated Use 'umd-animation-line-fade-gold' instead */
    'umd-fadein-underline-gold',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(color.gold),
  },
});

/**
 * Color Black.
 * @returns {JssObject} Fade under animation line with change from black color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.fadeUnderBlack
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-black"
 * ```
 * @deprecated Use 'umd-animation-line-fade-black' instead of 'umd-fadein-underline-black'.
 * @since 1.8.0
 */

export const fadeUnderBlack: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-fade-black`,
    /** @deprecated Use 'umd-animation-line-fade-black' instead */
    'umd-fadein-underline-black',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(color.black),
  },
});

/**
 * Color White.
 * @returns {JssObject} Fade under animation line with change from white color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.fadeUnderWhite
 * ```
 * @example
 * ```css
 * class="umd-animation-line-fade-white"
 * ```
 * @deprecated Use 'umd-animation-line-fade-white' instead of 'umd-fadein-underline-white'.
 * @since 1.8.0
 */

export const fadeUnderWhite: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-fade-white`,
    /** @deprecated Use 'umd-animation-line-fade-white' instead */
    'umd-fadein-underline-white',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(color.white),
  },
});

/**
 * Fade in dark
 * @returns {JssObject} Fade in animation line with dark color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.fadeInSimpleDark
 * ```
 * @example
 * ```css
 * class="umd-fadein-simple-dark"
 * ```
 * @since 1.8.0
 */

export const fadeInSimpleDark: JssObject = create.jssObject({
  className: 'umd-fadein-simple-dark',
  ...fadeUnder.dark,
});

/**
 * Fade in light
 * @returns {JssObject} Fade in animation line with light color
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.fadeInSimpleLight
 * ```
 * @example
 * ```css
 * class="umd-fadein-simple-light"
 * ```
 * @since 1.8.0
 */

export const fadeInSimpleLight: JssObject = create.jssObject({
  className: 'umd-fadein-simple-light',
  ...fadeUnder.light,
});
