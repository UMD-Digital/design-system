/**
 * Theme utilities for the University of Maryland Web Elements Library
 * Consolidates theme configuration, style transformation, and animation utilities
 */

import * as Styles from '@universityofmaryland/web-styles-library';
import postcss from 'postcss';

export * as animations from './animations';
export * as assets from './assets';
export * as media from './media';

const postcssNesting = require('postcss-nesting');
const postcssJs = require('postcss-js');

/**
 * Combine multiple style strings, filtering out null/undefined values
 */
export const combineStyles = (...styles: (string | null | undefined)[]) =>
  styles.filter(Boolean).join('');

/**
 * Convert a JSS object to CSS string using PostCSS
 */
export const convertJSSObjectToStyles = ({ styleObj }: { styleObj: any }) =>
  postcss([postcssNesting]).process(styleObj, {
    parser: postcssJs,
  }).css;

/**
 * Convert pixel string to number (e.g., '16px' -> 16)
 */
export const convertPixelStringToNumber = (styleStr: string) =>
  parseInt(styleStr.replace('px', ''));

/**
 * Get CSS string from a JSS object with class name
 */
export const getStyleStringFromJssObject = (styleObj: Styles.JssEntry) =>
  convertJSSObjectToStyles({
    styleObj: {
      [`.${styleObj.className}`]: styleObj,
    },
  });
