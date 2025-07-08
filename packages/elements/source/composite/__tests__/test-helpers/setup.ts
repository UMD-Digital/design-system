/**
 * Setup file for element tests
 * Provides DOM mocking and common test utilities
 */

// Mock HTMLElement methods that jsdom doesn't provide
if (typeof HTMLElement !== 'undefined') {
  // Mock scrollIntoView
  HTMLElement.prototype.scrollIntoView = jest.fn();
  
  // Mock getBoundingClientRect
  HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    top: 0,
    right: 100,
    bottom: 100,
    left: 0,
    toJSON: () => {},
  }));
}

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

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
  setTimeout(callback, 0);
  return 0;
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
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

// Mock the styles library module
jest.mock('@universityofmaryland/web-styles-library', () => ({
  __esModule: true,
  default: {},
  element: {
    composite: {
      card: {
        block: {
          borderDark: { className: 'card-block-border-dark' },
          border: { className: 'card-block-border' },
          person: { className: 'card-block-person' },
          personDark: { className: 'card-block-person-dark' },
          dark: { className: 'card-block-dark' },
          light: { className: 'card-block-light' },
          transparent: { className: 'card-block-transparent' },
        },
      },
    },
    text: {
      decoration: {
        ribbon: { className: ['ribbon-class'] },
      },
      rich: {
        simpleLargest: { className: 'simple-largest' },
        simpleLargeDark: { className: 'simple-large-dark' },
      },
    },
    event: {
      meta: {
        container: { className: 'event-meta-container' },
      },
    },
  },
  token: {
    color: {
      white: '#ffffff',
      black: '#000000',
      red: '#e21833',
      gray: {
        lightest: '#f5f5f5',
        dark: '#333333',
      },
    },
    spacing: {
      min: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px',
      '4xl': '80px',
      '5xl': '96px',
      '6xl': '112px',
    },
    media: {
      queries: {
        tablet: {
          min: 'min-width: 768px',
          max: 'max-width: 1023px',
        },
        desktop: {
          min: 'min-width: 1024px',
        },
        large: {
          max: 'max-width: 1279px',
        },
        highDef: {
          min: 'min-width: 1440px',
        },
      },
    },
  },
}));