/**
 * @module utilities/transform
 * Provides utilities for transforming JSS objects.
 * @since 1.1.0
 */

import {
  combineQueryConditions,
  combineSelectorWithParent,
  createBlock,
  createClassSelector,
  createRules,
  isPlainObject,
  isValidQueryCondition,
  processMediaQueryString,
  processNestedSelector,
} from './css';
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
 * @param {Object} fontObject - The font JSON object containing font properties
 * @returns {string} - CSS @font-face rule as a string
 */
export const convertFontToCss = (fontObject: Record<string, any>): string => {
  if (!fontObject.fontFamily || !fontObject.src) {
    console.error('Font object must contain fontFamily and src properties');
    return '';
  }

  let css = '@font-face {\n';

  css += `  font-family: ${fontObject.fontFamily};\n`;

  css += `  src: ${fontObject.src};\n`;

  if (fontObject.fontWeight) {
    css += `  font-weight: ${fontObject.fontWeight};\n`;
  }

  if (fontObject.fontStyle) {
    css += `  font-style: ${fontObject.fontStyle};\n`;
  }

  css += '}';

  return css;
};

/**
 * Process a JSS object and convert it to a CSS string with the given selector.
 * This is an internal utility function used by the public CSS conversion functions.
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
  const standardProps: Record<string, any> = {};
  const atRules: Array<[string, Record<string, any>]> = [];
  const nestedSelectors: Array<[string, Record<string, any>]> = [];

  Object.entries(styles).forEach(([property, value]) => {
    if (value == null) {
      return;
    }

    if (isPlainObject(value)) {
      if (property.startsWith('@')) {
        if (property.startsWith('@media') || property === '@media') {
          if (property.startsWith('@media') && property !== '@media') {
            atRules.push([
              processMediaQueryString(property),
              value as Record<string, any>,
            ]);
          } else if (property === '@media') {
            Object.entries(value).forEach(([condition, queryStyles]) => {
              if (!isValidQueryCondition(condition)) {
                return;
              }

              atRules.push([
                `@media ${condition}`,
                queryStyles as Record<string, any>,
              ]);
            });
          }
        } else if (
          property.startsWith('@container') ||
          property === '@container'
        ) {
          if (property.startsWith('@container') && property !== '@container') {
            atRules.push([
              processMediaQueryString(property),
              value as Record<string, any>,
            ]);
          } else if (property === '@container') {
            Object.entries(value).forEach(([condition, queryStyles]) => {
              if (!isValidQueryCondition(condition)) {
                return;
              }

              atRules.push([
                `@container ${condition}`,
                queryStyles as Record<string, any>,
              ]);
            });
          }
        } else {
          atRules.push([property, value as Record<string, any>]);
        }
      } else {
        nestedSelectors.push([property, value as Record<string, any>]);
      }
    } else {
      standardProps[property] = value;
    }
  });

  const blocks: string[] = [];

  const mainBlock = createBlock(selector, standardProps);
  if (mainBlock) {
    blocks.push(mainBlock);
  }

  nestedSelectors.forEach(([nestedSelector, nestedStyles]) => {
    const nestedBlock = processNestedSelector(
      selector,
      nestedSelector,
      nestedStyles,
    );
    if (nestedBlock) {
      blocks.push(nestedBlock);
    }
  });

  atRules.forEach(([rule, ruleStyles]) => {
    if (rule.startsWith('@media') || rule.startsWith('@container')) {
      if (isPlainObject(ruleStyles)) {
        const queryBlocks: string[] = [];
        const nestedQueries: Array<[string, string, Record<string, any>]> = [];
        const directProperties: Record<string, any> = {};
        const nestedProperties: Record<string, Record<string, any>> = {};

        Object.entries(ruleStyles).forEach(([key, value]) => {
          if (isPlainObject(value)) {
            nestedProperties[key] = value as Record<string, any>;
          } else {
            directProperties[key] = value;
          }
        });

        if (Object.keys(directProperties).length > 0) {
          const directBlock = createRules(directProperties);
          if (directBlock) {
            queryBlocks.push(
              `  ${selector} {\n${directBlock
                .split('\n')
                .map((line) => `  ${line}`)
                .join('\n')}\n  }`,
            );
          }
        }

        Object.entries(nestedProperties).forEach(
          ([querySelector, queryStyles]) => {
            if (isPlainObject(queryStyles)) {
              const expandedSelector =
                querySelector === 'self'
                  ? selector
                  : querySelector.startsWith('.')
                  ? querySelector
                  : querySelector.startsWith('&')
                  ? combineSelectorWithParent(selector, querySelector)
                  : `${selector} ${querySelector}`;

              Object.entries(queryStyles as Record<string, any>).forEach(
                ([prop, value]) => {
                  if (
                    (prop.startsWith('@media') ||
                      prop.startsWith('@container')) &&
                    isPlainObject(value)
                  ) {
                    const combinedQuery = combineQueryConditions(rule, prop);
                    nestedQueries.push([
                      combinedQuery,
                      expandedSelector,
                      value as Record<string, any>,
                    ]);

                    delete (queryStyles as Record<string, any>)[prop];
                  }
                },
              );

              const queryBlock = createBlock(
                expandedSelector,
                queryStyles as Record<string, any>,
              );
              if (queryBlock) {
                const indentedContent = queryBlock
                  .replace(/^[^{]*{/, '')
                  .replace(/}$/, '')
                  .split('\n')
                  .map((line) => `  ${line}`)
                  .join('\n');

                if (indentedContent.trim()) {
                  queryBlocks.push(
                    `  ${expandedSelector} {${indentedContent}  }`,
                  );
                }
              }
            }
          },
        );

        if (queryBlocks.length > 0) {
          blocks.push(`${rule} {\n${queryBlocks.join('\n\n')}\n}`);
        }

        nestedQueries.forEach(([nestedQuery, nestedSelector, nestedStyles]) => {
          const nestedRules = createRules(nestedStyles);
          if (nestedRules) {
            blocks.push(
              `${nestedQuery} {\n  ${nestedSelector} {\n${nestedRules
                .split('\n')
                .map((line) => `    ${line}`)
                .join('\n')}\n  }\n}`,
            );
          }
        });
      }
    } else {
      const nestedRules = Object.entries(ruleStyles)
        .map(([nestedSelector, nestedValue]) => {
          if (isPlainObject(nestedValue)) {
            return createBlock(
              nestedSelector,
              nestedValue as Record<string, any>,
            )
              .replace(/^[^{]*{/, `  ${nestedSelector} {`)
              .replace(/^/gm, '  ')
              .replace(/  }$/, '  }');
          }
          return '';
        })
        .filter(Boolean)
        .join('\n');

      if (nestedRules) {
        blocks.push(`${rule} {\n${nestedRules}\n}`);
      }
    }
  });

  return blocks.join('\n\n');
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
