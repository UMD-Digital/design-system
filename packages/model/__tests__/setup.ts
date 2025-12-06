import '@testing-library/jest-dom';

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
