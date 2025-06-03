// Mock for @universityofmaryland/web-feeds-library
module.exports = {
  CreateEventsGrid: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '',
  }),
  CreateEventsList: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '',
  }),
  CreateNewsGrid: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '',
  }),
  CreateNewsList: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '',
  }),
  CreateNewsFeatured: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '',
  }),
  CreateEventsSlider: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '',
  }),
};