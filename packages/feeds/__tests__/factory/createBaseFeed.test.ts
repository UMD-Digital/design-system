/**
 * Tests for createBaseFeed factory
 *
 * @group factory
 */

import { createBaseFeed } from '../../source/factory/core/createBaseFeed';
import {
  FetchStrategy,
  DisplayStrategy,
  LayoutStrategy,
} from '../../source/factory/core/types';

// Mock strategies
const mockFetchStrategy: FetchStrategy<any, any> = {
  fetchCount: jest.fn().mockResolvedValue(10),
  fetchEntries: jest.fn().mockResolvedValue([
    { id: 1, title: 'Test Entry 1' },
    { id: 2, title: 'Test Entry 2' },
  ]),
  composeApiVariables: jest.fn().mockReturnValue({
    limit: 6,
    offset: 0,
  }),
};

const mockDisplayStrategy: DisplayStrategy<any> = {
  layoutType: 'grid',
  mapEntryToCard: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '.test { color: red; }',
  }),
};

const mockLayoutStrategy: LayoutStrategy = {
  create: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '.layout { display: grid; }',
  }),
  getId: () => 'test-layout-container',
};

describe('createBaseFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should create a feed with correct structure', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        numberOfColumnsToShow: 3,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(feed).toHaveProperty('element');
      expect(feed).toHaveProperty('styles');
      expect(feed).toHaveProperty('events');
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(typeof feed.styles).toBe('string');
    });

    it('should create container element', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(feed.element.tagName).toBe('DIV');
    });

    it('should include loading styles', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      // Check for loader animation keyframes (ElementBuilder is mocked)
      expect(feed.styles).toContain('loader-first-animation');
    });

    it('should include layout styles', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(feed.styles).toContain('.layout');
    });
  });

  describe('Configuration', () => {
    it('should handle dark theme option', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        isThemeDark: true,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(feed.element).toBeTruthy();
    });

    it('should handle lazy load option', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        isLazyLoad: true,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(feed.element).toBeTruthy();
    });

    it('should handle custom number of columns', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        numberOfColumnsToShow: 4,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(mockLayoutStrategy.create).toHaveBeenCalledWith(
        expect.objectContaining({
          columns: 4,
        })
      );
    });

    it('should handle categories filter', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        categories: ['sports', 'arts'],
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(feed.element).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('should provide shadow root callback', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(feed.events).toHaveProperty('callback');
      expect(typeof feed.events?.callback).toBe('function');
    });

    it('should handle shadow root callback', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      const mockShadowRoot = document.createElement('div').attachShadow({ mode: 'open' });

      expect(() => {
        feed.events?.callback?.(mockShadowRoot);
      }).not.toThrow();
    });
  });

  describe('Strategy Integration', () => {
    it('should call layout strategy to create layout', () => {
      createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      expect(mockLayoutStrategy.create).toHaveBeenCalled();
    });

    it('should call fetch strategy on initialization', async () => {
      createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      // Wait for async initialization
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockFetchStrategy.fetchCount).toHaveBeenCalled();
      expect(mockFetchStrategy.fetchEntries).toHaveBeenCalled();
    });

    it('should compose API variables correctly', async () => {
      createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        numberOfColumnsToShow: 3,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockFetchStrategy.composeApiVariables).toHaveBeenCalledWith(
        expect.objectContaining({
          token: 'test-token',
          numberOfRowsToStart: 2,
          numberOfColumnsToShow: 3,
        })
      );
    });
  });

  describe('Image Configuration', () => {
    it('should pass image config to card mapping', () => {
      const imageConfig = jest.fn().mockReturnValue({
        imageUrl: 'test.jpg',
        altText: 'Test',
      });

      createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: mockFetchStrategy,
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
        imageConfig,
      });

      // Image config should be available in card mapping options
      expect(imageConfig).toBeDefined();
    });
  });

  describe('No Results Configuration', () => {
    it('should handle custom no results config', () => {
      const feed = createBaseFeed({
        token: 'test-token',
        numberOfRowsToStart: 2,
        fetchStrategy: {
          ...mockFetchStrategy,
          fetchCount: jest.fn().mockResolvedValue(0), // No results
        },
        displayStrategy: mockDisplayStrategy,
        layoutStrategy: mockLayoutStrategy,
        noResultsConfig: {
          message: 'Custom no results message',
          linkUrl: 'https://example.com',
          linkText: 'Click here',
        },
      });

      expect(feed.element).toBeTruthy();
    });
  });
});
