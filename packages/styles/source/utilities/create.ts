/**
 * @module utilities/create
 * Provides utilities for creating JSS objects.
 */

import postcss from 'postcss';
import { convertToCSS } from './transform/jss';
import { JssEntry } from '../_types';

/**
 * Creates a JSS object with type checking.
 * @template T Type extending JssEntry
 * @param {T} style The style object
 * @returns {T} The JSS object with the same type
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.create.jssObject({ color: 'red', className: 'my-class' })
 * ```
 * @since 1.1.0
 */
export const jssObject = <T extends JssEntry>(style: T): T => style;

/**
 * Creates a JSS object from a CSS string.
 * @param {string} cssString The CSS string to convert
 * @returns {Record<string, any>} The JSS object with converted properties
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.create.jssObjectFromString('color: red; font-size: 16px;')
 * ```
 * @since 1.1.0
 */
export const jssObjectFromString = (cssString: string): Record<string, any> => {
  if (!cssString || typeof cssString !== 'string') {
    return {};
  }

  return cssString
    .split(';')
    .filter((style) => style.trim())
    .reduce((acc, declaration) => {
      const [property, value] = declaration.split(':').map((str) => str.trim());

      if (!property || !value) {
        return acc;
      }

      const camelProperty = property.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase(),
      );

      const processedValue = value.match(/^\d+$/)
        ? parseInt(value, 10)
        : value.match(/^\d*\.\d+$/)
        ? parseFloat(value)
        : value;

      return {
        ...acc,
        [camelProperty]: processedValue,
      };
    }, {});
};

/**
 * Creates a stylesheet string from a JSS object.
 * @param {Object} stylesObject Object of CSS properties
 * @param {Object} options Configuration options
 * @param {boolean} options.prettify Whether to format the CSS with line breaks and indentation (default: false)
 * @returns {string} The stylesheet string with converted properties
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * await Styles.utilities.create.styleSheetString({
 *   ...Styles.element,
 *   ...Styles.layout.grid,
 * })
 * ```
 * @since 1.2.0
 */
export const styleSheetString = async (
  stylesObject: Record<string, any>,
  options: { prettify?: boolean } = {},
) => {
  const cssString = Object.entries(stylesObject)
    .map(([selector, properties]) => {
      if (typeof properties !== 'object' || properties === null) {
        return '';
      }

      const className = selector.startsWith('.')
        ? selector.substring(1)
        : selector;
      const jssObject = {
        className,
        ...(properties as Record<string, unknown>),
      };

      return convertToCSS(jssObject);
    })
    .filter(Boolean)
    .join('\n\n');

  if (options.prettify) {
    return cssString;
  } else {
    const result = await postcss().process(cssString, { from: undefined });

    return result.css
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
      .trim();
  }
};
