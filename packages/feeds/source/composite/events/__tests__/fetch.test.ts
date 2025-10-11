import * as feedFetch from '../common/fetch';
import * as dataComposed from '../common/data';
import { fetchGraphQL } from '@universityofmaryland/web-utilities-library/network';
import * as feedMacros from 'macros';

jest.mock('@universityofmaryland/web-utilities-library/network');

const originalConsoleError = console.error;
console.error = jest.fn();

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
    jest.clearAllMocks();

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

    (fetchGraphQL as jest.Mock).mockResolvedValue(createMockFetchResponse());

    jest
      .spyOn(feedMacros.buttonLazyLoad, 'remove')
      .mockImplementation(() => {});
    jest.spyOn(feedMacros.loader, 'display').mockImplementation(() => {});
    jest.spyOn(feedMacros.ariaLive, 'update').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  test('start function fetches event count and updates total entries', async () => {
    jest.spyOn(dataComposed, 'apiVariables').mockReturnValue({
      token: 'test-token',
      limit: 10,
      offset: 0,
    });

    await feedFetch.start(mockProps);

    expect(mockProps.setTotalEntries).toHaveBeenCalled();
  });

  test('load function calls necessary functions and updates display', async () => {
    jest.spyOn(dataComposed, 'apiVariables').mockReturnValue({
      token: 'test-token',
      limit: 10,
      offset: 0,
    });

    await feedFetch.load(mockProps);

    expect(feedMacros.loader.display).toHaveBeenCalled();
    expect(feedMacros.buttonLazyLoad.remove).toHaveBeenCalled();
  });
});
