import list from '../list';
import { Composite } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedFetch from '../common/fetch';
import * as feedDisplay from '../common/display';
import * as dataComposed from '../common/data';
import { EntryType } from '../_types';

// Mock dependencies
jest.mock('@universityofmaryland/web-elements-library', () => ({
  Composite: {
    card: {
      list: jest.fn().mockReturnValue({
        element: document.createElement('div'),
        styles: '.mock-style-list-card',
      }),
    },
  },
  Utilities: {
    styles: {
      optimizedCss: jest.fn().mockResolvedValue('optimized-css'),
    },
  },
}));

jest.mock('elements', () => ({
  layout: {
    stacked: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-style-stacked',
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
    create: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '.mock-loader-styles'
    }),
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

describe('List News Component', () => {
  const mockProps = {
    token: 'test-token',
    isLazyLoad: true,
    isUnion: false,
    numberOfRowsToStart: 3,
    isThemeDark: false,
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

  test('creates a list component with correct structure', () => {
    const component = list(mockProps);

    expect(component).toBeDefined();
    expect(component.element).toBeInstanceOf(HTMLDivElement);
    expect(component.styles).toContain('.mock-loader-styles');
    expect(component.events).toBeDefined();
    expect(component?.events?.callback).toBeDefined();

    expect(feedFetch.start).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'test-token',
        isLazyLoad: true,
        isUnion: false,
        displayNoResults: feedDisplay.noResults,
        displayResultStart: feedDisplay.resultStart,
      }),
    );
  });

  test('displayResults transforms data correctly', async () => {
    const component = list(mockProps);

    const displayResults = (feedFetch.start as jest.Mock).mock.calls[0][0]
      .displayResults;

    await displayResults({ feedData: mockFeedData });

    expect(dataComposed.display).toHaveBeenCalledWith(
      expect.objectContaining({
        entry: expect.any(Object),
        isThemeDark: mockProps.isThemeDark,
      }),
    );

    expect(feedDisplay.resultLoad).toHaveBeenCalledWith(
      expect.objectContaining({
        entries: expect.any(Array),
      }),
    );
  });

  test('component provides callback method', () => {
    const component = list(mockProps);
    expect(component?.events?.callback).toBeDefined();
    expect(typeof component?.events?.callback).toBe('function');
  });
});
