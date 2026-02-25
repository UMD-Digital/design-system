import '@testing-library/jest-dom';

// Save native customElements for tests that need real custom element support
(window as any).__nativeCustomElements = window.customElements;

// Mock window.customElements
Object.defineProperty(window, 'customElements', {
  value: {
    define: jest.fn(),
    get: jest.fn(() => undefined),
    whenDefined: jest.fn(() => Promise.resolve()),
  },
  writable: true,
  configurable: true,
});

// Mock WebComponents registry
(window as any).WebComponents = {};
