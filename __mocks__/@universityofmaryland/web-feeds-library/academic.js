/**
 * Mock for @universityofmaryland/web-feeds-library/academic
 */

const mockElementModel = {
  element: document.createElement('div'),
  styles: '.mock-academic-feed { display: block; }',
  events: {
    callback: jest.fn(),
  },
};

const slider = jest.fn().mockReturnValue(mockElementModel);

module.exports = {
  slider,
};
