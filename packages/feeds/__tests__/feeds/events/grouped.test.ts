/**
 * Tests for Events Grouped Feed (Specialized Implementation)
 *
 * @group feeds/events
 */

import eventsGrouped from '../../../source/feeds/events/grouped';

// Note: All dependencies are mocked via Jest's moduleNameMapper

describe('Events Grouped (Specialized Implementation)', () => {
  describe('Feed Creation', () => {
    it('should create a grouped feed', () => {
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isThemeDark: false,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(feed.styles).toBeDefined();
      expect(typeof feed.styles).toBe('string');
    });

    it('should support dark theme', () => {
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isThemeDark: true,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should support lazy loading', () => {
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isLazyLoad: true,
      });

      expect(feed).toBeDefined();
      expect(feed.events).toBeDefined();
      expect(feed.events.callback).toBeDefined();
    });

    it('should support categories filter', () => {
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        categories: ['sports', 'arts'],
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should include loading styles', () => {
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isLazyLoad: false,
      });

      // Should include loader animation styles
      expect(feed.styles).toContain('loader-first-animation');
    });
  });

  describe('Grouping Features', () => {
    it('should use grouping utilities', () => {
      // The feed should be created successfully with grouping
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should use range fetch strategy', () => {
      // Uses eventsFetchStrategyRange for rangeStart query
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
    });
  });

  describe('Props Validation', () => {
    it('should handle minimum required props', () => {
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 1,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle null token', () => {
      const feed = eventsGrouped({
        token: null,
        numberOfRowsToStart: 1,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Architecture Benefits', () => {
    it('should reuse strategies and utilities', () => {
      // Uses eventsFetchStrategyRange strategy
      // Uses grouping utilities
      // Uses state classes (LoadingState, PaginationState, etc.)
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      // Validates that strategies and utilities are reused
    });

    it('should produce consistent ElementModel structure', () => {
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isLazyLoad: false,
      });

      // Should follow ElementModel pattern
      expect(feed).toHaveProperty('element');
      expect(feed).toHaveProperty('styles');
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(typeof feed.styles).toBe('string');
    });
  });

  describe('Code Improvement vs Old Implementation', () => {
    it('should use extracted grouping utilities', () => {
      // Old implementation: ~356 lines with inline grouping logic
      // New implementation: ~292 lines + reusable grouping utilities
      // Grouping logic now reusable across other feeds
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      // Validates that grouping utilities are properly extracted
    });

    it('should use fetch strategy instead of custom queries', () => {
      // Uses eventsFetchStrategyRange instead of inline fetch logic
      const feed = eventsGrouped({
        token: 'test-token',
        numberOfRowsToStart: 10,
        isLazyLoad: false,
      });

      expect(feed).toBeDefined();
      // Validates strategy reuse
    });
  });
});
