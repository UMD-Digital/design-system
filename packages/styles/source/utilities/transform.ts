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
 * Checks if a value is a plain object
 */
function isPlainObject(value: any): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Creates a selector with classname prefix
 */
function createClassSelector(className: string | string[]): string {
  return Array.isArray(className)
    ? className.map((name) => `.${name}`).join(', ')
    : `.${className}`;
}

/**
 * Combines selectors with parent reference handling
 */
function combineSelectorWithParent(
  parentSelector: string,
  childSelector: string,
): string {
  return childSelector.includes('&')
    ? childSelector.replace(/&/g, parentSelector)
    : childSelector.startsWith(':')
    ? `${parentSelector}${childSelector}`
    : `${parentSelector} ${childSelector}`;
}

/**
 * Extracts query type from a query string
 */
function extractQueryType(query: string): string {
  if (query.startsWith('@media')) return '@media';
  if (query.startsWith('@container')) return '@container';
  return '';
}

/**
 * Converts a camelCase property name to kebab-case for CSS
 */
function toKebabCase(property: string): string {
  return property
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .toLowerCase();
}

/**
 * Formats a CSS value to a string
 */
function formatValue(value: any): string {
  if (Array.isArray(value)) {
    return value.join(' ');
  }

  if (typeof value === 'number' && value !== 0) {
    return `${value}px`;
  }

  return String(value);
}

/**
 * Checks if an object is a valid query condition (for media or container queries)
 */
function isValidQueryCondition(obj: any): boolean {
  return typeof obj !== 'object' || obj === null || Array.isArray(obj);
}

/**
 * Processes a media query string that might include template literals
 */
function processMediaQueryString(queryString: string): string {
  // Return the string as-is if it doesn't appear to contain template literals
  if (!queryString.includes('${')) {
    return queryString;
  }

  // For template literals in media queries, we should allow them to pass through.
  // At runtime, these template literals will be resolved to their actual values.
  // This helps ensure that things like @media (${media.queries.large.min}) work correctly.
  return queryString;
}

/**
 * Combines two query conditions (media or container)
 */
function combineQueryConditions(
  outerQuery: string,
  innerQuery: string,
): string {
  // Process any template literals
  outerQuery = processMediaQueryString(outerQuery);
  innerQuery = processMediaQueryString(innerQuery);

  const outerType = extractQueryType(outerQuery);
  const innerType = extractQueryType(innerQuery);

  const outerCondition = outerQuery
    .replace(new RegExp(`^${outerType}\\s*`), '')
    .trim();
  const innerCondition = innerQuery
    .replace(new RegExp(`^${innerType}\\s*`), '')
    .trim();

  if (outerType !== innerType && innerType !== '') {
    return innerQuery;
  }

  // If one of the conditions has template literals, handle carefully to avoid malformed queries
  if (outerCondition.includes('${') || innerCondition.includes('${')) {
    // If template literals exist, preserve them
    const queryType = outerType || innerType || '@media';
    return `${queryType} ${outerCondition} and ${innerCondition}`;
  }

  const queryType = outerType || innerType || '@media';
  return `${queryType} ${outerCondition} and ${innerCondition}`;
}

/**
 * Creates CSS rules from style properties
 */
function createRules(properties: Record<string, any>): string {
  return Object.entries(properties)
    .filter(
      ([_, value]) =>
        value != null && (typeof value !== 'object' || Array.isArray(value)),
    )
    .map(([prop, value]) => `  ${toKebabCase(prop)}: ${formatValue(value)};`)
    .join('\n');
}

/**
 * Creates a CSS block with selector and rules
 */
function createBlock(
  selector: string,
  properties: Record<string, any>,
): string {
  const rules = createRules(properties);
  return rules ? `${selector} {\n${rules}\n}` : '';
}

/**
 * Processes a container or media query and returns a valid CSS string
 */
function processQuery(
  query: string,
  selector: string,
  properties: Record<string, any>,
): string {
  let cleanQuery = processMediaQueryString(query);

  if (
    !cleanQuery.startsWith('@media') &&
    !cleanQuery.startsWith('@container')
  ) {
    cleanQuery = cleanQuery.includes('container')
      ? `@container ${cleanQuery}`
      : `@media ${cleanQuery}`;
  }

  const directProps: Record<string, any> = {};
  const nestedQueries: Array<[string, Record<string, any>]> = [];
  const nestedSelectors: Array<[string, Record<string, any>]> = [];

  Object.entries(properties).forEach(([prop, value]) => {
    if (isPlainObject(value)) {
      if (prop.startsWith('@media') || prop.startsWith('@container')) {
        nestedQueries.push([
          processMediaQueryString(prop),
          value as Record<string, any>,
        ]);
      } else {
        nestedSelectors.push([prop, value as Record<string, any>]);
      }
    } else {
      directProps[prop] = value;
    }
  });

  const rules = createRules(directProps);
  const mainBlock = rules
    ? `${cleanQuery} {\n  ${selector} {\n${rules
        .split('\n')
        .map((line) => `  ${line}`)
        .join('\n')}\n  }\n}`
    : '';

  const nestedSelectorBlocks = nestedSelectors.map(
    ([nestedSelector, nestedStyles]) => {
      const expandedSelector = combineSelectorWithParent(
        selector,
        nestedSelector,
      );

      const nestedRules = createRules(nestedStyles);
      return nestedRules
        ? `${cleanQuery} {\n  ${expandedSelector} {\n${nestedRules
            .split('\n')
            .map((line) => `  ${line}`)
            .join('\n')}\n  }\n}`
        : '';
    },
  );

  const nestedQueryBlocks = nestedQueries.map(
    ([nestedQuery, nestedQueryStyles]) => {
      const combinedQuery = combineQueryConditions(cleanQuery, nestedQuery);
      return processQuery(combinedQuery, selector, nestedQueryStyles);
    },
  );

  return [mainBlock, ...nestedSelectorBlocks, ...nestedQueryBlocks]
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Processes nested selectors and returns corresponding CSS
 */
function processNestedSelector(
  baseSelector: string,
  nestedSelector: string,
  properties: Record<string, any>,
): string {
  const selectors = nestedSelector.split(',').map((s) => s.trim());
  const fullSelector = selectors
    .map((selector) => combineSelectorWithParent(baseSelector, selector))
    .join(', ');

  const directProps: Record<string, any> = {};
  const queries: Array<[string, Record<string, any>]> = [];
  const nestedSelectors: Array<[string, Record<string, any>]> = [];

  Object.entries(properties).forEach(([prop, value]) => {
    if (
      (prop.startsWith('@media') || prop.startsWith('@container')) &&
      isPlainObject(value)
    ) {
      queries.push([
        processMediaQueryString(prop),
        value as Record<string, any>,
      ]);
    } else if (isPlainObject(value)) {
      nestedSelectors.push([prop, value as Record<string, any>]);
    } else {
      directProps[prop] = value;
    }
  });

  const mainBlock = createBlock(fullSelector, directProps);
  const queryBlocks = queries.map(([query, styles]) =>
    processQuery(query, fullSelector, styles),
  );
  const nestedBlocks = nestedSelectors.map(([selector, styles]) =>
    processNestedSelector(fullSelector, selector, styles),
  );

  return [mainBlock, ...queryBlocks, ...nestedBlocks]
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Converts JSS objects to a format with class names as keys.
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
 * Converts a JSS object to a valid CSS string
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
  const selector = createClassSelector(className);

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

// Export helper functions for testing
// This object will not be included in production builds
export const __test__ = {
  isPlainObject,
  toKebabCase,
  createClassSelector,
  combineSelectorWithParent,
  extractQueryType,
  formatValue,
  isValidQueryCondition,
  combineQueryConditions,
  createRules,
  createBlock,
  processQuery,
  processNestedSelector,
};
