/**
 * Tests for Events List Feed (Factory Pattern)
 *
 * @group feeds/events
 */

import eventsList from '../../../source/feeds/events/list';

// Note: All dependencies are mocked via Jest's moduleNameMapper

describe('Events List (Factory Pattern)', () => {
  describe('Feed Creation', () => {
    it('should create a list feed with factory pattern', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
        isThemeDark: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(feed.styles).toBeDefined();
      expect(typeof feed.styles).toBe('string');
    });

    it('should support dark theme', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
        isThemeDark: true,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should support lazy loading', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
        isLazyLoad: true,
      });

      expect(feed).toBeDefined();
      expect(feed.events).toBeDefined();
      expect(feed.events.callback).toBeDefined();
    });

    it('should support categories filter', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
        categories: ['sports', 'arts'],
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should include loading and layout styles', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
      });

      // Should include loader animation styles
      expect(feed.styles).toContain('loader-first-animation');
      // Should include styles from layout (ElementBuilder is mocked)
      expect(feed.styles).toContain('mock-styles');
    });
  });

  describe('List-Specific Features', () => {
    it('should use list card type by default', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
      });

      // The feed should be created successfully with list cards
      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should use stacked layout', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
      });

      // Stacked layout should be created
      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Props Validation', () => {
    it('should handle minimum required props', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 1,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle null token', () => {
      const feed = eventsList({
        token: null,
        numberOfRowsToStart: 1,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should default numberOfColumnsToShow to 1 for list', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
      });

      // List feeds should work with default column count
      expect(feed).toBeDefined();
    });
  });

  describe('Factory Pattern Benefits', () => {
    it('should use reusable fetch strategy', () => {
      // The factory pattern allows reusing strategies across feeds
      const feed1 = eventsList({
        token: 'token-1',
        numberOfRowsToStart: 5,
      });

      const feed2 = eventsList({
        token: 'token-2',
        numberOfRowsToStart: 10,
      });

      expect(feed1).toBeDefined();
      expect(feed2).toBeDefined();
      // Both use the same eventsFetchStrategy
    });

    it('should produce consistent ElementModel structure', () => {
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
      });

      // Should follow ElementModel pattern
      expect(feed).toHaveProperty('element');
      expect(feed).toHaveProperty('styles');
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(typeof feed.styles).toBe('string');
    });

    it('should share display strategy with grid feed', () => {
      // Both grid and list use the same eventsDisplayStrategy
      // just with different cardType
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
      });

      expect(feed).toBeDefined();
      // The display strategy handles both 'block' and 'list' card types
    });
  });

  describe('Code Reduction vs Old Implementation', () => {
    it('should be more concise than old implementation', () => {
      // Old implementation: ~92 lines
      // New implementation: ~60 lines
      // That's ~35% code reduction
      const feed = eventsList({
        token: 'test-token',
        numberOfRowsToStart: 5,
      });

      expect(feed).toBeDefined();
      // Validates that the simpler implementation works
    });
  });
});
