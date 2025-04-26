/**
 * @module utilities/transform
 * Utilities for transforming design tokens to CSS variables.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.utilities.transform.tokensToCssVars
 * ```
 * @since 1.1.0
 */

import { isPlainObject, toKebabCase } from './css';

/**
 * Options for the tokensToCssVars function
 */
export interface TokensToCssVarsOptions {
  /** Whether to convert camelCase keys to kebab-case */
  kebabCase?: boolean;
  /** Custom formatter for variable names */
  formatKey?: (key: string, kebabCase: boolean) => string;
}

/**
 * Formats a token key based on options.
 * @param {string} key The token key to format
 * @param {boolean} useKebabCase Whether to use kebab-case
 * @returns {string} The formatted key
 * @since 1.1.0
 */
export function formatTokenKey(key: string, useKebabCase: boolean): string {
  if (/^\d/.test(key)) {
    return key; // Keep numeric prefixes as-is
  }

  if (useKebabCase) {
    return toKebabCase(key);
  }

  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Converts a design token object to CSS variables with a configurable prefix.
 * @param {Record<string, any>} tokenObj The token object (colors, spacing, etc.)
 * @param {string} prefix The prefix to use for variable names (e.g., 'spacing-')
 * @param {TokensToCssVarsOptions} options Additional options
 * @returns {Record<string, any>} CSS variables object
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 *
 * const colors = {
 *   primary: '#ff0000',
 *   secondary: '#00ff00',
 *   neutral: {
 *     100: '#ffffff',
 *     900: '#000000'
 *   }
 * };
 *
 * const cssVars = Styles.utilities.transform.tokensToCssVars(colors, 'color-', { kebabCase: true });
 * // Result: {
 * //   '--color-primary': '#ff0000',
 * //   '--color-secondary': '#00ff00',
 * //   '--color-neutral-100': '#ffffff',
 * //   '--color-neutral-900': '#000000'
 * // }
 * ```
 * @since 1.1.0
 */
export function tokensToCssVars(
  tokenObj: Record<string, any>,
  prefix: string,
  options: TokensToCssVarsOptions = {},
): Record<string, any> {
  const { kebabCase = false, formatKey = formatTokenKey } = options;
  const cssVars: Record<string, any> = {};

  // Process flat values
  Object.entries(tokenObj).forEach(([key, value]) => {
    if (!isPlainObject(value)) {
      const formattedKey = formatKey(key, kebabCase);
      const varName = `--${prefix}${formattedKey}`;
      cssVars[varName] = value;
    }
  });

  // Handle nested objects
  Object.entries(tokenObj).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      const formattedKey = formatKey(key, kebabCase);
      const nestedPrefix = `${prefix}${formattedKey}-`;
      const nestedVars = tokensToCssVars(value, nestedPrefix, options);
      Object.assign(cssVars, nestedVars);
    }
  });

  return cssVars;
}

/**
 * Converts CSS variables object to CSS custom properties string.
 * @param {Record<string, any>} cssVarsObj CSS variables object
 * @returns {string} CSS custom properties as a string
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 *
 * const cssVars = {
 *   '--color-primary': '#ff0000',
 *   '--color-secondary': '#00ff00'
 * };
 *
 * const css = Styles.utilities.transform.cssVarsToString(cssVars);
 * // Result:
 * // :root {
 * //   --color-primary: #ff0000;
 * //   --color-secondary: #00ff00;
 * // }
 * ```
 * @since 1.1.0
 */
export function cssVarsToString(cssVarsObj: Record<string, any>): string {
  const rules = Object.entries(cssVarsObj)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');

  return `:root {\n${rules}\n}`;
}
