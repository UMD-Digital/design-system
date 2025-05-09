/**
 * @module utilities/create
 * Provides utilities for creating JSS objects.
 */

import postcss from 'postcss';
import {
  convertToSelectorCSS,
  convertToClassSelectorCss,
} from '../transform/jss';
import { removeDuplicates } from '../transform/css';

/**
 * Creates a stylesheet string from a JSS object.
 * @param {Object} stylesObject Object of CSS properties
 * @param {Object} options Configuration options
 * @param {boolean} options.prettify Whether to format the CSS with line breaks and indentation (default: false)
 * @returns {string} The stylesheet string with converted properties
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * await Styles.utilities.create.style.toString({
 *   ...Styles.element,
 *   ...Styles.layout.grid,
 * })
 * ```
 * @since 1.2.0
 */
export const toString = async (
  stylesObject: Record<string, any>,
  options: { prettify?: boolean } = {},
) => {
  const cssString = Object.entries(stylesObject)
    .map(([selector, properties]) => {
      if (typeof properties !== 'object' || properties === null) {
        return '';
      }

      const isClassSelector = selector.startsWith('.');

      if (isClassSelector) {
        const jssObject = {
          className: selector.substring(1),
          ...(properties as Record<string, unknown>),
        };
        return convertToClassSelectorCss(jssObject);
      } else {
        return convertToSelectorCSS(
          properties as Record<string, unknown>,
          selector,
        );
      }
    })
    .filter(Boolean)
    .join('\n\n');

  if (options.prettify) {
    return cssString;
  } else {
    const result = await postcss().process(cssString, { from: undefined });

    return removeDuplicates(
      result.css
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*:\s*/g, ':')
        .replace(/,\s+/g, ',')
        .replace(/\s+\(/g, '(')
        .replace(/\(\s+/g, '(')
        .replace(/\s+\)/g, ')')
        .replace(/\)\s+/g, ')')
        .replace(/[\r\n]+/g, '')
        .trim(),
    );
  }
};
