/**
 * @file StyleManager.ts
 * @description Manages style accumulation, deduplication, and CSS compilation
 *
 * Handles JSS-to-CSS conversion, style merging, priority ordering, and theme application
 * Specifically adapted for the UMD Design System's style patterns
 */

import { jssToCSS } from '@universityofmaryland/web-utilities-library/styles';
import type {
  ElementStyles,
  StyleDefinition,
  ThemeType,
  StyleEntry,
  StyleType,
} from './types';
import { isElementStyles, isStyleDefinition } from './types';

/**
 * Manages style accumulation, deduplication, and compilation
 *
 * Features:
 * - Style deduplication by content hash
 * - Priority-based style ordering
 * - Theme variant support
 * - Multiple selector types (element, ::before, + *, > *)
 * - Style merging and conflict resolution
 * - Integration with UMD Design System style utilities
 *
 * @example
 * ```typescript
 * const styles = new StyleManager();
 * styles.add(Styles.element.action.primary.normal, 'umd-action', 0);
 * styles.addTheme('dark');
 * const css = styles.compile();
 * ```
 */
export class StyleManager {
  private styleQueue: StyleEntry[];
  private compiled: Map<string, string>;
  private theme?: ThemeType;
  private isThemeDark: boolean;
  private styleIds: Set<string>;

  constructor() {
    this.styleQueue = [];
    this.compiled = new Map();
    this.styleIds = new Set();
    this.isThemeDark = false;
  }

  /**
   * Add styles to the registry
   * Automatically handles ElementStyles structure and StyleDefinition objects
   *
   * @param styles - Style definition from styles library or ElementStyles object
   * @param className - Class name to use as selector
   * @param priority - Priority for style ordering (higher = applied last)
   */
  add(
    styles: StyleDefinition | ElementStyles | Record<string, any>,
    className: string,
    priority: number = 0,
  ): void {
    if (isElementStyles(styles)) {
      this.addElementStyles(styles, className, priority);
    } else if (isStyleDefinition(styles)) {
      this.addStyleDefinition(styles, className, priority);
    } else {
      // Plain JSS object
      this.addPlainStyles(styles, className, priority);
    }
  }

  /**
   * Add ElementStyles structure (element, pseudoBefore, siblingAfter, subElement)
   */
  private addElementStyles(
    styles: ElementStyles,
    className: string,
    priority: number,
  ): void {
    if (styles.element) {
      this.addStyleEntry(`.${className}`, styles.element, priority, 'element');
    }

    if (styles.pseudoBefore) {
      this.addStyleEntry(
        `.${className}::before`,
        styles.pseudoBefore,
        priority,
        'pseudo-before',
      );
    }

    if (styles.siblingAfter) {
      this.addStyleEntry(
        `.${className} + *`,
        styles.siblingAfter,
        priority,
        'sibling-after',
      );
    }

    if (styles.subElement) {
      this.addStyleEntry(
        `.${className} > *`,
        styles.subElement,
        priority,
        'sub-element',
      );
    }
  }

  /**
   * Add StyleDefinition from styles library
   * These have a className property and style properties
   */
  private addStyleDefinition(
    definition: StyleDefinition,
    className: string,
    priority: number,
  ): void {
    const { className: defClassName, ...styleProps } = definition;

    const targetClassName = Array.isArray(defClassName)
      ? defClassName[0]
      : defClassName || className;

    if (isElementStyles(styleProps)) {
      this.addElementStyles(styleProps, targetClassName, priority);
    } else {
      this.addStyleEntry(
        `.${targetClassName}`,
        styleProps,
        priority,
        'definition',
      );
    }
  }

  /**
   * Add plain JSS object
   */
  private addPlainStyles(
    styles: Record<string, any>,
    className: string,
    priority: number,
  ): void {
    const hasSelectors = Object.keys(styles).some(
      (key) =>
        key.startsWith('.') || key.startsWith('#') || key.startsWith('&'),
    );

    if (hasSelectors) {
      this.addStyleEntry(
        `.${className}`,
        styles,
        priority,
        'jss-with-selectors',
      );
    } else {
      this.addStyleEntry(`.${className}`, styles, priority, 'plain-object');
    }
  }

  /**
   * Add a single style entry with deduplication
   */
  private addStyleEntry(
    selector: string,
    styles: Record<string, any>,
    priority: number,
    type: StyleType,
  ): void {
    const id = this.createStyleId(selector, styles, type);

    if (this.styleIds.has(id)) {
      return;
    }

    this.styleIds.add(id);
    this.styleQueue.push({ selector, styles, priority, id, type });
  }

  /**
   * Create a unique ID for style deduplication
   */
  private createStyleId(
    selector: string,
    styles: Record<string, any>,
    type: StyleType,
  ): string {
    const content = `${selector}:${type}:${JSON.stringify(styles)}`;
    return this.simpleHash(content);
  }

  /**
   * Simple string hash function
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  /**
   * Add theme-specific modifiers
   * This updates the theme state and will be applied during compilation
   */
  addTheme(theme: ThemeType): void {
    this.theme = theme;
  }

  /**
   * Set dark theme flag for style modifiers
   * Applies white text/icon colors during compilation
   */
  setThemeDark(isDark: boolean): void {
    this.isThemeDark = isDark;
  }

  /**
   * Compile all queued styles into a CSS string
   * Handles priority ordering, selector grouping, and theme application
   *
   * @returns Compiled CSS string
   */
  compile(): string {
    if (this.styleQueue.length === 0) {
      return '';
    }

    const sorted = [...this.styleQueue].sort((a, b) => a.priority - b.priority);

    const grouped = new Map<string, Record<string, any>>();
    sorted.forEach(({ selector, styles }) => {
      if (!grouped.has(selector)) {
        grouped.set(selector, {});
      }
      Object.assign(grouped.get(selector)!, this.deepMerge(styles));
    });

    if (this.isThemeDark) {
      this.applyDarkThemeModifiers(grouped);
    }

    const cssRules: string[] = [];
    grouped.forEach((styles, selector) => {
      try {
        const css = jssToCSS({
          styleObj: { [selector]: styles },
        });
        if (css && css.trim()) {
          cssRules.push(css);
        }
      } catch (error) {
        console.error(
          `Error compiling styles for selector "${selector}":`,
          error,
        );
      }
    });

    return cssRules.join('\n\n');
  }

  /**
   * Deep merge style objects
   * Handles nested selectors and media queries
   */
  private deepMerge(source: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    Object.entries(source).forEach(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = this.deepMerge(value);
      } else {
        result[key] = value;
      }
    });

    return result;
  }

  /**
   * Apply dark theme style modifiers
   * Sets white color for text and icons (matching V1 behavior)
   */
  private applyDarkThemeModifiers(
    grouped: Map<string, Record<string, any>>,
  ): void {
    grouped.forEach((styles) => {
      // Apply white color to text elements
      if (
        styles.color &&
        styles.color !== 'white' &&
        styles.color !== '#fff' &&
        styles.color !== '#ffffff'
      ) {
        styles.color = 'white';
      }

      // Apply white fill to icons/SVG
      if (styles.fill && styles.fill !== 'white') {
        styles.fill = 'white';
      }

      // Apply to nested selectors (& , ., svg, path, etc.)
      Object.keys(styles).forEach((key) => {
        if (
          key.startsWith('&') ||
          key.startsWith('.') ||
          key === 'svg' ||
          key === 'path' ||
          key === '*'
        ) {
          const nested = styles[key];
          if (nested && typeof nested === 'object') {
            if (nested.color && nested.color !== 'white') {
              nested.color = 'white';
            }
            if (nested.fill && nested.fill !== 'white') {
              nested.fill = 'white';
            }
          }
        }
      });
    });
  }

  /**
   * Clone the registry for immutable operations
   */
  clone(): StyleManager {
    const cloned = new StyleManager();
    cloned.styleQueue = [...this.styleQueue];
    cloned.compiled = new Map(this.compiled);
    cloned.styleIds = new Set(this.styleIds);
    cloned.theme = this.theme;
    cloned.isThemeDark = this.isThemeDark;
    return cloned;
  }

  /**
   * Clear all styles
   */
  clear(): void {
    this.styleQueue = [];
    this.compiled.clear();
    this.styleIds.clear();
  }

  /**
   * Get current style count (for debugging)
   */
  getStyleCount(): number {
    return this.styleQueue.length;
  }

  /**
   * Get unique style count (after deduplication)
   */
  getUniqueStyleCount(): number {
    return this.styleIds.size;
  }
}

/**
 * Create a style tag with the compiled CSS
 * Helper function for injecting styles into the document
 *
 * @param css - CSS string to inject
 * @param id - Optional ID for the style tag
 * @returns HTMLStyleElement
 */
export function createStyleTag(css: string, id?: string): HTMLStyleElement {
  const style = document.createElement('style');
  if (id) {
    style.id = id;
  }
  style.textContent = css;
  return style;
}

/**
 * Inject styles into the document head
 * Automatically deduplicates by ID
 *
 * @param css - CSS string to inject
 * @param id - Optional ID for deduplication
 */
export function injectStyles(css: string, id?: string): void {
  if (id) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.textContent = css;
      return;
    }
  }

  const style = createStyleTag(css, id);
  document.head.appendChild(style);
}
