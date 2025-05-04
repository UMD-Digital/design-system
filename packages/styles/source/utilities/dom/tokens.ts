/**
 * @module utilities/dom
 * Provides utilities for DOM manipulation.
 * @since 1.3.0
 */

import { fromTokens, formatTokenKey } from '../transform/variables';

/**
 * Adds JSS tokens to the browser as CSS variables
 * Uses the fromTokens function for token processing
 * @param tokens - JavaScript object containing design tokens
 * @param options - Configuration options
 * @returns Object containing apply, update, and remove methods
 * @since 1.3.0
 */
export default (
  tokens: Record<string, any>,
  options: {
    prefix?: string;
    kebabCase?: boolean;
    target?: HTMLElement;
    important?: boolean;
    formatKey?: (key: string, kebabCase: boolean) => string;
  } = {},
): {
  apply: (obj: Record<string, any>, currentPrefix?: string) => void;
  update: (newTokens: Record<string, any>, basePrefix?: string) => void;
  remove: () => void;
  getAppliedVariables: () => string[];
} => {
  const {
    kebabCase = true,
    target = document.documentElement,
    important = false,
    formatKey = formatTokenKey,
  } = options;

  const appliedVariables = new Set<string>();

  /**
   * Process tokens object and apply CSS variables to target element
   * @param obj - Object to process
   * @param currentPrefix - Current prefix for nested objects
   */
  function processTokens(obj: Record<string, any>, currentPrefix = ''): void {
    const cssVars = fromTokens(obj, currentPrefix, {
      kebabCase,
      formatKey,
    });

    Object.entries(cssVars).forEach(([varName, value]) => {
      let formattedValue: string;

      if (Array.isArray(value)) {
        formattedValue = value.join(', ');
      } else if (typeof value === 'string') {
        formattedValue = value;
      } else if (value === null || value === undefined) {
        formattedValue = 'initial';
      } else {
        formattedValue = String(value);
      }

      if (important) {
        formattedValue += ' !important';
      }

      target.style.setProperty(varName, formattedValue);
      appliedVariables.add(varName);
    });
  }

  /**
   * Updates specific tokens without removing others
   * @param newTokens - New tokens to apply
   * @param basePrefix - Base prefix for the new tokens
   */
  function updateTokens(newTokens: Record<string, any>, basePrefix = ''): void {
    processTokens(newTokens, basePrefix);
  }

  /**
   * Removes all applied CSS variables
   */
  function removeTokens(): void {
    appliedVariables.forEach((variableName) => {
      target.style.removeProperty(variableName);
    });
    appliedVariables.clear();
  }

  processTokens(tokens);

  return {
    apply: processTokens,
    update: updateTokens,
    remove: removeTokens,
    getAppliedVariables: () => [...appliedVariables],
  };
};
