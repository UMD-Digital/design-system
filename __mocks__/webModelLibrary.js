// Mock for @universityofmaryland/web-model-library
// Manual mock - Package requires browser APIs (HTMLElement, customElements)
//
// ⚠️ MANUAL MOCK - DO NOT AUTO-GENERATE ⚠️
// This is a MANUAL mock that cannot be auto-generated because the model package
// requires complex browser APIs and custom element registration logic.

/**
 * Mock Attributes system
 */
const Attributes = {
  names: {
    THEME: 'data-theme',
    SIZE: 'data-size',
    COLOR: 'data-color',
    deprecated: {
      layout: {
        LAYOUT_STICKY_TOP: 'data-layout-sticky-top',
      },
    },
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
      visuallyPosition: jest.fn((config) => ({
        observedAttributes: [],
        connectedCallback: jest.fn(),
        disconnectedCallback: jest.fn(),
        attributeChangedCallback: jest.fn(),
      })),
    },
    common: {
      resize: jest.fn((callback) => ({
        observedAttributes: [],
        connectedCallback: jest.fn(),
        disconnectedCallback: jest.fn(),
        attributeChangedCallback: jest.fn(),
      })),
      accordion: jest.fn(() => ({
        observedAttributes: [],
        connectedCallback: jest.fn(),
        disconnectedCallback: jest.fn(),
        attributeChangedCallback: jest.fn(),
      })),
      visualShowHide: jest.fn((config) => ({
        observedAttributes: [],
        connectedCallback: jest.fn(),
        disconnectedCallback: jest.fn(),
        attributeChangedCallback: jest.fn(),
      })),
    },
    combine: jest.fn((...handlers) => ({
      observedAttributes: [],
      attributeChangedCallback: jest.fn(),
    })),
  },
  isVisual: {
    transparent: jest.fn(() => false),
    aligned: jest.fn(() => false),
    bordered: jest.fn(() => false),
  },
  isTheme: {
    dark: jest.fn(() => false),
    light: jest.fn(() => false),
  },
  isDisplay: {
    list: jest.fn(() => false),
    grid: jest.fn(() => false),
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
  webComponent: jest.fn((config) => {
    // Mock component registration - returns a registration function
    // ComponentRegistration type is: () => void
    return jest.fn(() => {
      // Mock the component registration (called when component is used)
      if (typeof customElements !== 'undefined' && customElements.define) {
        customElements.define(config?.tagName || 'umd-mock', class extends HTMLElement {
          constructor() {
            super();
          }
        });
      }
    });
  }),
  registerWebComponent: jest.fn((config) => {
    // Mock component registration (used by Card and Article components)
    // This should also call customElements.define
    if (typeof customElements !== 'undefined' && customElements.define) {
      customElements.define(config?.name || 'umd-mock', config?.element || class extends HTMLElement {
        constructor() {
          super();
        }
      });
    }
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
  element: {
    allowed: {
      headline: { allowed: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] },
      subHeadline: { allowed: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
      text: { allowed: ['p', 'div', 'span'] },
      body: { allowed: ['p', 'div'] },
      image: { allowed: ['img', 'picture'] },
      video: { allowed: ['video', 'iframe'], attributes: { src: 'string' } },
      actions: { allowed: ['a', 'button'] },
      eyebrow: { allowed: ['span', 'p'] },
      time: { allowed: ['time'] },
      link: { allowed: ['a'] },
      button: { allowed: ['button'] },
      icon: { allowed: ['svg', 'img'] },
      slot: { allowed: ['slot'] },
    },
  },
  name: {
    assets: {
      image: 'image',
      video: 'video',
    },
  },
  eyebrow: {
    default: jest.fn(() => null),
  },
  headline: {
    default: jest.fn(() => null),
  },
  text: {
    default: jest.fn(() => null),
  },
  date: {
    default: jest.fn(() => null),
  },
  actions: {
    default: jest.fn(() => null),
  },
};

/**
 * Mock Lifecycle system
 */
const Lifecycle = {
  onConnected: jest.fn(),
  onDisconnected: jest.fn(),
  onAttributeChanged: jest.fn(),
  hooks: {
    loadOnConnect: jest.fn(),
    loadAnimation: jest.fn(),
  },
};

module.exports = {
  Attributes,
  Model,
  Register,
  Slots,
  Lifecycle,
};
