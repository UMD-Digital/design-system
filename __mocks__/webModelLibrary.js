// Mock for @universityofmaryland/web-model-library
// Manual mock - Package requires browser APIs (HTMLElement, customElements)

/**
 * Mock Attributes system
 */
const Attributes = {
  names: {
    THEME: 'data-theme',
    SIZE: 'data-size',
    COLOR: 'data-color',
  },
  values: {
    theme: {
      LIGHT: 'light',
      DARK: 'dark',
    },
  },
  checks: {
    isTheme: jest.fn((value) => ['light', 'dark'].includes(value)),
  },
  handler: {
    observe: {
      resize: jest.fn(() => ({ observedAttributes: [] })),
    },
    combine: jest.fn((...handlers) => ({
      observedAttributes: [],
      attributeChangedCallback: jest.fn(),
    })),
  },
};

/**
 * Mock Model system
 */
const Model = {
  createCustomElement: jest.fn((config) => {
    // Return a mock custom element class
    return class MockCustomElement {
      constructor() {
        this.shadowRoot = {
          appendChild: jest.fn(),
          innerHTML: '',
        };
      }
      connectedCallback() {}
      disconnectedCallback() {}
      attributeChangedCallback() {}
    };
  }),
};

/**
 * Mock Register system
 */
const Register = {
  registerWebComponent: jest.fn((config) => {
    // Mock component registration
    return true;
  }),
};

/**
 * Mock Slots system
 */
const Slots = {
  extract: jest.fn((element, slotConfig) => ({
    slots: {},
    isValid: true,
  })),
  validate: jest.fn(() => true),
  create: {
    element: jest.fn((tag) => ({
      element: {},
      slot: tag,
    })),
  },
  query: {
    hasSlot: jest.fn(() => false),
    getSlotContent: jest.fn(() => null),
  },
  mapping: {
    getSlotName: jest.fn((name) => name),
  },
};

/**
 * Mock Lifecycle system
 */
const Lifecycle = {
  onConnected: jest.fn(),
  onDisconnected: jest.fn(),
  onAttributeChanged: jest.fn(),
};

module.exports = {
  Attributes,
  Model,
  Register,
  Slots,
  Lifecycle,
};
