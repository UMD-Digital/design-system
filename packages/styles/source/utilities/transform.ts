/**
 * @module utilities/transform
 * Provides utilities for transforming JSS objects.
 */

import type { JssInputFormat, JssNamedOutputFormat } from '../_types';

/**
 * Interface for a JSS name converter function.
 */
interface JssNameConverter {
  (originalObject: JssInputFormat): JssNamedOutputFormat;
}

/**
 * Converts JSS objects to a format with class names as keys.
 * @param {JssInputFormat} originalObject The original JSS object
 * @returns {JssNamedOutputFormat} The transformed JSS object with class names as keys
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.objectWithName({
 *   key: { className: 'my-class', color: 'red' }
 * })
 * ```
 * @since 1.8.0
 */
export const objectWithName: JssNameConverter = (originalObject) => {
  const newFormat: JssNamedOutputFormat = {};

  for (const [key, value] of Object.entries(originalObject)) {
    const { className, ...rest } = value;

    if (Array.isArray(className)) {
      className.forEach((name) => {
        const typographyKey = `.${name}`;
        newFormat[typographyKey] = { ...rest };
      });
    } else {
      const typographyKey = `.${className}`;
      newFormat[typographyKey] = { ...rest };
    }
  }

  return newFormat;
};

/**
 * Processes nested JSS objects and flattens them.
 * @template T Type extending object
 * @param {T} obj The object to process
 * @returns {JssNamedOutputFormat} The processed JSS object
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.processNestedObjects({
 *   component: { className: 'my-component', color: 'blue' }
 * })
 * ```
 * @since 1.8.0
 */
export const processNestedObjects = <T extends object>(
  obj: T,
): JssNamedOutputFormat => {
  const result: JssNamedOutputFormat = {};

  const process = (value: any) => {
    if (!value || typeof value !== 'object') return;

    if ('className' in value) {
      const transformed = objectWithName({ key: value });
      Object.assign(result, transformed);
    } else {
      Object.values(value).forEach(process);
    }
  };

  process(obj);
  return result;
};
