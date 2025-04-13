import * as feedFetch from '../common/fetch';
import * as dataComposed from '../common/data';
import { Utilities } from '@universityofmaryland/web-elements-library';
import * as feedMacros from 'macros';

// Mock console.error
const originalConsoleError = console.error;
console.error = jest.fn();

// Create mockFetchImplementation to allow different responses
const createMockFetchResponse = (overrides = {}) => {
  return {
    data: {
      entries: {
        events: [
          {
            id: 1,
            title: 'UMD Spring Concert',
            url: 'https://example.com/event1',
            startDayOfWeek: 'Friday',
            startStamp: '2023-05-15T18:00:00',
            startMonth: 'May',
            startDay: '15',
            startTime: '6:00 PM',
            endDayOfWeek: 'Friday',
            endMonth: 'May',
            endDay: '15',
            endTime: '9:00 PM',
            allDay: false,
            summary: 'Annual spring concert featuring university performers.',
            image: [
              {
                url: 'https://example.com/image1.jpg',
                altText: 'UMD Spring Concert',
              },
            ],
            location: [
              {
                title: 'Clarice Smith Performing Arts Center',
              },
            ],
          },
        ],
      },
      count: {
        events: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
      ...overrides,
    },
  };
};

describe('Events Fetch Utilities', () => {
  // Setup mock data
  const mockEventData = [
    {
      id: 1,
      title: 'UMD Spring Concert',
      url: 'https://example.com/event1',
      startDayOfWeek: 'Friday',
      startStamp: '2023-05-15T18:00:00',
      startMonth: 'May',
      startDay: '15',
      startTime: '6:00 PM',
      endDayOfWeek: 'Friday',
      endMonth: 'May',
      endDay: '15',
      endTime: '9:00 PM',
      allDay: false,
      summary: 'Annual spring concert',
      image: [{ url: 'image.jpg', altText: 'Concert' }],
      location: [{ title: 'Campus' }],
    },
  ];

  // Helper functions for tests
  const mockProps = {
    token: 'test-token',
    numberOfRowsToStart: 3,
    isLazyLoad: false,
    isUnion: false,
    getContainer: jest.fn().mockReturnValue(document.createElement('div')),
    getOffset: jest.fn().mockReturnValue(0),
    getTotalEntries: jest.fn().mockReturnValue(3),
    getStyles: jest.fn().mockReturnValue(''),
    getShadowRoot: jest.fn().mockReturnValue(null),
    setTotalEntries: jest.fn(),
    setOffset: jest.fn(),
    setStyles: jest.fn(),
    displayResults: jest.fn(),
    displayResultStart: jest.fn(),
    displayNoResults: jest.fn(),
    layoutElement: {
      element: document.createElement('div'),
      styles: '',
    },
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mocks for data module
    jest.mock('../common/data', () => ({
      display: jest.fn().mockReturnValue({
        title: 'Mocked Event Title',
        description: 'Mocked Event Description',
        url: 'https://example.com/mocked-event',
      }),
      apiVariables: jest.fn().mockReturnValue({
        token: 'test-token',
        limit: 10,
        offset: 0,
        related: [],
      }),
    }));

    // Setup network mock with default response
    jest
      .spyOn(Utilities.network, 'FetchGraphQL')
      .mockImplementation(async () => createMockFetchResponse());

    // Setup macros mocks
    jest
      .spyOn(feedMacros.buttonLazyLoad, 'remove')
      .mockImplementation(() => {});
    jest.spyOn(feedMacros.loader, 'display').mockImplementation(() => {});
    jest.spyOn(feedMacros.ariaLive, 'update').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore original console.error
    console.error = originalConsoleError;
  });

  test('start function fetches event count and updates total entries', async () => {
    // Setup apiVariables mock
    jest.spyOn(dataComposed, 'apiVariables').mockReturnValue({
      token: 'test-token',
      limit: 10,
      offset: 0,
    });

    // Call the function
    await feedFetch.start(mockProps);

    // Verify count was fetched and total entries set
    expect(mockProps.setTotalEntries).toHaveBeenCalled();
  });

  test('load function calls necessary functions and updates display', async () => {
    // Setup mock implementations
    jest.spyOn(dataComposed, 'apiVariables').mockReturnValue({
      token: 'test-token',
      limit: 10,
      offset: 0,
    });

    // Call the function
    await feedFetch.load(mockProps);

    // Verify the loader was displayed
    expect(feedMacros.loader.display).toHaveBeenCalled();

    // Verify lazy load button was removed
    expect(feedMacros.buttonLazyLoad.remove).toHaveBeenCalled();
  });
});
