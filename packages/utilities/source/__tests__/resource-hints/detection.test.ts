/**
 * @jest-environment jsdom
 */

import {
  isBrowser,
  getOriginFromUrl,
  isSameOrigin,
  hasGoodConnection,
  prefersReducedData,
  detectExternalOrigins,
  hintExists,
} from '../../resource-hints/detection';

describe('resource-hints/detection', () => {
  describe('isBrowser', () => {
    it('returns true in jsdom environment', () => {
      expect(isBrowser()).toBe(true);
    });
  });

  describe('getOriginFromUrl', () => {
    it('extracts origin from absolute URL', () => {
      expect(getOriginFromUrl('https://cdn.example.com/images/hero.jpg')).toBe(
        'https://cdn.example.com',
      );
    });

    it('extracts origin from URL with port', () => {
      expect(getOriginFromUrl('https://cdn.example.com:8080/path')).toBe(
        'https://cdn.example.com:8080',
      );
    });

    it('handles protocol-relative URLs', () => {
      expect(getOriginFromUrl('//cdn.example.com/image.jpg')).toBe(
        'https://cdn.example.com',
      );
    });

    it('returns null for relative URLs', () => {
      expect(getOriginFromUrl('/images/hero.jpg')).toBe(null);
      expect(getOriginFromUrl('images/hero.jpg')).toBe(null);
    });

    it('returns null for empty input', () => {
      expect(getOriginFromUrl('')).toBe(null);
    });

    it('returns null for invalid URLs', () => {
      expect(getOriginFromUrl('not a url')).toBe(null);
    });
  });

  describe('isSameOrigin', () => {
    beforeEach(() => {
      // jsdom sets origin to about:blank by default, mock it
      Object.defineProperty(window, 'location', {
        value: { origin: 'https://example.com' },
        writable: true,
      });
    });

    it('returns true for same origin', () => {
      expect(isSameOrigin('https://example.com/page')).toBe(true);
    });

    it('returns false for different origin', () => {
      expect(isSameOrigin('https://cdn.example.com/image.jpg')).toBe(false);
    });

    it('returns true for relative URLs', () => {
      expect(isSameOrigin('/images/hero.jpg')).toBe(true);
    });

    it('returns true for empty input', () => {
      expect(isSameOrigin('')).toBe(true);
    });
  });

  describe('hasGoodConnection', () => {
    it('returns true when Network Information API is not available', () => {
      expect(hasGoodConnection()).toBe(true);
    });

    it('returns false when saveData is true', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { saveData: true },
        configurable: true,
      });
      expect(hasGoodConnection()).toBe(false);
    });

    it('returns false for slow-2g connection', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: 'slow-2g', saveData: false },
        configurable: true,
      });
      expect(hasGoodConnection()).toBe(false);
    });

    it('returns false for 2g connection', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '2g', saveData: false },
        configurable: true,
      });
      expect(hasGoodConnection()).toBe(false);
    });

    it('returns true for 4g connection', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { effectiveType: '4g', saveData: false },
        configurable: true,
      });
      expect(hasGoodConnection()).toBe(true);
    });

    it('returns false for high RTT', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { rtt: 600, saveData: false },
        configurable: true,
      });
      expect(hasGoodConnection()).toBe(false);
    });
  });

  describe('prefersReducedData', () => {
    it('returns false when Network Information API is not available', () => {
      Object.defineProperty(navigator, 'connection', {
        value: undefined,
        configurable: true,
      });
      expect(prefersReducedData()).toBe(false);
    });

    it('returns true when saveData is enabled', () => {
      Object.defineProperty(navigator, 'connection', {
        value: { saveData: true },
        configurable: true,
      });
      expect(prefersReducedData()).toBe(true);
    });
  });

  describe('detectExternalOrigins', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { origin: 'https://example.com' },
        writable: true,
      });
    });

    it('returns empty array for empty container', () => {
      const container = document.createElement('div');
      expect(detectExternalOrigins(container)).toEqual([]);
    });

    it('detects external image origins', () => {
      const container = document.createElement('div');
      const img = document.createElement('img');
      img.src = 'https://cdn.example.com/image.jpg';
      container.appendChild(img);

      const origins = detectExternalOrigins(container);
      expect(origins).toContain('https://cdn.example.com');
    });

    it('ignores same-origin images', () => {
      const container = document.createElement('div');
      const img = document.createElement('img');
      img.src = 'https://example.com/image.jpg';
      container.appendChild(img);

      const origins = detectExternalOrigins(container);
      expect(origins).toEqual([]);
    });

    it('deduplicates origins', () => {
      const container = document.createElement('div');
      const img1 = document.createElement('img');
      const img2 = document.createElement('img');
      img1.src = 'https://cdn.example.com/image1.jpg';
      img2.src = 'https://cdn.example.com/image2.jpg';
      container.appendChild(img1);
      container.appendChild(img2);

      const origins = detectExternalOrigins(container);
      expect(origins).toHaveLength(1);
      expect(origins).toContain('https://cdn.example.com');
    });
  });

  describe('hintExists', () => {
    beforeEach(() => {
      // Clear any existing hints
      document.head.querySelectorAll('link[rel]').forEach((el) => el.remove());
    });

    it('returns false when hint does not exist', () => {
      expect(hintExists('preload', '/test.jpg')).toBe(false);
    });

    it('returns true when hint exists', () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/test.jpg';
      document.head.appendChild(link);

      expect(hintExists('preload', '/test.jpg')).toBe(true);
    });
  });
});
