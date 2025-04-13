module.exports = {
  loader: {
    create: jest.fn().mockReturnValue(document.createElement('div')),
    remove: jest.fn(),
    display: jest.fn(),
  },
  loaderStyles: '.loader',
  buttonLazyLoad: {
    create: jest.fn().mockReturnValue({
      element: document.createElement('button'),
      styles: '.mock-style-button',
    }),
    remove: jest.fn(),
  },
  ariaLive: {
    create: jest.fn().mockReturnValue(document.createElement('div')),
    update: jest.fn(),
  },
  noResults: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '.mock-style-no-results',
  }),
  lazy: {
    create: jest.fn().mockReturnValue({
      element: document.createElement('div'), 
      styles: '.mock-style-lazy',
    }),
    remove: jest.fn(),
  },
  lazyLoad: {
    create: jest.fn().mockImplementation(({ isLazyLoad }) => {
      if (!isLazyLoad) return undefined;
      return {
        element: document.createElement('div'),
        styles: '.aligned-center .outline-button',
      };
    }),
    remove: jest.fn(),
  },
  slider: jest.fn().mockImplementation(() => ({
    element: document.createElement('div'),
    styles: '.mock-slider-styles',
    events: {
      load: jest.fn(),
      callback: jest.fn(),
    },
  })),
};