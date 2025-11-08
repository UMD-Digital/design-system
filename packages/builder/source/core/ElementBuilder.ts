/**
 * @file ElementBuilder.ts
 * @description Core chainable builder class for UMD Design System elements
 *
 * Provides a fluent API for incrementally composing HTML elements with styles,
 * attributes, children, and lifecycle management.
 */

import { StyleManager } from './StyleManager';
import { LifecycleManager } from './LifecycleManager';
import type {
  ElementStyles,
  StyleDefinition,
  BuilderOptions,
  ElementModel,
  AnimationType,
  ElementBuilderInterface,
} from './types';
import { isElementBuilder, isElementModel } from './types';

/**
 * Core fluent builder class with chainable API
 *
 * @example
 * ```typescript
 * // Create a new div (default)
 * const container = new ElementBuilder()
 *   .withClassName('container')
 *   .withStyles({ element: { padding: '20px' } })
 *   .build();
 *
 * // Create a specific element type
 * const link = new ElementBuilder('a')
 *   .withAttribute('href', '/about')
 *   .withText('About')
 *   .build();
 *
 * // Wrap an existing element
 * const wrapped = new ElementBuilder(existingElement)
 *   .withClassName('wrapper')
 *   .build();
 *
 * // Apply JSS style object
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * const headline = new ElementBuilder(headlineElement)
 *   .styled(Styles.typography.sans.larger)
 *   .build();
 * ```
 */
export class ElementBuilder<T extends HTMLElement = HTMLElement>
  implements ElementBuilderInterface<T>
{
  private element: T;
  private classNames: Set<string>;
  private styles: StyleManager;
  private attributes: Map<string, string>;
  private children: Array<ElementBuilderInterface | ElementModel | HTMLElement | string>;
  private eventListeners: Map<
    string,
    Array<{ handler: EventListener; options?: AddEventListenerOptions }>
  >;
  private modifiers: Array<(el: T) => void>;
  private lifecycle: LifecycleManager;
  private options: BuilderOptions;
  private isBuilt: boolean = false;
  private customEvents: Record<string, Function> = {};

  /**
   * Create a new ElementBuilder
   *
   * @overload
   * @param tag - HTML tag name to create (e.g., 'div', 'span', 'a')
   * @param options - Optional builder configuration
   *
   * @overload
   * @param element - Existing HTMLElement to wrap
   * @param options - Optional builder configuration
   *
   * @overload
   * @param options - Optional builder configuration (creates a div)
   */
  constructor(
    elementOrTagOrOptions?: T | keyof HTMLElementTagNameMap | BuilderOptions,
    options: BuilderOptions = {},
  ) {
    if (!elementOrTagOrOptions) {
      this.element = document.createElement('div') as unknown as T;
    } else if (typeof elementOrTagOrOptions === 'string') {
      this.element = document.createElement(
        elementOrTagOrOptions,
      ) as unknown as T;
    } else if (elementOrTagOrOptions instanceof HTMLElement) {
      this.element = elementOrTagOrOptions as T;
    } else {
      this.element = document.createElement('div') as unknown as T;
      options = elementOrTagOrOptions as BuilderOptions;
    }

    this.classNames = new Set();
    this.styles = new StyleManager();
    this.attributes = new Map();
    this.children = [];
    this.eventListeners = new Map();
    this.modifiers = [];
    this.lifecycle = new LifecycleManager();
    this.options = options;

    if (options.className) {
      this.withClassName(...options.className);
    }
    if (options.attributes) {
      this.withAttributes(options.attributes);
    }
    if (options.text) {
      this.withText(options.text);
    }
    if (options.html) {
      this.withHTML(options.html);
    }
    if (options.children) {
      this.withChildren(...options.children);
    }
    if (options.isThemeDark) {
      this.withThemeDark(options.isThemeDark);
    }
    if (options.styles) {
      this.withStyles(options.styles);
    }
    if (options.data) {
      this.withData(options.data);
    }
    if (options.aria) {
      this.withAria(options.aria);
    }
  }

  /**
   * Add one or more CSS class names to the element
   * @param names - Class names to add
   * @returns This builder for chaining
   */
  withClassName(...names: string[]): this {
    this.assertNotBuilt();
    names.forEach((name) => {
      if (name && name.trim()) {
        this.classNames.add(name.trim());
      }
    });
    return this;
  }

  /**
   * Add styles (JSS object, ElementStyles, or StyleDefinition from styles library)
   * Styles are accumulated and merged with proper priority
   *
   * @param styles - Style definition or ElementStyles object
   * @param priority - Optional priority for style ordering (higher = applied last)
   * @returns This builder for chaining
   */
  withStyles(
    styles: StyleDefinition | ElementStyles | Record<string, any>,
    priority: number = 0,
  ): this {
    this.assertNotBuilt();
    const className = this.getCurrentClassName();
    this.styles.add(styles, className, priority);
    return this;
  }

  /**
   * Conditionally add styles
   * @param condition - Whether to add the styles
   * @param styles - Styles to add if condition is true
   * @param priority - Optional priority
   * @returns This builder for chaining
   */
  withStylesIf(
    condition: boolean,
    styles: StyleDefinition | ElementStyles | Record<string, any>,
    priority: number = 0,
  ): this {
    if (condition) {
      this.withStyles(styles, priority);
    }
    return this;
  }

  /**
   * Apply a JSS style object from the styles library
   *
   * This is a convenience method that:
   * 1. Extracts the className from the style object
   * 2. Applies the complete style object
   *
   * @param styleObject - JSS StyleDefinition from @universityofmaryland/web-styles-library
   * @param priority - Optional priority for style ordering (default: 1 to override base styles)
   * @returns This builder for chaining
   *
   * @example
   * ```typescript
   * import * as Styles from '@universityofmaryland/web-styles-library';
   *
   * const headline = new ElementBuilder(headlineElement)
   *   .styled(Styles.typography.sans.larger)
   *   .build();
   *
   * // Equivalent to:
   * // new ElementBuilder(headlineElement)
   * //   .withClassName('umd-headline-sans-larger')
   * //   .withStyles(Styles.typography.sans.larger)
   * //   .build();
   * ```
   */
  styled(
    styleObject: StyleDefinition | ElementStyles | Record<string, any>,
    priority: number = 1,
  ): this {
    this.assertNotBuilt();

    if (
      styleObject &&
      typeof styleObject === 'object' &&
      'className' in styleObject
    ) {
      const className = styleObject.className;
      if (typeof className === 'string') {
        this.withClassName(className);
      } else if (Array.isArray(className)) {
        this.withClassName(...className);
      }
    }

    this.withStyles(styleObject, priority);

    return this;
  }

  /**
   * Apply dark theme styling - applies white text/icon color style modifiers
   * @param isDark - Whether to apply dark theme (true = apply white colors, false/undefined = no modification)
   * @returns This builder for chaining
   * @example
   * ```typescript
   * // Apply dark theme
   * .withThemeDark(true)
   *
   * // From props
   * .withThemeDark(props.isThemeDark)
   *
   * // Conditional
   * .withThemeDark(someCondition)
   * ```
   */
  withThemeDark(isDark?: boolean): this {
    this.assertNotBuilt();
    if (isDark) {
      this.options.isThemeDark = true;
    }
    return this;
  }

  /**
   * Add HTML attributes
   * @param attrs - Object of attribute key-value pairs
   * @returns This builder for chaining
   */
  withAttributes(attrs: Record<string, string | number | boolean>): this {
    this.assertNotBuilt();
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        this.attributes.set(key, String(value));
      }
    });
    return this;
  }

  /**
   * Add a single attribute
   * @param key - Attribute name
   * @param value - Attribute value
   * @returns This builder for chaining
   */
  withAttribute(key: string, value: string | number | boolean): this {
    return this.withAttributes({ [key]: value });
  }

  /**
   * Set ARIA attributes for accessibility
   * @param attrs - ARIA attributes (with or without 'aria-' prefix)
   * @returns This builder for chaining
   */
  withAria(attrs: Record<string, string | boolean>): this {
    const ariaAttrs: Record<string, string> = {};
    Object.entries(attrs).forEach(([key, value]) => {
      const attrKey = key.startsWith('aria-') ? key : `aria-${key}`;
      ariaAttrs[attrKey] = String(value);
    });
    return this.withAttributes(ariaAttrs);
  }

  /**
   * Set data attributes
   * @param attrs - Data attributes (with or without 'data-' prefix)
   * @returns This builder for chaining
   */
  withData(attrs: Record<string, string | number | boolean>): this {
    const dataAttrs: Record<string, string> = {};
    Object.entries(attrs).forEach(([key, value]) => {
      const attrKey = key.startsWith('data-') ? key : `data-${key}`;
      dataAttrs[attrKey] = String(value);
    });
    return this.withAttributes(dataAttrs);
  }

  /**
   * Set role attribute for ARIA semantics
   * @param role - ARIA role (button, navigation, main, etc.)
   * @returns This builder for chaining
   */
  withRole(role: string): this {
    return this.withAttribute('role', role);
  }

  /**
   * Set text content (replaces existing text)
   * @param text - Text content to set
   * @returns This builder for chaining
   */
  withText(text: string): this {
    this.assertNotBuilt();
    this.modifiers.push((el) => {
      el.textContent = text;
    });
    return this;
  }

  /**
   * Set inner HTML (replaces existing content)
   * WARNING: Be careful with XSS - sanitize user input!
   * @param html - HTML string to set
   * @returns This builder for chaining
   */
  withHTML(html: string): this {
    this.assertNotBuilt();
    this.modifiers.push((el) => {
      el.innerHTML = html;
    });
    return this;
  }

  /**
   * Add a child element
   * @param child - Child to add (Builder, HTMLElement, or string)
   * @returns This builder for chaining
   */
  withChild(
    child: ElementBuilderInterface | ElementModel | HTMLElement | string | null | undefined,
  ): this {
    this.assertNotBuilt();
    if (child !== null && child !== undefined) {
      this.children.push(child);
    }
    return this;
  }

  /**
   * Add multiple children
   * Supports ElementBuilder, ElementModel, HTMLElement, or string children
   * ElementModel children will have their styles automatically merged
   * @param children - Children to add
   * @returns This builder for chaining
   */
  withChildren(
    ...children: Array<ElementBuilderInterface | ElementModel | HTMLElement | string>
  ): this {
    children.forEach((child) => this.withChild(child));
    return this;
  }

  /**
   * Conditionally add a child
   * @param condition - Whether to add the child
   * @param child - Child to add if condition is true
   * @returns This builder for chaining
   */
  withChildIf(
    condition: boolean,
    child:
      | ElementBuilderInterface
      | HTMLElement
      | string
      | (() => ElementBuilderInterface | HTMLElement | string),
  ): this {
    if (condition) {
      const resolvedChild = typeof child === 'function' ? child() : child;
      this.withChild(resolvedChild);
    }
    return this;
  }

  /**
   * Add children from an array (useful for mapping)
   * @param items - Array of items
   * @param mapper - Function to map each item to a child
   * @returns This builder for chaining
   */
  withChildrenFrom<Item>(
    items: Item[],
    mapper: (
      item: Item,
      index: number,
    ) => ElementBuilderInterface | HTMLElement | string,
  ): this {
    items.forEach((item, index) => {
      this.withChild(mapper(item, index));
    });
    return this;
  }

  /**
   * Add an event listener
   * @param event - Event name (e.g., 'click', 'mouseover')
   * @param handler - Event handler function
   * @param options - Event listener options
   * @returns This builder for chaining
   */
  on(
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions,
  ): this {
    this.assertNotBuilt();
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push({ handler, options });

    this.lifecycle.trackListener(event, handler, options);
    return this;
  }

  /**
   * Add custom events/methods to the ElementModel
   * These will be available on the returned ElementModel.events object
   *
   * @param events - Object containing custom event handlers or methods
   * @returns This builder for chaining
   *
   * @example
   * ```typescript
   * const video = new ElementBuilder('div')
   *   .withEvents({
   *     play: () => videoElement.play(),
   *     pause: () => videoElement.pause(),
   *     seek: (time) => videoElement.currentTime = time
   *   })
   *   .build();
   *
   * // Use the events
   * video.events.play();
   * video.events.pause();
   * video.events.seek(30);
   * ```
   */
  withEvents(events: Record<string, Function>): this {
    this.assertNotBuilt();
    this.customEvents = { ...this.customEvents, ...events };
    return this;
  }

  /**
   * Add a custom element modifier function
   * Useful for imperative DOM manipulation
   * @param modifier - Function that receives the element
   * @returns This builder for chaining
   */
  withModifier(modifier: (el: T) => void): this {
    this.assertNotBuilt();
    this.modifiers.push(modifier);
    return this;
  }

  /**
   * Apply CSS animation to element
   * Phase 1: Generates animation shorthand property
   * Phase 2 (Future): Will support withKeyframes() for custom animations
   *
   * @param animation - Animation name (must be defined in CSS keyframes)
   * @param options - Animation timing options
   * @returns This builder for chaining
   *
   * @example
   * ```typescript
   * // Phase 1: Reference existing keyframes
   * button()
   *   .withAnimation('slideUnder', { duration: '300ms', delay: '100ms' })
   *   .build();
   * // Generates CSS: animation: slideUnder 300ms ease-in-out 100ms;
   * ```
   */
  withAnimation(
    animation: AnimationType,
    options?: {
      delay?: string;
      duration?: string;
      easing?: string;
      iterationCount?: string | number;
      direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
      fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
    },
  ): this {
    this.assertNotBuilt();
    this.options.animation = { type: animation, ...options };

    const parts = [
      animation,
      options?.duration || '300ms',
      options?.easing || 'ease-in-out',
      options?.delay || '0ms',
      options?.iterationCount?.toString() || '1',
      options?.direction || 'normal',
      options?.fillMode || 'none',
    ];

    this.withStyles(
      {
        element: {
          animation: parts.join(' '),
        },
      },
      1,
    ); // Higher priority so it can override base styles

    return this;
  }

  /**
   * Get a reference to the element (useful for imperative operations)
   * The callback is called during build phase
   * @param callback - Function that receives the element
   * @returns This builder for chaining
   */
  ref(callback: (el: T) => void): this {
    this.modifiers.push(callback);
    return this;
  }

  /**
   * Apply a function to this builder
   * Useful for extracting reusable builder patterns
   * @param fn - Function that receives this builder
   * @returns This builder for chaining
   */
  apply(fn: (builder: this) => this): this {
    return fn(this);
  }

  /**
   * Clone this builder (immutable branching)
   * Creates a new builder with a cloned element
   * @returns New builder instance
   */
  clone(): ElementBuilderInterface<T> {
    const cloned = new ElementBuilder(this.element.cloneNode(true) as T, {
      ...this.options,
    });
    cloned.classNames = new Set(this.classNames);
    cloned.styles = this.styles.clone();
    cloned.attributes = new Map(this.attributes);
    // Note: children, modifiers, and listeners are not deep cloned
    // This is intentional for performance and to avoid infinite loops
    return cloned;
  }

  /**
   * Get compiled styles without building the element
   * Useful when you only need the styles from a preset or builder
   * Does not mark the builder as built
   * @returns Compiled CSS string
   *
   * @example
   * ```typescript
   * const presetStyles = actions.primary().getStyles();
   *
   * const element = new ElementBuilder(myElement)
   *   .withStyles(presetStyles)
   *   .build();
   * ```
   */
  getStyles(): string {
    // Apply theme modifiers before compiling styles
    if (this.options.isThemeDark) {
      this.styles.setThemeDark(true);
    }

    return this.styles.compile();
  }

  /**
   * Get the element with accumulated changes applied (classes, attributes)
   * Useful when you need the element reference before finalizing with .build()
   * Does not mark the builder as built
   * Does not apply children, modifiers, or event listeners
   * @returns The underlying HTML element with classes and attributes applied
   *
   * @example
   * ```typescript
   * const builder = new ElementBuilder('div')
   *   .withClassName('container')
   *   .withAttribute('data-test', 'true');
   *
   * const element = builder.getElement(); // Element has classes and attributes
   * // Builder can still be modified and built later
   * ```
   */
  getElement(): T {
    // Apply accumulated classes
    this.classNames.forEach((name) => this.element.classList.add(name));

    // Apply accumulated attributes
    this.attributes.forEach((value, key) => {
      this.element.setAttribute(key, value);
    });

    return this.element;
  }

  /**
   * Build the final element with all styles applied
   * This is the terminal operation that returns ElementModel
   * Can only be called once per builder instance
   * @returns ElementModel with element, styles, and lifecycle methods
   */
  build(): ElementModel<T> {
    if (this.isBuilt) {
      console.warn(
        'ElementBuilder.build() called multiple times. Returning cached result.',
      );
      return {
        element: this.element,
        styles: this.styles.compile(),
        update: (props) => this.update(props),
        destroy: () => this.destroy(),
        ...(Object.keys(this.customEvents).length > 0 && { events: this.customEvents }),
      };
    }

    this.isBuilt = true;

    this.classNames.forEach((name) => this.element.classList.add(name));

    this.attributes.forEach((value, key) => {
      this.element.setAttribute(key, value);
    });

    const childStyles: string[] = [];
    this.children.forEach((child) => {
      if (isElementBuilder(child)) {
        const built = child.build();
        this.element.appendChild(built.element);
        if (built.styles) {
          childStyles.push(built.styles);
        }
      } else if (isElementModel(child)) {
        // Handle ElementModel children - extract element and merge styles
        this.element.appendChild(child.element);
        if (child.styles) {
          childStyles.push(child.styles);
        }
      } else if (child instanceof HTMLElement) {
        this.element.appendChild(child);
      } else if (typeof child === 'string') {
        this.element.appendChild(document.createTextNode(child));
      }
    });

    this.modifiers.forEach((modifier) => {
      try {
        modifier(this.element);
      } catch (error) {
        console.error('Error applying modifier:', error);
      }
    });

    this.eventListeners.forEach((listeners, event) => {
      listeners.forEach(({ handler, options }) => {
        this.element.addEventListener(event, handler, options);
      });
    });

    // Apply theme modifiers before compiling styles
    if (this.options.isThemeDark) {
      this.styles.setThemeDark(true);
    }

    const compiledStyles = this.styles.compile();
    const allStyles = [compiledStyles, ...childStyles]
      .filter((s) => s && s.trim())
      .join('\n');

    this.lifecycle.setElement(this.element);

    const model: ElementModel<T> = {
      element: this.element,
      styles: allStyles,
      update: (props: Partial<BuilderOptions>) => this.update(props),
      destroy: () => this.destroy(),
      ...(Object.keys(this.customEvents).length > 0 && { events: this.customEvents }),
    };

    return model;
  }

  /**
   * Mount this element to a parent element
   * Automatically builds if not already built
   * @param parent - Parent element to append to
   * @returns This builder for chaining
   */
  mountTo(parent: HTMLElement): this {
    const result = this.isBuilt ? { element: this.element } : this.build();
    parent.appendChild(result.element);
    return this;
  }

  /**
   * Update the element with new props (for reactivity)
   * @param props - Properties to update
   */
  private update(props: Partial<BuilderOptions>): void {
    Object.assign(this.options, props);

    if (props.theme && props.theme !== this.options.theme) {
      this.styles.addTheme(props.theme);
    }
  }

  /**
   * Cleanup and destroy the element
   * Removes event listeners, cleans up resources, and removes from DOM
   */
  private destroy(): void {
    this.lifecycle.cleanup();
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  /**
   * Get current primary class name (for style generation)
   * @returns The first class name or a default
   */
  private getCurrentClassName(): string {
    const first = Array.from(this.classNames)[0];
    if (first) return first;

    const uniqueClass = `umd-element-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    this.classNames.add(uniqueClass);
    return uniqueClass;
  }

  /**
   * Assert that build() hasn't been called yet
   * Throws error if builder is already built
   */
  private assertNotBuilt(): void {
    if (this.isBuilt) {
      throw new Error(
        'ElementBuilder: Cannot modify builder after build() has been called',
      );
    }
  }
}
