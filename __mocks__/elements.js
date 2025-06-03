// Legacy mock for basic element creation helpers
// This file provides simplified element creation for tests that don't need full package functionality
// For full package mocks, use webElementsLibrary.js instead

module.exports = {
  // Layout helpers for common grid and stacking patterns
  layout: {
    gridGap: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-grid-gap',
    }),
    gridOffsetGap: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-grid-offset-gap',
    }),
    stacked: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-stacked',
    }),
    grid: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-grid',
    })
  },
  
  // Asset creation for images and media
  asset: {
    standard: jest.fn().mockImplementation((src, alt) => {
      const img = document.createElement('img');
      if (src) img.src = src;
      if (alt) img.alt = alt;
      return img;
    }),
  },
  
  // Text element creation with semantic HTML
  text: {
    headline: jest.fn().mockImplementation((text, level = 2) => {
      const element = document.createElement(`h${level}`);
      if (text) element.textContent = text;
      return element;
    }),
    summary: jest.fn().mockImplementation((text) => {
      const element = document.createElement('p');
      if (text) element.textContent = text;
      return element;
    }),
    date: jest.fn().mockImplementation((dateString) => {
      const element = document.createElement('time');
      if (dateString) {
        element.dateTime = dateString;
        element.textContent = dateString;
      }
      return element;
    }),
  },
};