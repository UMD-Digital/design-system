/**
 * @module typography/font-face
 * Provides font face definitions and utilities for the design system.
 * @since 1.0.0
 */

import { boldItalic } from './barlow-condensed';
import { light, regular } from './crimson-pro';
import * as interstateNamespace from './interstate';
import { convertFontToCss } from '../../utilities/transform/jss';

/**
 * Barlow Condensed font variations.
 * @since 1.0.0
 */
export const barlow = {
  boldItalic,
};

/**
 * Crimson Pro font variations.
 * @since 1.0.0
 */
export const crimson = {
  light,
  regular,
};

/**
 * Interstate font variations.
 * @since 1.0.0
 */
export const interstate = {
  ...interstateNamespace,
};

/**
 * Combined typography font face object for use in JSS.
 * Contains all font definitions grouped by font-face rule.
 * @since 1.3.1
 */
export const typographyFontFaceObject = {
  '@font-face': {
    ...barlow,
    ...crimson,
    ...interstate,
  },
};

/**
 * Combined collection of all font families and their variations.
 * @since 1.3.1
 */
export const families = { barlow, crimson, interstate };

/**
 * Generates CSS @font-face rules for all font families.
 * Converts all font definitions to proper CSS strings.
 *
 * @example
 * ```css
 * // Generated CSS:
 * @font-face {
 *   font-family: "Barlow Condensed";
 *   src: url(data:font/ttf;base64,AAEAAA...);
 *   font-weight: 700;
 *   font-style: italic;
 * }
 *
 * @font-face {
 *   font-family: "Crimson Pro";
 *   src: url(data:font/ttf;base64,AAEAAA...);
 *   font-weight: 300;
 *   font-style: normal;
 * }
 * // ... other font definitions
 * ```
 * @since 1.3.1
 */
export const base64fonts = Object.entries(families).reduce(
  (outerAcc, [key, value]) => {
    const innerResult = Object.entries(value).reduce(
      (innerAcc, [fontKey, fontValue]) => {
        return innerAcc + convertFontToCss(fontValue) + '\n';
      },
      '',
    );

    return outerAcc + innerResult;
  },
  '',
);
