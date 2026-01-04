/**
 * Mock for @universityofmaryland/web-feeds-library/news
 */

const mockElementModel = {
  element: document.createElement('div'),
  styles: '.mock-news-feed { display: block; }',
  events: {
    callback: jest.fn(),
  },
};

const grid = jest.fn().mockReturnValue(mockElementModel);
const list = jest.fn().mockReturnValue(mockElementModel);
const featured = jest.fn().mockReturnValue(mockElementModel);

module.exports = {
  grid,
  list,
  featured,
};
