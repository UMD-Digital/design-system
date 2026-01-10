/**
 * @jest-environment jsdom
 */

import {
  createPrefetchLink,
  conditionalPrefetch,
  prefetchUrls,
  conditionalPrefetchUrls,
  prefetchWhenIdle,
  prefetchOnVisible,
} from '../../resource-hints/prefetch';

describe('resource-hints/prefetch', () => {
  beforeEach(() => {
    // Clear any existing hints
    document.head.querySelectorAll('link[rel]').forEach((el) => el.remove());
    // Reset connection mock
    Object.defineProperty(navigator, 'connection', {
      value: undefined,
      configurable: true,
    });
  });

  describe('createPrefetchLink', () => {
    it('creates a prefetch link element', () => {
      const result = createPrefetchLink({ href: '/next-page.html' });

      expect(result).not.toBeNull();
      expect(result!.element.rel).toBe('prefetch');
    });

    it('sets as attribute when provided', () => {
      const result = createPrefetchLink({
        href: '/images/gallery.jpg',
        as: 'image',
      });

      expect(result!.element.as).toBe('image');
    });

    it('appends link to document head', () => {
      createPrefetchLink({ href: '/next-page.html' });

      const link = document.head.querySelector('link[rel="prefetch"]');
      expect(link).not.toBeNull();
    });

    it('remove function removes the link', () => {
      const result = createPrefetchLink({ href: '/next-page.html' });
      result!.remove();

      const link = document.head.querySelector('link[rel="prefetch"]');
      expect(link).toBeNull();
    });

    it('returns null for empty href', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const result = createPrefetchLink({ href: '' });

      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe('conditionalPrefetch', () => {
    it('prefetches on good connection', () => {
      // No connection info means good connection assumed
      const result = conditionalPrefetch({ href: '/next-page.html' });
      expect(result).not.toBeNull();
    });

    it('skips prefetch when data saver is on', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { saveData: true },
        configurable: true,
      });

      const result = conditionalPrefetch({ href: '/next-page.html' });
      expect(result).toBeNull();
    });

    it('skips prefetch on slow connection', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '2g', saveData: false },
        configurable: true,
      });

      const result = conditionalPrefetch({ href: '/next-page.html' });
      expect(result).toBeNull();
    });
  });

  describe('prefetchUrls', () => {
    it('prefetches multiple URLs', () => {
      const results = prefetchUrls(['/page-1.html', '/page-2.html']);

      expect(results).toHaveLength(2);
      expect(results[0]).not.toBeNull();
      expect(results[1]).not.toBeNull();
    });

    it('applies options to all prefetches', () => {
      const results = prefetchUrls(['/image.jpg'], { as: 'image' });

      expect(results[0]!.element.as).toBe('image');
    });
  });

  describe('conditionalPrefetchUrls', () => {
    it('prefetches URLs on good connection', () => {
      const results = conditionalPrefetchUrls(['/page-1.html', '/page-2.html']);
      expect(results).toHaveLength(2);
    });

    it('returns empty array on slow connection', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { saveData: true },
        configurable: true,
      });

      const results = conditionalPrefetchUrls(['/page-1.html', '/page-2.html']);
      expect(results).toHaveLength(0);
    });
  });

  describe('prefetchWhenIdle', () => {
    it('prefetches using requestIdleCallback when available', async () => {
      // Mock requestIdleCallback
      const mockIdleCallback = jest.fn((cb: () => void) => {
        cb();
        return 1;
      });
      (window as any).requestIdleCallback = mockIdleCallback;

      const result = await prefetchWhenIdle({ href: '/next.html' });

      expect(result).not.toBeNull();
      expect(mockIdleCallback).toHaveBeenCalled();
    });

    it('falls back to setTimeout when requestIdleCallback not available', async () => {
      delete (window as any).requestIdleCallback;
      jest.useFakeTimers();

      const promise = prefetchWhenIdle({ href: '/next.html' });
      jest.runAllTimers();
      const result = await promise;

      expect(result).not.toBeNull();
      jest.useRealTimers();
    });
  });

  describe('prefetchOnVisible', () => {
    let mockObserver: jest.Mock;
    let observeCallback: IntersectionObserverCallback;

    beforeEach(() => {
      mockObserver = jest.fn((callback: IntersectionObserverCallback) => {
        observeCallback = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
          unobserve: jest.fn(),
        };
      });
      (window as any).IntersectionObserver = mockObserver;
    });

    it('creates observer for element', () => {
      const element = document.createElement('div');
      prefetchOnVisible(element, { href: '/next.html' });

      expect(mockObserver).toHaveBeenCalled();
    });

    it('prefetches when element becomes visible', () => {
      const element = document.createElement('div');
      prefetchOnVisible(element, { href: '/next.html' });

      // Simulate intersection with full mock entry
      const mockEntry = {
        isIntersecting: true,
        target: element,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 1,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: Date.now(),
      } as IntersectionObserverEntry;

      observeCallback([mockEntry], {} as IntersectionObserver);

      const link = document.head.querySelector('link[rel="prefetch"]');
      expect(link).not.toBeNull();
    });

    it('returns cleanup function', () => {
      const element = document.createElement('div');
      const cleanup = prefetchOnVisible(element, { href: '/next.html' });

      expect(typeof cleanup).toBe('function');
    });

    it('respects connection quality', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { saveData: true },
        configurable: true,
      });

      const element = document.createElement('div');
      prefetchOnVisible(element, { href: '/next.html' });

      // Simulate intersection with full mock entry
      const mockEntry = {
        isIntersecting: true,
        target: element,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 1,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: Date.now(),
      } as IntersectionObserverEntry;

      observeCallback([mockEntry], {} as IntersectionObserver);

      // Should not create link due to saveData
      const link = document.head.querySelector('link[rel="prefetch"]');
      expect(link).toBeNull();
    });
  });
});
