/**
 * @file StyleManager.ts
 * @description Manages style accumulation, deduplication, and CSS compilation
 *
 * Handles JSS-to-CSS conversion, style merging, and priority ordering
 * Specifically adapted for the UMD Design System's style patterns
 */

import { jssToCSS } from '@universityofmaryland/web-utilities-library/styles';
import type {
  ElementStyles,
  StyleDefinition,
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
 * - Multiple selector types (element, ::before, + *, > *)
 * - Style merging and conflict resolution
 * - Integration with UMD Design System style utilities
 *
 * @example
 * ```typescript
 * const styles = new StyleManager();
 * styles.add(Styles.element.action.primary.normal, 'umd-action', 0);
 * const css = styles.compile();
 * ```
 */
export class StyleManager {
  private styleQueue: StyleEntry[];
  private compiled: Map<string, string>;
  private styleIds: Set<string>;

  constructor() {
    this.styleQueue = [];
    this.compiled = new Map();
    this.styleIds = new Set();
  }

  /**
   * Add styles to the registry
   * Automatically handles ElementStyles structure and StyleDefinition objects
   *
   * @param styles - Style definition from styles library or ElementStyles object
   * @param className - Class name to use as selector (null will skip style application)
   * @param priority - Priority for style ordering (higher = applied last)
   */
  add(
    styles: StyleDefinition | ElementStyles | Record<string, any>,
    className: string | null,
    priority: number = 0,
  ): void {
    if (!className) {
      // Skip style application if no className provided
      return;
    }

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
   * Compile all queued styles into a CSS string using CSS cascade order
   *
   * Instead of merging styles at the object level, this generates separate CSS
   * for each priority level and concatenates them. This preserves duplicate
   * properties and lets CSS cascade determine which styles win.
   *
   * Priority order (lower priority first, higher priority last):
   * - Priority 1: .withStyles() - custom inline styles
   * - Priority 2: .styled() - design system presets
   *
   * Example output:
   * ```css
   * .test { color: black; }      // Priority 1
   * .test { color: green; }      // Priority 2 (wins via cascade)
   * ```
   *
   * @returns Compiled CSS string with styles in cascade order
   */
  compile(): string {
    if (this.styleQueue.length === 0) {
      return '';
    }

    // Sort by priority (lower priority first, higher priority last)
    const sorted = [...this.styleQueue].sort((a, b) => a.priority - b.priority);

    // Group by priority level
    const byPriority = new Map<number, StyleEntry[]>();
    sorted.forEach((entry) => {
      if (!byPriority.has(entry.priority)) {
        byPriority.set(entry.priority, []);
      }
      byPriority.get(entry.priority)!.push(entry);
    });

    // Generate CSS for each priority level separately
    const cssByPriority: string[] = [];

    // Process each priority level in order (ascending)
    Array.from(byPriority.keys())
      .sort((a, b) => a - b)
      .forEach((priority) => {
        const entries = byPriority.get(priority)!;

        // Group entries by selector within this priority level
        const grouped = new Map<string, Record<string, any>>();
        entries.forEach(({ selector, styles }) => {
          if (!grouped.has(selector)) {
            grouped.set(selector, {});
          }
          const currentStyles = grouped.get(selector)!;
          const mergedStyles = this.deepMerge(styles);
          grouped.set(selector, this.intelligentMerge(currentStyles, mergedStyles));
        });

        // Generate CSS for this priority level
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

        if (cssRules.length > 0) {
          cssByPriority.push(cssRules.join('\n'));
        }
      });

    // Concatenate all priority levels in order
    // Later priorities appear last in CSS, winning via cascade
    return cssByPriority.join('\n');
  }

  /**
   * Deep merge style objects
   * Handles nested selectors, media queries, and container queries
   *
   * Special handling for:
   * - @media queries: Merges properties within matching queries
   * - @container queries: Merges properties within matching queries
   * - @supports queries: Merges properties within matching queries
   * - Nested selectors (&:hover, etc): Merges properties within matching selectors
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
   * Intelligently merge two style objects
   * Recursively merges nested queries (@media, @container, etc.) and selectors
   *
   * @param target - The target object to merge into
   * @param source - The source object to merge from
   * @returns Merged object with intelligent query composition
   */
  private intelligentMerge(
    target: Record<string, any>,
    source: Record<string, any>,
  ): Record<string, any> {
    const result = { ...target };

    Object.entries(source).forEach(([key, value]) => {
      // Check if this is a nested query or selector that should be merged
      const isNestedRule =
        key.startsWith('@media') ||
        key.startsWith('@container') ||
        key.startsWith('@supports') ||
        key.startsWith('&') ||
        key.startsWith(':');

      if (isNestedRule && typeof value === 'object' && !Array.isArray(value)) {
        // If the key exists in target, merge the nested properties
        if (result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
          result[key] = this.intelligentMerge(result[key], value);
        } else {
          // Key doesn't exist, just assign
          result[key] = value;
        }
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Regular nested object, use recursive merge
        if (result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
          result[key] = this.intelligentMerge(result[key], value);
        } else {
          result[key] = value;
        }
      } else {
        // Primitive value, just assign (source wins)
        result[key] = value;
      }
    });

    return result;
  }

  /**
   * Clone the registry for immutable operations
   */
  clone(): StyleManager {
    const cloned = new StyleManager();
    cloned.styleQueue = [...this.styleQueue];
    cloned.compiled = new Map(this.compiled);
    cloned.styleIds = new Set(this.styleIds);
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
