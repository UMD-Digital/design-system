// Mock for @universityofmaryland/web-builder-library
// This mock provides a simplified ElementBuilder for testing purposes

/**
 * Mock ElementBuilder class that implements a chainable builder pattern
 * Returns ElementModel objects with element and styles properties
 */
class MockElementBuilder {
  constructor(elementOrTag) {
    this.element = null;
    this.classNames = new Set();
    this.styleObjects = [];
    this.customStyles = {};
    this.childElements = [];
    this.textContent = '';
    this.attributesMap = new Map();

    // Handle different constructor patterns
    if (!elementOrTag) {
      this.element = document.createElement('div');
    } else if (typeof elementOrTag === 'string') {
      this.element = document.createElement(elementOrTag);
    } else if (elementOrTag instanceof HTMLElement) {
      this.element = elementOrTag;
    } else {
      this.element = document.createElement('div');
    }
  }

  // Chainable methods that return 'this'
  withClassName(className) {
    this.classNames.add(className);
    return this;
  }

  withText(text) {
    this.textContent = text;
    return this;
  }

  withAttribute(name, value) {
    this.attributesMap.set(name, value);
    return this;
  }

  withChild(child) {
    this.childElements.push(child);
    return this;
  }

  withChildren(...children) {
    this.childElements.push(...children);
    return this;
  }

  withChildrenFrom(items, mapper) {
    items.forEach((item, index) => {
      const child = mapper(item, index);
      this.childElements.push(child);
    });
    return this;
  }

  withChildIf(condition, child) {
    if (condition) {
      this.childElements.push(child);
    }
    return this;
  }

  styled(styleObject) {
    this.styleObjects.push(styleObject);
    // If the style object has a className, add it
    if (styleObject && styleObject.className) {
      this.classNames.add(styleObject.className);
    }
    return this;
  }

  withStyles(styles) {
    this.customStyles = { ...this.customStyles, ...styles };
    return this;
  }

  withStylesIf(condition, styles) {
    if (condition) {
      this.customStyles = { ...this.customStyles, ...styles };
    }
    return this;
  }

  withAnimation(name, config) {
    // Mock animation - just store it
    return this;
  }

  on(event, handler) {
    // Mock event listener
    return this;
  }

  withEvents(events) {
    this.customEvents = events;
    return this;
  }

  getElement() {
    // Non-destructive element access
    this._applyToElement();
    return this.element;
  }

  _applyToElement() {
    // Apply class names
    this.classNames.forEach(className => {
      this.element.classList.add(className);
    });

    // Apply text content
    if (this.textContent) {
      this.element.textContent = this.textContent;
    }

    // Apply attributes
    this.attributesMap.forEach((value, name) => {
      this.element.setAttribute(name, value);
    });

    // Append children
    this.childElements.forEach(child => {
      if (child instanceof HTMLElement) {
        this.element.appendChild(child);
      } else if (child && typeof child === 'object' && child.element) {
        // ElementModel or ElementBuilder
        this.element.appendChild(child.element || child.getElement());
      } else if (typeof child === 'string') {
        this.element.appendChild(document.createTextNode(child));
      }
    });
  }

  // Terminal build method
  build() {
    this._applyToElement();

    // Generate mock styles string
    let stylesString = '.mock-builder-styles { }';
    if (this.styleObjects.length > 0) {
      stylesString = this.styleObjects
        .map(s => s.className ? `.${s.className} { }` : '')
        .filter(Boolean)
        .join('\n');
    }

    return {
      element: this.element,
      styles: stylesString,
      destroy: jest.fn(),
      update: jest.fn(),
      events: this.customEvents || {},
    };
  }
}

// Mock StyleManager
const MockStyleManager = {
  compile: jest.fn().mockReturnValue('.mock-compiled-styles { }'),
  createStyleTag: jest.fn().mockReturnValue(document.createElement('style')),
  injectStyles: jest.fn(),
};

// Mock LifecycleManager
const MockLifecycleManager = {
  track: jest.fn(),
  cleanup: jest.fn(),
  destroy: jest.fn(),
};

module.exports = {
  ElementBuilder: MockElementBuilder,
  StyleManager: MockStyleManager,
  LifecycleManager: MockLifecycleManager,
  createStyleTag: jest.fn().mockReturnValue(document.createElement('style')),
  injectStyles: jest.fn(),
  getGlobalLifecycleRegistry: jest.fn().mockReturnValue(new Map()),
  cleanupAll: jest.fn(),
  getLifecycleStats: jest.fn().mockReturnValue({ listeners: 0, observers: 0 }),
};
