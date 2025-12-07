// Mock for: @universityofmaryland/web-builder-library
// Description: Element builder utilities with fluent API
//
// ⚠️ MANUAL MOCK - DO NOT AUTO-GENERATE ⚠️
// This is a MANUAL mock that cannot be auto-generated because ElementBuilder
// requires a fluent API implementation with method chaining.

/**
 * Mock ElementBuilder class with full fluent API support
 * Implements method chaining for all builder methods
 */
class MockElementBuilder {
  constructor(elementOrTagOrOptions, options = {}) {
    // Create element based on constructor arguments
    if (!elementOrTagOrOptions) {
      this.element = document.createElement('div');
    } else if (typeof elementOrTagOrOptions === 'string') {
      this.element = document.createElement(elementOrTagOrOptions);
    } else if (elementOrTagOrOptions instanceof HTMLElement) {
      this.element = elementOrTagOrOptions;
    } else {
      this.element = document.createElement('div');
      options = elementOrTagOrOptions;
    }

    this.classNames = new Set();
    this.styles = {};
    this.attributes = new Map();
    this.children = [];
    this.eventListeners = new Map();
    this.customEvents = {};
    this.isBuilt = false;
  }

  // Class name methods
  withClassName(...names) {
    names.forEach(name => {
      if (name && name.trim()) {
        this.classNames.add(name.trim());
      }
    });
    return this;
  }

  // Style methods
  withStyles(styles, priority = 2) {
    Object.assign(this.styles, styles);
    return this;
  }

  withStylesIf(condition, styles, priority = 2) {
    if (condition) {
      this.withStyles(styles, priority);
    }
    return this;
  }

  styled(styleObject, priority = 1) {
    if (styleObject && typeof styleObject === 'object' && 'className' in styleObject) {
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

  // Attribute methods
  withAttributes(attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        this.attributes.set(key, String(value));
      }
    });
    return this;
  }

  withAttribute(key, value) {
    return this.withAttributes({ [key]: value });
  }

  withAria(attrs) {
    const ariaAttrs = {};
    Object.entries(attrs).forEach(([key, value]) => {
      const attrKey = key.startsWith('aria-') ? key : `aria-${key}`;
      ariaAttrs[attrKey] = String(value);
    });
    return this.withAttributes(ariaAttrs);
  }

  withData(attrs) {
    const dataAttrs = {};
    Object.entries(attrs).forEach(([key, value]) => {
      const attrKey = key.startsWith('data-') ? key : `data-${key}`;
      dataAttrs[attrKey] = String(value);
    });
    return this.withAttributes(dataAttrs);
  }

  withRole(role) {
    return this.withAttribute('role', role);
  }

  // Content methods
  withText(text) {
    this.element.textContent = text;
    return this;
  }

  withHTML(html) {
    this.element.innerHTML = html;
    return this;
  }

  // Child methods
  withChild(child) {
    if (child !== null && child !== undefined) {
      this.children.push(child);
    }
    return this;
  }

  withChildren(...children) {
    children.forEach(child => this.withChild(child));
    return this;
  }

  withChildIf(condition, child) {
    if (condition) {
      const resolvedChild = typeof child === 'function' ? child() : child;
      this.withChild(resolvedChild);
    }
    return this;
  }

  withChildrenFrom(items, mapper) {
    items.forEach((item, index) => {
      this.withChild(mapper(item, index));
    });
    return this;
  }

  // Event methods
  on(event, handler, options) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push({ handler, options });
    return this;
  }

  withEvents(events) {
    this.customEvents = { ...this.customEvents, ...events };
    return this;
  }

  // Modifier methods
  withModifier(modifier) {
    modifier(this.element);
    return this;
  }

  withAnimation(animation, options = {}) {
    return this;
  }

  ref(callback) {
    callback(this.element);
    return this;
  }

  // Utility methods
  apply(fn) {
    return fn(this);
  }

  clone() {
    const cloned = new MockElementBuilder(this.element.cloneNode(true));
    cloned.classNames = new Set(this.classNames);
    cloned.styles = { ...this.styles };
    cloned.attributes = new Map(this.attributes);
    return cloned;
  }

  // Getter methods (non-destructive)
  getStyles() {
    return 'mock-styles';
  }

  getClassNames() {
    return Array.from(this.classNames);
  }

  getElement() {
    // Apply accumulated classes
    this.classNames.forEach(name => this.element.classList.add(name));
    // Apply accumulated attributes
    this.attributes.forEach((value, key) => {
      this.element.setAttribute(key, value);
    });
    return this.element;
  }

  // Terminal methods
  build() {
    if (this.isBuilt) {
      return {
        element: this.element,
        styles: 'mock-styles',
        update: jest.fn(),
        destroy: jest.fn(),
        ...(Object.keys(this.customEvents).length > 0 && {
          events: this.customEvents,
        }),
      };
    }

    this.isBuilt = true;

    // Apply class names
    this.classNames.forEach(name => this.element.classList.add(name));

    // Apply attributes
    this.attributes.forEach((value, key) => {
      this.element.setAttribute(key, value);
    });

    // Process children
    this.children.forEach(child => {
      if (child && typeof child.build === 'function') {
        // ElementBuilder child
        const built = child.build();
        this.element.appendChild(built.element);
      } else if (child && child.element) {
        // ElementModel child
        this.element.appendChild(child.element);
      } else if (child instanceof HTMLElement) {
        this.element.appendChild(child);
      } else if (typeof child === 'string') {
        this.element.appendChild(document.createTextNode(child));
      }
    });

    // Apply event listeners
    this.eventListeners.forEach((listeners, event) => {
      listeners.forEach(({ handler, options }) => {
        this.element.addEventListener(event, handler, options);
      });
    });

    return {
      element: this.element,
      styles: 'mock-styles',
      update: jest.fn(),
      destroy: jest.fn(),
      ...(Object.keys(this.customEvents).length > 0 && {
        events: this.customEvents,
      }),
    };
  }

  mountTo(parent) {
    const result = this.isBuilt ? { element: this.element } : this.build();
    parent.appendChild(result.element);
    return this;
  }
}

// Mock StyleManager class
class MockStyleManager {
  constructor() {
    this.styles = [];
  }

  add(styles, className, priority = 1) {
    this.styles.push({ styles, className, priority });
    return this;
  }

  compile() {
    return 'mock-compiled-styles';
  }

  clone() {
    const cloned = new MockStyleManager();
    cloned.styles = [...this.styles];
    return cloned;
  }
}

// Mock LifecycleManager class
class MockLifecycleManager {
  constructor() {
    this.listeners = [];
    this.element = null;
  }

  trackListener(event, handler, options) {
    this.listeners.push({ event, handler, options });
  }

  setElement(element) {
    this.element = element;
  }

  cleanup() {
    this.listeners = [];
  }
}

module.exports = {
  ElementBuilder: MockElementBuilder,
  StyleManager: MockStyleManager,
  LifecycleManager: MockLifecycleManager,
  createStyleTag: jest.fn().mockReturnValue(document.createElement('style')),
  injectStyles: jest.fn(),
  cleanupAll: jest.fn(),
  getGlobalLifecycleRegistry: jest.fn().mockReturnValue(new Map()),
  getLifecycleStats: jest.fn().mockReturnValue({ total: 0, active: 0 }),
  isElementBuilder: jest.fn((obj) => obj instanceof MockElementBuilder),
  isElementStyles: jest.fn(),
  isStyleDefinition: jest.fn(),
};
