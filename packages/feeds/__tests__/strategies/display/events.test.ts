/**
 * Tests for Events Display Strategy
 *
 * @group strategies
 */

import { eventsDisplayStrategy, EventType } from '../../../source/strategies/display/events';

describe('eventsDisplayStrategy', () => {
  const mockEvent: EventType = {
    id: 1,
    title: 'Test Event',
    url: 'https://example.com/event',
    summary: 'This is a test event summary',
    image: [{ url: 'https://example.com/image.jpg', altText: 'Test Image' }],
    startMonth: 'Dec',
    startDay: '15',
    endMonth: 'Dec',
    endDay: '16',
    startStamp: '2024-12-15',
  };

  describe('Configuration', () => {
    it('should have correct layout type', () => {
      expect(eventsDisplayStrategy.layoutType).toBe('grid');
    });

    it('should have mapEntryToCard function', () => {
      expect(typeof eventsDisplayStrategy.mapEntryToCard).toBe('function');
    });
  });

  describe('mapEntryToCard', () => {
    it('should create card element', () => {
      const result = eventsDisplayStrategy.mapEntryToCard(mockEvent, {});

      expect(result).toHaveProperty('element');
      expect(result).toHaveProperty('styles');
      expect(result.element).toBeInstanceOf(HTMLElement);
      expect(typeof result.styles).toBe('string');
    });

    it('should create card with dark theme', () => {
      const result = eventsDisplayStrategy.mapEntryToCard(mockEvent, {
        isThemeDark: true,
      });

      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should create card with image config', () => {
      const imageConfig = jest.fn().mockReturnValue({
        imageUrl: 'test.jpg',
        altText: 'Test',
        linkUrl: 'https://example.com',
      });

      const result = eventsDisplayStrategy.mapEntryToCard(mockEvent, {
        imageConfig,
      });

      expect(imageConfig).toHaveBeenCalledWith(mockEvent);
      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should create list card when cardType is list', () => {
      const result = eventsDisplayStrategy.mapEntryToCard(mockEvent, {
        cardType: 'list',
      });

      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should create block card by default', () => {
      const result = eventsDisplayStrategy.mapEntryToCard(mockEvent, {});

      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle transparent option', () => {
      const result = eventsDisplayStrategy.mapEntryToCard(mockEvent, {
        isTransparent: true,
      });

      expect(result.element).toBeInstanceOf(HTMLElement);
    });

    it('should handle aligned option', () => {
      const result = eventsDisplayStrategy.mapEntryToCard(mockEvent, {
        isAligned: true,
      });

      expect(result.element).toBeInstanceOf(HTMLElement);
    });
  });
});
