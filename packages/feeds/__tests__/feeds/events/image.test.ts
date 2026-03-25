import { createEventImageConfig } from '../../../source/feeds/events/image';
import { EVENTS_QUERY, EVENTS_SLIDER_QUERY } from '../../../source/strategies/fetch/events';

describe('event image config', () => {
  it('uses the alt field for event image alt text', () => {
    expect(
      createEventImageConfig({
        url: 'https://example.com/event',
        image: [{ url: 'https://example.com/image.jpg', alt: 'Event alt text' }],
      } as any),
    ).toEqual({
      imageUrl: 'https://example.com/image.jpg',
      altText: 'Event alt text',
      linkUrl: 'https://example.com/event',
      linkLabel: 'University of Maryland Event',
    });
  });

  it('returns null when only legacy altText is available', () => {
    expect(
      createEventImageConfig({
        url: 'https://example.com/event',
        image: [{ url: 'https://example.com/image.jpg', altText: 'Legacy alt text' }],
      } as any),
    ).toBeNull();
  });

  it('returns null when no image alt text is available', () => {
    expect(
      createEventImageConfig({
        url: 'https://example.com/event',
        image: [{ url: 'https://example.com/image.jpg' }],
      } as any),
    ).toBeNull();
  });

  it('queries the alt field for events images', () => {
    expect(EVENTS_QUERY).toContain('alt');
    expect(EVENTS_QUERY).not.toContain('commonPlainTextTwo');
  });

  it('queries the alt field for slider event images', () => {
    expect(EVENTS_SLIDER_QUERY).toContain('alt');
    expect(EVENTS_SLIDER_QUERY).not.toContain('commonPlainTextTwo');
  });
});
