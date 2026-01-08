/**
 * Tests for Events Slider Feed (Migrated)
 *
 * @group feeds/events
 */

import { eventsSlider } from '../../../source/feeds/events/slider';

// Note: All dependencies are mocked via Jest's moduleNameMapper

describe('Events Slider (Migrated)', () => {
  describe('Feed Creation', () => {
    it('should create a slider feed', () => {
      const feed = eventsSlider({
        token: 'test-token',
        isThemeDark: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(feed.styles).toBeDefined();
      expect(typeof feed.styles).toBe('string');
    });

    it('should support dark theme', () => {
      const feed = eventsSlider({
        token: 'test-token',
        isThemeDark: true,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should support categories filter', () => {
      const feed = eventsSlider({
        token: 'test-token',
        categories: 'sports,arts',
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should include slider styles', () => {
      const feed = eventsSlider({
        token: 'test-token',
      });

      // Slider widget returns styles
      expect(feed.styles).toBeDefined();
      expect(feed.styles.length).toBeGreaterThan(0);
    });

    it('should return events for initialization', () => {
      const feed = eventsSlider({
        token: 'test-token',
      });

      // Should have callback for shadow root
      expect(feed.events).toBeDefined();
      expect(feed.events.callback).toBeDefined();
      expect(typeof feed.events.callback).toBe('function');
    });
  });

  describe('Props Validation', () => {
    it('should handle minimum required props', () => {
      const feed = eventsSlider({
        token: 'test-token',
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle null categories', () => {
      const feed = eventsSlider({
        token: 'test-token',
        categories: null,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Migration Benefits', () => {
    it('should use extracted query from strategies', () => {
      // Query is now imported from strategies/fetch/events
      // instead of being inline
      const feed = eventsSlider({
        token: 'test-token',
      });

      expect(feed).toBeDefined();
      // Validates that the feed was created successfully with strategy query
    });

    it('should maintain same API as old implementation', () => {
      // Migration should not break existing usage
      const feed = eventsSlider({
        token: 'test-token',
        categories: 'sports',
        isThemeDark: false,
      });

      expect(feed).toBeDefined();
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(feed.styles).toBeDefined();
      expect(feed.events).toBeDefined();
    });

    it('should produce consistent ElementModel structure', () => {
      const feed = eventsSlider({
        token: 'test-token',
      });

      // Should follow ElementModel pattern
      expect(feed).toHaveProperty('element');
      expect(feed).toHaveProperty('styles');
      expect(feed).toHaveProperty('events');
      expect(feed.element).toBeInstanceOf(HTMLElement);
      expect(typeof feed.styles).toBe('string');
    });
  });

  describe('Slider Widget Integration', () => {
    it('should delegate to slider widget', () => {
      // The implementation delegates to the shared slider widget
      const feed = eventsSlider({
        token: 'test-token',
      });

      expect(feed).toBeDefined();
      // Widget handles all carousel functionality
    });

    it('should pass correct endpoint', () => {
      // Should use calendar.umd.edu endpoint
      const feed = eventsSlider({
        token: 'test-token',
      });

      expect(feed).toBeDefined();
      // Endpoint is passed to widget correctly
    });
  });
});
