/**
 * @module utilities/transform
 * Provides utilities for transforming JSS objects.
 */

import type {
  JssInputFormat,
  JssNamedOutputFormat,
  JssObject,
} from '../_types';

/**
 * Interface for a JSS name converter function.
 */
export interface JssNameConverter {
  (originalObject: JssInputFormat): JssNamedOutputFormat;
}

/**
 * Helper function to convert JSS property names to CSS kebab-case
 * @param {string} property The JSS property in camelCase
 * @returns {string} The CSS property in kebab-case
 */
const convertPropertyToKebabCase = (property: string): string => {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase();
};

/**
 * Helper function to format CSS values
 * @param {any} value The CSS value to format
 * @returns {string} The formatted CSS value
 */
const formatCssValue = (value: any): string => {
  if (typeof value === 'number' && value !== 0) {
    return `${value}px`;
  }
  return String(value);
};

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
 * @since 1.1.0
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
 * @since 1.1.0
 */
export const processNestedObjects = <T extends object>(
  obj: T,
): JssNamedOutputFormat => {
  const result: JssNamedOutputFormat = {};

  const process = (value: any) => {
    if (!value || typeof value !== 'object' || value === null) return;

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

/**
 * Converts a JSS object to a CSS string.
 * @param {JssObject} jssObject The JSS object to convert
 * @returns {string} CSS string representation of the JSS object
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * const css = Styles.utilities.transform.convertToCSS(animation.loader.dots);
 * ```
 * @since 1.1.1
 */
export const convertToCSS = (jssObject: JssObject): string => {
  if (!jssObject || typeof jssObject !== 'object') {
    return '';
  }

  if (!('className' in jssObject)) {
    return '';
  }

  const { className, ...styles } = jssObject;

  const selector = Array.isArray(className)
    ? className.map((name) => `.${name}`).join(', ')
    : `.${className}`;

  const standardProps: string[] = [];
  const nestedRules: string[] = [];

  Object.entries(styles).forEach(([property, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    // Handle nested rules (like media queries, pseudo-selectors)
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Handle @media, @keyframes, etc.
      if (property.startsWith('@')) {
        const nestedCss = Object.entries(value)
          .map(([nestedSelector, nestedValue]) => {
            if (typeof nestedValue === 'object' && nestedValue !== null) {
              const nestedDeclarations = Object.entries(nestedValue)
                .map(
                  ([nestedProp, nestedVal]) =>
                    `${convertPropertyToKebabCase(
                      nestedProp,
                    )}: ${formatCssValue(nestedVal)};`,
                )
                .join('\n    ');

              return `  ${nestedSelector} {\n    ${nestedDeclarations}\n  }`;
            }
            return '';
          })
          .filter(Boolean)
          .join('\n');

        nestedRules.push(`${property} {\n${nestedCss}\n}`);
      } else {
        // Handle pseudo-classes and other nested selectors
        const nestedDeclarations = Object.entries(value)
          .map(
            ([nestedProp, nestedVal]) =>
              `  ${convertPropertyToKebabCase(nestedProp)}: ${formatCssValue(
                nestedVal,
              )};`,
          )
          .join('\n');

        nestedRules.push(`${selector}${property} {\n${nestedDeclarations}\n}`);
      }
    } else {
      standardProps.push(
        `${convertPropertyToKebabCase(property)}: ${formatCssValue(value)};`,
      );
    }
  });

  let result = '';

  if (standardProps.length > 0) {
    result += `${selector} {\n  ${standardProps.join('\n  ')}\n}`;
  }

  if (nestedRules.length > 0) {
    if (result) {
      result += '\n';
    }
    result += nestedRules.join('\n');
  }

  return result;
};
