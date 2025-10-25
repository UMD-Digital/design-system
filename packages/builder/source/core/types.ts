/**
 * @file types.ts
 * @description Type definitions for the UMD Design System Fluent Builder (v2)
 *
 * Complete TypeScript type system for the modern chainable builder API
 */

// ====================
// Base Types
// ====================

/**
 * Theme types supported by the UMD Design System
 */
export type ThemeType = 'dark' | 'light';

/**
 * Animation types supported by the builder
 */
export type AnimationType = 'slideUnder' | 'slideOver' | 'slideIn' | 'fadeIn' | 'fadeOut' | 'scale';

// ====================
// Style Types
// ====================

/**
 * Style structure matching UMD Design System element styles
 * Supports different selector types for complex styling
 */
export interface ElementStyles {
  /** Styles for the main element */
  element?: Record<string, any>;
  /** Styles for ::before pseudo-element */
  pseudoBefore?: Record<string, any>;
  /** Styles for next sibling (+ *) */
  siblingAfter?: Record<string, any>;
  /** Styles for all child elements (> *) */
  subElement?: Record<string, any>;
}

/**
 * Style definition from the @universityofmaryland/web-styles-library
 * Contains a className property and additional style properties
 */
export interface StyleDefinition {
  className: string | string[];
  [key: string]: any;
}

/**
 * Style entry in the registry
 */
export interface StyleEntry {
  selector: string;
  styles: Record<string, any>;
  priority: number;
  id: string;
  type: StyleType;
}

/**
 * Type of style entry for proper handling
 */
export type StyleType =
  | 'element'
  | 'pseudo-before'
  | 'sibling-after'
  | 'sub-element'
  | 'definition'
  | 'jss-with-selectors'
  | 'plain-object';

// ====================
// Builder Options
// ====================

/**
 * Configuration options for the builder
 */
export interface BuilderOptions {
  /** CSS class names to add */
  className?: string[];
  /** HTML attributes to set */
  attributes?: Record<string, string | number | boolean>;
  /** Text content */
  text?: string;
  /** HTML content */
  html?: string;
  /** Child elements or builders */
  children?: Array<ElementBuilderInterface | HTMLElement | string>;
  /** Theme variant to apply */
  theme?: ThemeType;
  /** Apply dark theme (white text/icon colors) */
  isThemeDark?: boolean;
  /** Style definitions to apply */
  styles?: ElementStyles | StyleDefinition | Record<string, any>;
  /** Animation configuration */
  animation?: {
    type: AnimationType;
    delay?: string;
    duration?: string;
  };
  /** Custom data attributes */
  data?: Record<string, string | number | boolean>;
  /** ARIA attributes for accessibility */
  aria?: Record<string, string | boolean>;
  /** Any additional custom options */
  [key: string]: any;
}

// ====================
// Element Model (Return Type)
// ====================

/**
 * The return type from building an element
 * Contains the element, its styles, and lifecycle methods
 *
 * This is the standard return format that maintains compatibility
 * with the existing UMD Design System element pattern
 */
export interface ElementModel<T extends HTMLElement = HTMLElement> {
  /** The built HTML element */
  element: T;
  /** The compiled CSS styles for this element and its children */
  styles: string;
  /** Optional update method for reactivity */
  update?: (props: Partial<BuilderOptions>) => void;
  /** Optional destroy method for cleanup */
  destroy?: () => void;
}

// ====================
// Lifecycle Types
// ====================

/**
 * Tracked event listener
 */
export interface TrackedListener {
  event: string;
  handler: EventListener;
  options?: AddEventListenerOptions;
}

/**
 * Tracked mutation observer
 */
export interface TrackedObserver {
  observer: MutationObserver;
  target: Node;
  config: MutationObserverInit;
}

/**
 * Cleanup function type
 */
export type CleanupFunction = () => void;

/**
 * Resource count statistics for debugging
 */
export interface ResourceCounts {
  listeners: number;
  observers: number;
  intervals: number;
  timeouts: number;
  cleanupFunctions: number;
}

// ====================
// Builder Interface
// ====================

/**
 * The fluent builder interface
 * Defines all chainable methods for building HTML elements
 */
export interface ElementBuilderInterface<T extends HTMLElement = HTMLElement> {
  // Class methods
  withClassName(...names: string[]): this;
  withClass(...names: string[]): this;

  // Style methods
  withStyles(
    styles: StyleDefinition | ElementStyles | Record<string, any>,
    priority?: number
  ): this;
  withStylesIf(
    condition: boolean,
    styles: StyleDefinition | ElementStyles | Record<string, any>,
    priority?: number
  ): this;
  withThemeDark(isDark?: boolean): this;

  // Attribute methods
  withAttributes(attrs: Record<string, string | number | boolean>): this;
  withAttribute(key: string, value: string | number | boolean): this;
  withAria(attrs: Record<string, string | boolean>): this;
  withData(attrs: Record<string, string | number | boolean>): this;

  // Content methods
  withText(text: string): this;
  withTextIf(condition: boolean, text: string): this;
  withHTML(html: string): this;

  // Child methods
  withChild(child: ElementBuilderInterface | HTMLElement | string | null | undefined): this;
  withChildren(...children: Array<ElementBuilderInterface | HTMLElement | string>): this;
  withChildIf(
    condition: boolean,
    child: ElementBuilderInterface | HTMLElement | string | (() => ElementBuilderInterface | HTMLElement | string)
  ): this;
  withChildrenFrom<Item>(
    items: Item[],
    mapper: (item: Item, index: number) => ElementBuilderInterface | HTMLElement | string
  ): this;

  // Event methods
  on(event: string, handler: EventListener, options?: AddEventListenerOptions): this;
  onClick(handler: EventListener): this;
  onInput(handler: EventListener): this;
  onChange(handler: EventListener): this;
  onSubmit(handler: EventListener): this;
  onKeydown(handler: EventListener): this;
  onKeyup(handler: EventListener): this;
  onFocus(handler: EventListener): this;
  onBlur(handler: EventListener): this;
  onMouseEnter(handler: EventListener): this;
  onMouseLeave(handler: EventListener): this;

  // Modifier methods
  withModifier(modifier: (el: T) => void): this;
  withAnimation(animation: AnimationType, options?: { delay?: string; duration?: string }): this;
  ref(callback: (el: T) => void): this;
  apply(fn: (builder: this) => this): this;

  // Utility methods
  clone(): ElementBuilderInterface<T>;

  // Terminal methods (return different types)
  build(): ElementModel<T>;
  buildElement(): T;
  mountTo(parent: HTMLElement): this;
}

// ====================
// Factory Types
// ====================

/**
 * Element factory function signature
 * Returns a builder instance pre-configured with styles
 */
export type ElementFactory<T extends HTMLElement = HTMLElement> = (
  options?: BuilderOptions
) => ElementBuilderInterface<T>;

/**
 * Action factory variants for UMD Design System
 */
export interface ActionFactories {
  primary: ElementFactory<HTMLAnchorElement>;
  primaryLarge: ElementFactory<HTMLAnchorElement>;
  primaryWhite: ElementFactory<HTMLAnchorElement>;
  secondary: ElementFactory<HTMLAnchorElement>;
  secondaryLarge: ElementFactory<HTMLAnchorElement>;
  secondaryWhite: ElementFactory<HTMLAnchorElement>;
  secondaryGold: ElementFactory<HTMLAnchorElement>;
  outline: ElementFactory<HTMLAnchorElement>;
  outlineLarge: ElementFactory<HTMLAnchorElement>;
  outlineWhite: ElementFactory<HTMLAnchorElement>;
  iconSmall: ElementFactory<HTMLAnchorElement>;
}

/**
 * Headline factory variants for UMD Design System
 */
export interface HeadlineFactories {
  sansLarge: ElementFactory<HTMLHeadingElement>;
  sansMedium: ElementFactory<HTMLHeadingElement>;
  sansSmall: ElementFactory<HTMLHeadingElement>;
  sansMin: ElementFactory<HTMLHeadingElement>;
  sansScalingLarger: ElementFactory<HTMLHeadingElement>;
  campaignMaximum: ElementFactory<HTMLHeadingElement>;
  campaignExtraLarge: ElementFactory<HTMLHeadingElement>;
  campaignLarge: ElementFactory<HTMLHeadingElement>;
}

/**
 * Text factory variants for UMD Design System
 */
export interface TextFactories {
  eyebrow: ElementFactory<HTMLSpanElement>;
  ribbon: ElementFactory<HTMLSpanElement>;
  body: ElementFactory<HTMLParagraphElement>;
}

/**
 * Layout factory variants for UMD Design System
 */
export interface LayoutFactories {
  grid: (columns?: 2 | 3 | 4, withGap?: boolean) => ElementBuilderInterface<HTMLDivElement>;
  container: () => ElementBuilderInterface<HTMLDivElement>;
  centered: () => ElementBuilderInterface<HTMLDivElement>;
  stacked: (gap?: 'small' | 'medium' | 'large') => ElementBuilderInterface<HTMLDivElement>;
  inline: (gap?: 'small' | 'medium' | 'large') => ElementBuilderInterface<HTMLDivElement>;
}

// ====================
// Utility Types
// ====================

/**
 * Make all properties of T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract the element type from a Builder
 */
export type BuilderElement<B> = B extends ElementBuilderInterface<infer T> ? T : never;

/**
 * Animation configuration
 */
export interface AnimationConfig {
  type: AnimationType;
  delay?: string;
  duration?: string;
  timingFunction?: string;
  iterationCount?: number | 'infinite';
}

// ====================
// Plugin/Extension Types
// ====================

/**
 * Plugin for extending Builder functionality
 */
export interface BuilderPlugin<T extends HTMLElement = HTMLElement> {
  name: string;
  install: (builder: ElementBuilderInterface<T>) => void;
}

/**
 * Preset configuration for creating reusable element patterns
 */
export interface PresetConfig {
  name: string;
  styles?: ElementStyles | StyleDefinition;
  className?: string;
}

// ====================
// Type Guards
// ====================

/**
 * Type guard to check if an object is a StyleDefinition
 */
export function isStyleDefinition(obj: any): obj is StyleDefinition {
  return obj && typeof obj === 'object' && 'className' in obj;
}

/**
 * Type guard to check if an object is ElementStyles
 */
export function isElementStyles(obj: any): obj is ElementStyles {
  return obj && typeof obj === 'object' && (
    'element' in obj ||
    'pseudoBefore' in obj ||
    'siblingAfter' in obj ||
    'subElement' in obj
  );
}

/**
 * Type guard to check if an object is a ElementBuilderInterface
 */
export function isElementBuilder(obj: any): obj is ElementBuilderInterface {
  return obj && typeof obj === 'object' && 'build' in obj && typeof obj.build === 'function';
}
