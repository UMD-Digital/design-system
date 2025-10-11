// Mock for @universityofmaryland/web-elements-library/atomic

module.exports = {
  events: {
    sign: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-sign',
    }),
    meta: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-events-meta',
    }),
  },
  textLockup: {
    date: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-textlockup-date',
    }),
    title: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-textlockup-title',
    }),
  },
  actions: {
    primary: jest.fn().mockReturnValue({
      element: document.createElement('button'),
      styles: '.mock-style-action-primary',
    }),
    secondary: jest.fn().mockReturnValue({
      element: document.createElement('button'),
      styles: '.mock-style-action-secondary',
    }),
  },
  assets: {
    image: jest.fn().mockReturnValue({
      element: document.createElement('img'),
      styles: '.mock-style-image',
    }),
    icon: jest.fn().mockReturnValue({
      element: document.createElement('span'),
      styles: '.mock-style-icon',
    }),
  },
};
