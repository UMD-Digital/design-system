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
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'number' && value !== 0) {
    return `${value}px`;
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    return '';
  }

  return String(value);
};

/**
 * Helper function to parse media query expressions that might have embedded objects
 * @param {string} property The property that might contain a media query
 * @returns {string | null} Parsed media query or null if invalid
 */
const parseMediaQuery = (property: string): string | null => {
  if (!property.startsWith('@media')) {
    return null;
  }

  let mediaCondition = property.substring(7).trim();

  if (mediaCondition.includes('[object Object]')) {
    return null;
  }

  mediaCondition = mediaCondition.replace(/\$\{.*?\}/g, '');

  if (!mediaCondition || mediaCondition === '()' || mediaCondition === '( )') {
    return null;
  }

  return mediaCondition;
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
 * @since 1.2.1
 */
export const convertToCSS = (jssObject: JssObject): string => {
  if (
    !jssObject ||
    typeof jssObject !== 'object' ||
    !('className' in jssObject)
  ) {
    return '';
  }

  const { className, ...styles } = jssObject;

  const selector = Array.isArray(className)
    ? className.map((name) => `.${name}`).join(', ')
    : `.${className}`;

  const standardProps: Record<string, any> = {};
  const atRules: Array<[string, Record<string, any>]> = [];
  const nestedSelectors: Array<[string, Record<string, any>]> = [];

  Object.entries(styles).forEach(([property, value]) => {
    if (value == null) {
      return;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      if (property.startsWith('@')) {
        if (property === '@media' || property === '@container') {
          Object.entries(value).forEach(([condition, queryStyles]) => {
            if (typeof condition === 'object' || !condition) {
              return;
            }

            const parsedCondition = parseMediaQuery(`@media ${condition}`);
            if (!parsedCondition) {
              return;
            }

            const queryPrefix =
              property === '@container' ? '@container' : '@media';
            atRules.push([
              `${queryPrefix} ${condition}`,
              queryStyles as Record<string, any>,
            ]);
          });
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

  function createRules(properties: Record<string, any>): string {
    return Object.entries(properties)
      .filter(
        ([_, value]) =>
          value != null && (typeof value !== 'object' || Array.isArray(value)),
      )
      .map(
        ([prop, value]) =>
          `  ${convertPropertyToKebabCase(prop)}: ${formatCssValue(value)};`,
      )
      .join('\n');
  }

  function createBlock(
    selector: string,
    properties: Record<string, any>,
  ): string {
    const rules = createRules(properties);
    return rules ? `${selector} {\n${rules}\n}` : '';
  }

  function processNestedSelector(
    baseSelector: string,
    nestedSelector: string,
    properties: Record<string, any>,
  ): string {
    const selectors = nestedSelector.split(',').map((s) => s.trim());
    const fullSelector = selectors
      .map((s) =>
        s.includes('&')
          ? s.replace(/&/g, baseSelector)
          : `${baseSelector} ${s}`,
      )
      .join(', ');

    const directProps: Record<string, any> = {};
    const mediaQueries: Array<[string, string, Record<string, any>]> = [];
    const childSelectors: Array<[string, Record<string, any>]> = [];

    Object.entries(properties).forEach(([prop, val]) => {
      const mediaCondition = parseMediaQuery(prop);
      if (mediaCondition) {
        if (typeof val === 'object' && val !== null) {
          const mediaRules = Object.entries(val)
            .filter(
              ([_, propVal]) =>
                typeof propVal !== 'object' || Array.isArray(propVal),
            )
            .reduce((acc, [mediaProp, mediaVal]) => {
              acc[mediaProp] = mediaVal;
              return acc;
            }, {} as Record<string, any>);

          if (Object.keys(mediaRules).length > 0) {
            mediaQueries.push([mediaCondition, fullSelector, mediaRules]);
          }
        }
      } else if (
        typeof val === 'object' &&
        val !== null &&
        !Array.isArray(val)
      ) {
        childSelectors.push([prop, val as Record<string, any>]);
      } else {
        directProps[prop] = val;
      }
    });

    const result: string[] = [];

    const mainBlock = createBlock(fullSelector, directProps);
    if (mainBlock) {
      result.push(mainBlock);
    }

    mediaQueries.forEach(([condition, selector, rules]) => {
      const rulesText = createRules(rules);
      if (rulesText) {
        result.push(
          `@media ${condition} {\n  ${selector} {\n${rulesText
            .split('\n')
            .map((line) => '  ' + line)
            .join('\n')}\n  }\n}`,
        );
      }
    });

    childSelectors.forEach(([childSelector, childStyles]) => {
      const mediaCondition = parseMediaQuery(childSelector);
      if (mediaCondition) {
        const rulesText = createRules(childStyles);
        if (rulesText) {
          result.push(
            `@media ${mediaCondition} {\n  ${fullSelector} {\n${rulesText
              .split('\n')
              .map((line) => '  ' + line)
              .join('\n')}\n  }\n}`,
          );
        }
      } else if (childSelector.includes('&')) {
        const processedSelector = processNestedSelector(
          fullSelector,
          childSelector,
          childStyles,
        );
        if (processedSelector) {
          result.push(processedSelector);
        }
      } else {
        const expandedChildSelector = `${fullSelector} ${childSelector}`;
        const childBlock = createBlock(expandedChildSelector, childStyles);
        if (childBlock) {
          result.push(childBlock);
        }
      }
    });

    return result.join('\n\n');
  }

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
      if (typeof ruleStyles === 'object' && ruleStyles !== null) {
        const queryBlocks: string[] = [];

        Object.entries(ruleStyles).forEach(([querySelector, queryStyles]) => {
          if (typeof queryStyles === 'object' && queryStyles !== null) {
            const expandedSelector =
              querySelector === 'self'
                ? selector
                : querySelector.startsWith('.')
                ? querySelector
                : `${selector} ${querySelector}`;

            const rules = createRules(queryStyles as Record<string, any>);
            if (rules) {
              queryBlocks.push(
                `  ${expandedSelector} {\n${rules
                  .split('\n')
                  .map((line) => '  ' + line)
                  .join('\n')}\n  }`,
              );
            }
          }
        });

        if (queryBlocks.length > 0) {
          blocks.push(`${rule} {\n${queryBlocks.join('\n\n')}\n}`);
        }
      }
    } else {
      const nestedRules = Object.entries(ruleStyles)
        .map(([nestedSelector, nestedValue]) => {
          if (typeof nestedValue === 'object' && nestedValue !== null) {
            const rules = createRules(nestedValue as Record<string, any>);
            if (rules) {
              return `  ${nestedSelector} {\n${rules
                .split('\n')
                .map((line) => '  ' + line)
                .join('\n')}\n  }`;
            }
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
