/**
 * @module utilities/transform
 * Provides utilities for transforming JSS objects.
 * @since 1.1.0
 */

import postcss from 'postcss';
import postcssJs from 'postcss-js';
import postcssNesting from 'postcss-nesting';
import { createClassSelector } from './css';
import type {
  JssInputFormat,
  JssNamedOutputFormat,
  JssObject,
} from '../../_types';

/**
 * Interface for a JSS name converter function.
 * @since 1.1.0
 */
export interface JssNameConverter {
  (originalObject: JssInputFormat): JssNamedOutputFormat;
}

/**
 * Transform JSS objects to a format with class names as keys.
 * @param {JssInputFormat} originalObject The input object with className properties
 * @returns {JssNamedOutputFormat} Object with class names as keys
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * const transformed = Styles.utilities.transform.jss.formatWithClassSelector({
 *   button: { className: 'my-button', color: 'red' }
 * });
 * // Result: { '.my-button': { color: 'red' } }
 * ```
 * @since 1.1.0
 */
export const formatWithClassSelector: JssNameConverter = (originalObject) => {
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
 * @param {T} obj The object containing nested className or selector objects
 * @returns {JssNamedOutputFormat} Flattened object with class names or selectors as keys
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * const flattened = Styles.utilities.transform.jss.formatNestedObjects({
 *   container: {
 *     nested: { className: 'box', padding: '10px' }
 *   }
 * });
 * // Result: { '.box': { padding: '10px' } }
 * ```
 * @since 1.1.0
 */
export const formatNestedObjects = <T extends object>(
  obj: T,
): JssNamedOutputFormat => {
  const result: JssNamedOutputFormat = {};
  const process = (value: any) => {
    if (!value || typeof value !== 'object' || value === null) return;

    if ('className' in value) {
      const transformed = formatWithClassSelector({ key: value });
      Object.assign(result, transformed);
    } else if ('selector' in value) {
      // Handle objects with selector property
      const { selector, ...properties } = value;
      result[selector] = properties;
    } else {
      Object.values(value).forEach(process);
    }
  };

  process(obj);
  return result;
};

/**
 * Converts a font JSS object into a CSS @font-face rule string
 * Uses PostCSS with postcss-js for reliable CSS processing.
 * @param {Object} fontObject - The font JSON object containing font properties
 * @returns {string} - CSS @font-face rule as a string
 */
export const convertFontToCss = (fontObject: Record<string, any>): string => {
  if (!fontObject.fontFamily || !fontObject.src) {
    console.error('Font object must contain fontFamily and src properties');
    return '';
  }

  const wrapper = {
    '@font-face': {
      fontFamily: fontObject.fontFamily,
      src: fontObject.src,
      ...(fontObject.fontWeight ? { fontWeight: fontObject.fontWeight } : {}),
      ...(fontObject.fontStyle ? { fontStyle: fontObject.fontStyle } : {}),
    },
  };

  return postcss([]).process(wrapper, {
    parser: postcssJs as any,
  } as any).css;
};

/**
 * Process a JSS object and convert it to a CSS string with the given selector.
 * This is an internal utility function used by the public CSS conversion functions.
 * Uses PostCSS with postcss-nesting and postcss-js for reliable CSS processing.
 *
 * @param {Record<string, any>} styles The style properties to convert
 * @param {string} selector The CSS selector to use
 * @returns {string} The CSS string representation
 * @since 1.2.0
 */
export const convertToCss = (
  styles: Record<string, any>,
  selector: string,
): string => {
  if (!styles || !selector) {
    return '';
  }

  // Filter out null, undefined values and className property
  const processedStyles = { ...styles };

  Object.entries(processedStyles).forEach(([key, value]) => {
    if (value == null || key === 'className') {
      delete processedStyles[key];
    }
  });

  try {
    if (processedStyles.self) {
      const selfProps = processedStyles.self;
      delete processedStyles.self;
      Object.assign(processedStyles, selfProps);
    }

    const transformedStyles: Record<string, any> = {};
    const keyframes: Record<string, any> = {};

    Object.entries(processedStyles).forEach(([key, value]) => {
      if (key.startsWith('@keyframes')) {
        // Extract keyframes to root level
        keyframes[key] = value;
      } else if (key.startsWith('@')) {
        transformedStyles[key] = value;
      } else if (typeof value === 'object' && value !== null) {
        if (key.startsWith(':')) {
          transformedStyles[`&${key}`] = value;
        } else if (!key.startsWith('&')) {
          transformedStyles[`& ${key}`] = value;
        } else {
          transformedStyles[key] = value;
        }
      } else {
        transformedStyles[key] = value;
      }
    });

    const wrapper = {
      ...keyframes,
      [selector]: transformedStyles,
    };

    const result = postcss([
      postcssNesting({ noIsPseudoSelector: true }) as any,
    ]).process(wrapper, {
      parser: postcssJs as any,
    }).css;

    return result;
  } catch (error) {
    // Fallback: return a simple CSS string
    console.error('Error processing CSS with PostCSS:', error);

    const properties = Object.entries(processedStyles)
      .filter(([key, value]) => typeof value !== 'object' && value !== null)
      .map(([key, value]) => {
        const kebabKey = key
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
          .toLowerCase();
        return `  ${kebabKey}: ${value};`;
      })
      .join('\n');

    return `${selector} {\n${properties}\n}`;
  }
};

/**
 * Converts a style object with an arbitrary selector to a valid CSS string.
 * @param {Record<string, any>} styles The style properties to convert
 * @param {string} selector The CSS selector to use
 * @returns {string} The CSS string representation
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * const css = Styles.utilities.transform.jss.convertToSelectorCSS(
 *   {
 *     color: 'blue',
 *     fontSize: 16,
 *     '@media (min-width: 768px)': {
 *       self: { fontSize: 20 }
 *     }
 *   },
 *   '#my-element'
 * );
 * ```
 * @since 1.3.0
 */
export const convertToSelectorCSS = (
  styles: Record<string, any>,
  selector: string,
): string => {
  if (!styles || typeof styles !== 'object') {
    return '';
  }

  return convertToCss(styles, selector);
};

/**
 * Converts a JSS object with a className to a valid CSS string.
 * @param {JssObject} jssObject The JSS object to convert (must include className)
 * @returns {string} The CSS string representation
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * const css = Styles.utilities.transform.jss.convertToClassSelectorCss({
 *   className: 'header',
 *   color: 'blue',
 *   fontSize: 16,
 *   '@media (min-width: 768px)': {
 *     self: { fontSize: 20 }
 *   }
 * });
 * ```
 * @since 1.3.0
 */
export const convertToClassSelectorCss = (jssObject: JssObject): string => {
  if (
    !jssObject ||
    typeof jssObject !== 'object' ||
    !('className' in jssObject)
  ) {
    return '';
  }

  const { className, ...styles } = jssObject;
  const selector = createClassSelector(className);

  return convertToCss(styles, selector);
};
