/**
 * Mock for @universityofmaryland/web-utilities-library/adapters
 */

const toUMDElement = jest.fn().mockReturnValue({
  element: document.createElement('div'),
  styles: '.mock-style-class',
});

const toElementVisual = jest.fn().mockReturnValue({
  element: document.createElement('div'),
  styles: '.mock-style-class',
});

module.exports = {
  toUMDElement,
  toElementVisual,
};
