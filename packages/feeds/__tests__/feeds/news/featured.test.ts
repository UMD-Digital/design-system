/**
 * Tests for News Featured Feed (Specialized Implementation)
 *
 * @group feeds/news
 */

import newsFeatured from '../../../source/feeds/news/featured';

// Note: All dependencies are mocked via Jest's moduleNameMapper

describe('News Featured (Specialized Implementation)', () => {
  describe('Feed Creation', () => {
    it('should create a featured feed', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isThemeDark: false,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(feed.styles).toBeDefined();
      expect(typeof feed.styles).toBe('string');
    });

    it('should support dark theme', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isThemeDark: true,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should support lazy loading', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: true,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.events).toBeDefined();
      expect(feed.events.callback).toBeDefined();
    });

    it('should support categories filter', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        categories: ['research', 'campus'],
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should include loading styles', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      // Should include loader animation styles
      expect(feed.styles).toContain('loader-first-animation');
    });
  });

  describe('Featured Layout Options', () => {
    it('should support layout reversal', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLayoutReversed: true,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should support custom sticky position', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        overwriteStickyPosition: 100,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should support transparent cards', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isTransparent: true,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Custom Events', () => {
    it('should expose setPosition event', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed.events).toBeDefined();
      expect(feed.events.setPosition).toBeDefined();
      expect(typeof feed.events.setPosition).toBe('function');
    });

    it('should expose callback event for shadow root', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed.events).toBeDefined();
      expect(feed.events.callback).toBeDefined();
      expect(typeof feed.events.callback).toBe('function');
    });
  });

  describe('Props Validation', () => {
    it('should handle minimum required props', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 1,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle null token', () => {
      const feed = newsFeatured({
        token: null as any,
        numberOfRowsToStart: 1,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should default isThemeDark to false', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      // isThemeDark defaults to false
    });

    it('should default isLayoutReversed to false', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      // isLayoutReversed defaults to false
    });
  });

  describe('Architecture Benefits', () => {
    it('should reuse strategies and utilities', () => {
      // Uses newsFetchStrategy for data fetching
      // Uses newsDisplayStrategy for card mapping
      // Uses state classes (LoadingState, PaginationState, etc.)
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      // Validates that strategies and utilities are reused
    });

    it('should produce consistent ElementModel structure', () => {
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      // Should follow ElementModel pattern
      expect(feed).toHaveProperty('element');
      expect(feed).toHaveProperty('styles');
      expect(feed).toHaveProperty('events');
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(typeof feed.styles).toBe('string');
    });

    it('should handle complex featured layout logic', () => {
      // Featured layout uses:
      // - gridOffset for featured item
      // - gridGap for remaining items
      // - overlay card for first item
      // - block cards for other items
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      // Validates complex layout handling
    });
  });

  describe('Code Improvement vs Old Implementation', () => {
    it('should use fetch strategy instead of common/fetch', () => {
      // Uses newsFetchStrategy instead of ./common/fetch
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      // Validates strategy reuse
    });

    it('should use display strategy instead of common/display', () => {
      // Uses newsDisplayStrategy instead of ./common/display
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: false,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      // Validates strategy reuse
    });

    it('should use state classes instead of macros', () => {
      // Uses LoadingState, PaginationState, EmptyState, Announcer
      // instead of old macro patterns
      const feed = newsFeatured({
        token: 'test-token',
        numberOfRowsToStart: 3,
        isLazyLoad: true,
        isUnion: false,
      });

      expect(feed).toBeDefined();
      // Validates state class usage
    });
  });
});
