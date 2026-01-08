/**
 * Tests for Events Grid Feed (Factory Pattern)
 *
 * @group feeds/events
 */

import { eventsGrid } from '../../../source/feeds/events/grid';

// Note: All dependencies are mocked via Jest's moduleNameMapper

describe('Events Grid (Factory Pattern)', () => {
  describe('Feed Creation', () => {
    it('should create a grid feed with factory pattern', () => {
      const feed = eventsGrid({
        token: 'test-token',
        numberOfColumnsToShow: 3,
        numberOfRowsToStart: 2,
        isThemeDark: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(feed.styles).toBeDefined();
      expect(typeof feed.styles).toBe('string');
    });

    it('should support dark theme', () => {
      const feed = eventsGrid({
        token: 'test-token',
        numberOfColumnsToShow: 3,
        numberOfRowsToStart: 2,
        isThemeDark: true,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should support lazy loading', () => {
      const feed = eventsGrid({
        token: 'test-token',
        numberOfColumnsToShow: 3,
        numberOfRowsToStart: 2,
        isLazyLoad: true,
      });

      expect(feed).toBeDefined();
      expect(feed.events).toBeDefined();
      expect(feed.events.callback).toBeDefined();
    });

    it('should support categories filter', () => {
      const feed = eventsGrid({
        token: 'test-token',
        numberOfColumnsToShow: 3,
        numberOfRowsToStart: 2,
        categories: ['sports', 'arts'],
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should include loading and layout styles', () => {
      const feed = eventsGrid({
        token: 'test-token',
        numberOfColumnsToShow: 3,
        numberOfRowsToStart: 2,
      });

      // Should include loader animation styles
      expect(feed.styles).toContain('loader-first-animation');
      // Should include styles from layout (ElementBuilder is mocked)
      expect(feed.styles).toContain('mock-styles');
    });
  });

  describe('Props Validation', () => {
    it('should handle minimum required props', () => {
      const feed = eventsGrid({
        token: 'test-token',
        numberOfRowsToStart: 1,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle null token', () => {
      const feed = eventsGrid({
        token: null,
        numberOfRowsToStart: 1,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Factory Pattern Benefits', () => {
    it('should use reusable fetch strategy', () => {
      // The factory pattern allows reusing strategies across feeds
      const feed1 = eventsGrid({
        token: 'token-1',
        numberOfRowsToStart: 2,
      });

      const feed2 = eventsGrid({
        token: 'token-2',
        numberOfRowsToStart: 3,
      });

      expect(feed1).toBeDefined();
      expect(feed2).toBeDefined();
      // Both use the same eventsFetchStrategy
    });

    it('should produce consistent ElementModel structure', () => {
      const feed = eventsGrid({
        token: 'test-token',
        numberOfRowsToStart: 2,
      });

      // Should follow ElementModel pattern
      expect(feed).toHaveProperty('element');
      expect(feed).toHaveProperty('styles');
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(typeof feed.styles).toBe('string');
    });
  });
});
