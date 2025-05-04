/**
 * @module utilities/transform
 * Utilities for transforming JSS objects to CSS.
 * @since 1.1.0
 */

/**
 * Creates a CSS block with selector and rules.
 * @param {string} selector CSS selector
 * @param {Record<string, any>} properties Object of CSS properties
 * @returns {string} CSS block as a string
 * @since 1.3.0
 */
export function createBlock(
  selector: string,
  properties: Record<string, any>,
): string {
  const rules = createRules(properties);
  return rules ? `${selector} {\n${rules}\n}` : '';
}

/**
 * Creates a selector with classname prefix.
 * @param {string|string[]} className The class name or array of class names
 * @returns {string} CSS selector string
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.createClassSelector('button'); // '.button'
 * Styles.utilities.transform.createClassSelector(['btn', 'btn-primary']); // '.btn, .btn-primary'
 * ```
 * @since 1.3.0
 */
export function createClassSelector(className: string | string[]): string {
  return Array.isArray(className)
    ? className.map((name) => `.${name}`).join(', ')
    : `.${className}`;
}

/**
 * Combines two query conditions (media or container).
 * @param {string} outerQuery The outer query string
 * @param {string} innerQuery The inner query string
 * @returns {string} The combined query string
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.combineQueryConditions(
 *   '@media (min-width: 768px)',
 *   '@media (max-width: 1024px)'
 * ); // '@media (min-width: 768px) and (max-width: 1024px)'
 * ```
 * @since 1.3.0
 */
export function combineQueryConditions(
  outerQuery: string,
  innerQuery: string,
): string {
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

  if (outerCondition.includes('${') || innerCondition.includes('${')) {
    const queryType = outerType || innerType || '@media';
    return `${queryType} ${outerCondition} and ${innerCondition}`;
  }

  const queryType = outerType || innerType || '@media';
  return `${queryType} ${outerCondition} and ${innerCondition}`;
}

/**
 * Creates CSS rules from style properties.
 * @param {Record<string, any>} properties Object of CSS properties
 * @returns {string} CSS rules as a string
 * @since 1.3.0
 */
export function createRules(properties: Record<string, any>): string {
  return Object.entries(properties)
    .filter(
      ([_, value]) =>
        value != null && (typeof value !== 'object' || Array.isArray(value)),
    )
    .map(([prop, value]) => `  ${toKebabCase(prop)}: ${formatValue(value)};`)
    .join('\n');
}

/**
 * Combines selectors with parent reference handling.
 * @param {string} parentSelector The parent selector
 * @param {string} childSelector The child selector
 * @returns {string} Combined CSS selector
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.combineSelectorWithParent('.btn', '&:hover'); // '.btn:hover'
 * Styles.utilities.transform.combineSelectorWithParent('.card', 'img'); // '.card img'
 * ```
 * @since 1.3.0
 */
export function combineSelectorWithParent(
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
 * Extracts query type from a query string.
 * @param {string} query The query string
 * @returns {string} The query type ('@media', '@container', or empty string)
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.extractQueryType('@media (min-width: 768px)'); // '@media'
 * ```
 * @since 1.3.0
 */
export function extractQueryType(query: string): string {
  if (query.startsWith('@media')) return '@media';
  if (query.startsWith('@container')) return '@container';
  return '';
}

/**
 * Formats a CSS value to a string.
 * @param {any} value The value to format
 * @returns {string} The formatted value as a string
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.formatValue(16); // '16px'
 * Styles.utilities.transform.formatValue(['1px', 'solid', 'black']); // '1px solid black'
 * ```
 * @since 1.3.0
 */
export function formatValue(value: any): string {
  if (Array.isArray(value)) {
    return value.join(' ');
  }

  if (typeof value === 'number' && value !== 0) {
    return `${value}px`;
  }

  return String(value);
}

/**
 * Converts a camelCase property name to kebab-case for CSS.
 * @param {string} property The property name in camelCase
 * @returns {string} The property name in kebab-case
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.toKebabCase('fontSize'); // 'font-size'
 * Styles.utilities.transform.toKebabCase('borderTopWidth'); // 'border-top-width'
 * ```
 * @since 1.3.0
 */
export function toKebabCase(property: string): string {
  // Special case for CSS variables (properties starting with '--')
  if (property.startsWith('--')) {
    // Preserve the double dash prefix but still convert camelCase to kebab-case for the rest
    const variableName = property.substring(2);
    return '--' + variableName
      .replace(/([A-Z])/g, '-$1')
      .replace(/^-/, '')
      .toLowerCase();
  }
  
  return property
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .toLowerCase();
}

/**
 * Checks if a value is a plain object.
 * @param {any} value The value to check
 * @returns {boolean} True if the value is a plain object
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.isPlainObject({ foo: 'bar' }); // true
 * Styles.utilities.transform.isPlainObject([]); // false
 * ```
 * @since 1.3.0
 */
export function isPlainObject(value: any): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Checks if an object is a valid query condition (for media or container queries).
 * @param {any} obj The object to check
 * @returns {boolean} True if the object is a valid query condition
 * @since 1.1.0
 */
export function isValidQueryCondition(obj: any): boolean {
  return typeof obj !== 'object' || obj === null || Array.isArray(obj);
}

/**
 * Processes a media query string that might include template literals.
 * @param {string} queryString The query string to process
 * @returns {string} The processed query string
 * @since 1.3.0
 */
export function processMediaQueryString(queryString: string): string {
  if (!queryString.includes('${')) {
    return queryString;
  }
  return queryString;
}

/**
 * Processes a container or media query and returns a valid CSS string.
 * @param {string} query The query string (media or container)
 * @param {string} selector CSS selector
 * @param {Record<string, any>} properties Object of CSS properties
 * @returns {string} CSS query block as a string
 * @since 1.3.0
 */
export function processQuery(
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
 * Processes nested selectors and returns corresponding CSS.
 * @param {string} baseSelector The base CSS selector
 * @param {string} nestedSelector The nested selector
 * @param {Record<string, any>} properties Object of CSS properties
 * @returns {string} CSS as a string
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.processNestedSelector(
 *   '.card',
 *   '&:hover',
 *   { backgroundColor: '#f5f5f5' }
 * );
 * ```
 * @since 1.3.0
 */
export function processNestedSelector(
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
