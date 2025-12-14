// Mock for @universityofmaryland/web-elements-library/layout

module.exports = {
  grid: jest.fn().mockImplementation(({ columns = 2 } = {}) => ({
    element: document.createElement('div'),
    styles: `.mock-style-grid { display: grid; grid-template-columns: repeat(${columns}, 1fr); }`,
  })),
  gridGap: jest.fn().mockImplementation(({ columns = 2 } = {}) => ({
    element: document.createElement('div'),
    styles: `.mock-style-grid-gap { display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 1rem; }`,
  })),
  gridOffset: jest.fn().mockImplementation(({ columns = 2, isLayoutReversed = false, stickyTopPosition } = {}) => ({
    element: document.createElement('div'),
    styles: `.mock-style-grid-offset { display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 1rem; }`,
  })),
  stacked: jest.fn().mockImplementation(({ isThemeDark = false, showDividers = true } = {}) => ({
    element: document.createElement('div'),
    styles: `.mock-style-stacked { display: flex; flex-direction: column; gap: 1rem; }`,
  })),
};
