// Mock for @universityofmaryland/web-elements-library/composite

module.exports = {
  slider: {
    events: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-slider',
      events: {
        load: jest.fn(),
      },
    }),
  },
  card: {
    block: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-block-card',
    }),
    list: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-list-card',
    }),
  },
  carousel: {
    cards: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-carousel-cards',
    }),
    image: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-carousel-image',
    }),
  },
};
