/**
 * Mock for @universityofmaryland/web-feeds-library/events
 */

const mockElementModel = {
  element: document.createElement('div'),
  styles: '.mock-events-feed { display: block; }',
  events: {
    callback: jest.fn(),
  },
};

const grid = jest.fn().mockReturnValue(mockElementModel);
const list = jest.fn().mockReturnValue(mockElementModel);
const slider = jest.fn().mockReturnValue(mockElementModel);
const grouped = jest.fn().mockReturnValue(mockElementModel);

module.exports = {
  grid,
  list,
  slider,
  grouped,
};
