module.exports = {
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
  asset: {
    standard: jest.fn().mockReturnValue(document.createElement('img')),
  },
  text: {
    headline: jest.fn().mockReturnValue(document.createElement('h2')),
    summary: jest.fn().mockReturnValue(document.createElement('p')),
    date: jest.fn().mockReturnValue(document.createElement('time')),
  },
};