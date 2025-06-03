// Mock customElements API
const mockDefine = jest.fn();
const mockGet = jest.fn();
const mockWhenDefined = jest.fn().mockResolvedValue(undefined);

global.customElements = {
  define: mockDefine,
  get: mockGet,
  whenDefined: mockWhenDefined,
} as any;

// Ensure the mocks are available on the global object
(global as any).customElements.define = mockDefine;
(global as any).customElements.get = mockGet;
(global as any).customElements.whenDefined = mockWhenDefined;

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});