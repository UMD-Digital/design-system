// Set up mocks before imports
jest.mock('@universityofmaryland/web-styles-library', () => ({
  element: {
    composite: {
      card: {
        overlay: {
          image: {
            tint: {
              className: 'mock-tint-class',
            },
          },
        },
      },
    },
    asset: {
      image: {
        wrapperScaled: {
          className: 'mock-wrapper-class',
        },
      },
    },
  },
  token: {
    spacing: {
      md: '16px',
    },
    media: {
      queries: {
        large: {
          min: 'min-width: 1024px',
        },
      },
    },
    color: {
      white: '#ffffff',
    },
  },
}));

jest.mock('@universityofmaryland/web-elements-library', () => {
  return {
    Composite: {
      card: {
        overlay: {
          image: jest.fn().mockReturnValue({
            element: document.createElement('div'),
            styles: '.mock-style-overlay-card',
          }),
        },
        block: jest.fn().mockReturnValue({
          element: document.createElement('div'),
          styles: '.mock-style-block-card',
        }),
      },
    },
    Utilities: {
      styles: {
        optimizedCss: jest.fn().mockResolvedValue('optimized-css'),
      },
    },
  };
});

jest.mock('elements', () => ({
  layout: {
    gridGap: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-grid-gap',
    }),
    gridOffsetGap: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-grid-offset-gap',
    }),
  },
  asset: {
    standard: jest.fn().mockReturnValue(document.createElement('img')),
  },
  text: {
    headline: jest.fn().mockReturnValue(document.createElement('h2')),
    summary: jest.fn().mockReturnValue(document.createElement('p')),
    date: jest.fn().mockReturnValue(document.createElement('time')),
  },
}));

jest.mock('macros', () => ({
  loader: {
    create: jest.fn().mockReturnValue(document.createElement('div')),
    remove: jest.fn(),
  },
  loaderStyles: '.mock-loader-styles',
  buttonLazyLoad: {
    create: jest.fn().mockReturnValue({
      element: document.createElement('button'),
      styles: '.mock-style-button',
    }),
    remove: jest.fn(),
  },
  ariaLive: {
    create: jest.fn().mockReturnValue(document.createElement('div')),
  },
  noResults: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '.mock-style-no-results',
  }),
}));

jest.mock('../common/fetch', () => ({
  start: jest.fn(),
  load: jest.fn(),
}));

jest.mock('../common/display', () => ({
  ID_GRID_LAYOUT_CONTAINER: 'umd-grid-gap-layout-container',
  setShadowStyles: jest.fn(),
  noResults: jest.fn(),
  resultLoad: jest.fn().mockResolvedValue(undefined),
  resultStart: jest.fn(),
}));

jest.mock('../common/data', () => ({
  lazyLoadVariables: jest.fn(),
  apiVariables: jest.fn(),
  display: jest.fn().mockReturnValue({
    newsId: '123',
    headline: document.createElement('h2'),
    text: document.createElement('p'),
    date: document.createElement('time'),
  }),
}));

import featured from '../featured';
import { Composite } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedFetch from '../common/fetch';
import * as feedDisplay from '../common/display';
import { EntryType } from '../_types';

describe('Featured News Component', () => {
  const mockProps = {
    token: 'test-token',
    isLazyLoad: true,
    isUnion: false,
    numberOfRowsToStart: 2,
  };

  const mockFeedData: EntryType[] = [
    {
      id: 1,
      title: 'Test Article 1',
      url: 'https://example.com/article1',
      date: '2023-01-01',
      dateFormatted: 'January 1, 2023',
      summary: 'This is test article 1',
      image: [{ url: 'https://example.com/image1.jpg', altText: 'Image 1' }],
      categories: [
        { title: 'Category 1', url: 'https://example.com/category1' },
      ],
    },
    {
      id: 2,
      title: 'Test Article 2',
      url: 'https://example.com/article2',
      date: '2023-01-02',
      dateFormatted: 'January 2, 2023',
      summary: 'This is test article 2',
      image: [{ url: 'https://example.com/image2.jpg', altText: 'Image 2' }],
      categories: [
        { title: 'Category 2', url: 'https://example.com/category2' },
      ],
    },
    {
      id: 3,
      title: 'Test Article 3',
      url: 'https://example.com/article3',
      date: '2023-01-03',
      dateFormatted: 'January 3, 2023',
      summary: 'This is test article 3',
      image: [{ url: 'https://example.com/image3.jpg', altText: 'Image 3' }],
      categories: [
        { title: 'Category 3', url: 'https://example.com/category3' },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates a featured component with correct structure', () => {
    const component = featured(mockProps);

    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toContain('.mock-loader-styles');
    expect(component.events).toBeDefined();
    expect(component?.events?.callback).toBeDefined();
    expect(component?.events?.setPosition).toBeDefined();

    expect(feedElements.layout.gridGap).toHaveBeenCalledWith({ count: 2 });
    expect(feedFetch.start).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'test-token',
        isLazyLoad: true,
        isUnion: false,
        numberOfColumnsToShow: 3,
        displayNoResults: feedDisplay.noResults,
      }),
    );
  });

  test('displayGridOffsetResults handles data with 2+ entries', async () => {
    const component = featured(mockProps);

    const displayGridOffsetResults = (feedFetch.start as jest.Mock).mock
      .calls[0][0].displayResultStart;

    await displayGridOffsetResults({
      feedData: mockFeedData,
      setOffset: jest.fn(),
      getOffset: jest.fn().mockReturnValue(0),
    });

    expect(feedElements.layout.gridOffsetGap).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 2,
      }),
    );

    expect(Composite.card.overlay.image).toHaveBeenCalledWith(
      expect.objectContaining({
        newsId: '123',
      }),
    );

    expect(Composite.card.block).toHaveBeenCalledTimes(2);
    expect(feedDisplay.resultLoad).toHaveBeenCalled();
  });

  test('displayGridOffsetResults handles data with less than 2 entries', async () => {
    const component = featured(mockProps);

    const displayGridOffsetResults = (feedFetch.start as jest.Mock).mock
      .calls[0][0].displayResultStart;

    await displayGridOffsetResults({
      feedData: [mockFeedData[0]],
      setOffset: jest.fn(),
      getOffset: jest.fn().mockReturnValue(0),
    });

    expect(feedElements.layout.gridOffsetGap).not.toHaveBeenCalled();
    expect(Composite.card.overlay.image).toHaveBeenCalledWith(
      expect.objectContaining({
        newsId: '123',
      }),
    );

    expect(feedDisplay.resultLoad).toHaveBeenCalled();
  });

  test('displayResults handles showing more results', async () => {
    const component = featured(mockProps);

    const displayResults = (feedFetch.start as jest.Mock).mock.calls[0][0]
      .displayResults;

    await displayResults({ feedData: mockFeedData });

    expect(Composite.card.block).toHaveBeenCalledTimes(3);
    expect(feedDisplay.resultLoad).toHaveBeenCalledWith(
      expect.objectContaining({
        numberOfColumnsToShow: 2,
        entries: expect.any(Array),
      }),
    );
  });

  test('component provides callback method', () => {
    const component = featured(mockProps);
    expect(component?.events?.callback).toBeDefined();
    expect(typeof component?.events?.callback).toBe('function');
  });

  test('setPosition method exists', () => {
    const component = featured(mockProps);
    expect(typeof component?.events?.setPosition).toBe('function');
  });
});
