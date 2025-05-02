/**
 * @module utilities/create
 * Provides utilities for creating JSS objects.
 */

import { JssEntry } from '../../_types';

/**
 * Creates a JSS object with type checking.
 * @template T Type extending JssEntry
 * @param {T} style The style object
 * @returns {T} The JSS object with the same type
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.create.jss.objectWithClassName({ color: 'red', className: 'my-class' })
 * ```
 * @since 1.1.0
 */
export const objectWithClassName = <T extends JssEntry>(style: T): T => style;

/**
 * Creates a JSS object from a CSS string.
 * @param {string} cssString The CSS string to convert
 * @returns {Record<string, any>} The JSS object with converted properties
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.create.jss.objectFromString('color: red; font-size: 16px;')
 * ```
 * @since 1.1.0
 */
export const objectFromString = (cssString: string): Record<string, any> => {
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
