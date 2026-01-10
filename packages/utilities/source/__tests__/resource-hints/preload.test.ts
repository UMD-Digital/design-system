/**
 * @jest-environment jsdom
 */

import {
  createPreloadLink,
  preloadImage,
  preloadFont,
  preloadStylesheet,
  preloadScript,
  generatePreloadHeader,
  generateLinkHeader,
} from '../../resource-hints/preload';

describe('resource-hints/preload', () => {
  beforeEach(() => {
    // Clear any existing hints
    document.head.querySelectorAll('link[rel]').forEach((el) => el.remove());
  });

  describe('createPreloadLink', () => {
    it('creates a preload link element', () => {
      const result = createPreloadLink({
        href: '/images/hero.jpg',
        as: 'image',
      });

      expect(result).not.toBeNull();
      expect(result!.element.rel).toBe('preload');
      expect(result!.element.as).toBe('image');
    });

    it('sets type when provided', () => {
      const result = createPreloadLink({
        href: '/images/hero.webp',
        as: 'image',
        type: 'image/webp',
      });

      expect(result!.element.type).toBe('image/webp');
    });

    it('sets fetchpriority when provided', () => {
      const result = createPreloadLink({
        href: '/images/hero.jpg',
        as: 'image',
        fetchpriority: 'high',
      });

      expect(result!.element.getAttribute('fetchpriority')).toBe('high');
    });

    it('sets imagesrcset and imagesizes for responsive images', () => {
      const result = createPreloadLink({
        href: '/images/hero-800.jpg',
        as: 'image',
        imagesrcset: '/images/hero-400.jpg 400w, /images/hero-800.jpg 800w',
        imagesizes: '(max-width: 600px) 400px, 800px',
      });

      expect(result!.element.getAttribute('imagesrcset')).toBe(
        '/images/hero-400.jpg 400w, /images/hero-800.jpg 800w',
      );
      expect(result!.element.getAttribute('imagesizes')).toBe(
        '(max-width: 600px) 400px, 800px',
      );
    });

    it('auto-sets crossOrigin for fonts', () => {
      const result = createPreloadLink({
        href: '/fonts/inter.woff2',
        as: 'font',
      });

      expect(result!.element.crossOrigin).toBe('anonymous');
    });

    it('sets media query when provided', () => {
      const result = createPreloadLink({
        href: '/images/mobile.jpg',
        as: 'image',
        media: '(max-width: 768px)',
      });

      expect(result!.element.media).toBe('(max-width: 768px)');
    });

    it('returns null for missing required params', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      const result = createPreloadLink({ href: '', as: 'image' });
      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });

    it('remove function removes the link', () => {
      const result = createPreloadLink({
        href: '/images/hero.jpg',
        as: 'image',
      });
      result!.remove();

      const link = document.head.querySelector('link[rel="preload"]');
      expect(link).toBeNull();
    });
  });

  describe('preloadImage', () => {
    it('preloads image from HTMLImageElement', () => {
      const img = document.createElement('img');
      img.src = 'https://example.com/hero.jpg';

      const result = preloadImage(img);

      expect(result).not.toBeNull();
      expect(result!.element.as).toBe('image');
    });

    it('includes srcset and sizes if present', () => {
      const img = document.createElement('img');
      img.src = 'https://example.com/hero.jpg';
      img.srcset = '/hero-400.jpg 400w, /hero-800.jpg 800w';
      img.sizes = '100vw';

      const result = preloadImage(img);

      expect(result!.element.getAttribute('imagesrcset')).toBe(
        '/hero-400.jpg 400w, /hero-800.jpg 800w',
      );
      expect(result!.element.getAttribute('imagesizes')).toBe('100vw');
    });

    it('sets fetchpriority when provided', () => {
      const img = document.createElement('img');
      img.src = 'https://example.com/hero.jpg';

      const result = preloadImage(img, { fetchpriority: 'high' });

      expect(result!.element.getAttribute('fetchpriority')).toBe('high');
    });

    it('detects image type from extension', () => {
      const img = document.createElement('img');
      img.src = 'https://example.com/hero.webp';

      const result = preloadImage(img);

      expect(result!.element.type).toBe('image/webp');
    });

    it('returns null for image without src', () => {
      const img = document.createElement('img');
      const result = preloadImage(img);
      expect(result).toBeNull();
    });
  });

  describe('preloadFont', () => {
    it('creates preload link for font', () => {
      const result = preloadFont('/fonts/inter.woff2');

      expect(result).not.toBeNull();
      expect(result!.element.as).toBe('font');
      expect(result!.element.crossOrigin).toBe('anonymous');
    });

    it('detects font type from extension', () => {
      const result = preloadFont('/fonts/inter.woff2');
      expect(result!.element.type).toBe('font/woff2');
    });

    it('uses provided type over detection', () => {
      const result = preloadFont('/fonts/custom', 'font/otf');
      expect(result!.element.type).toBe('font/otf');
    });
  });

  describe('preloadStylesheet', () => {
    it('creates preload link for stylesheet', () => {
      const result = preloadStylesheet('/css/critical.css');

      expect(result).not.toBeNull();
      expect(result!.element.as).toBe('style');
    });

    it('sets media query when provided', () => {
      const result = preloadStylesheet('/css/print.css', 'print');
      expect(result!.element.media).toBe('print');
    });
  });

  describe('preloadScript', () => {
    it('creates preload link for script', () => {
      const result = preloadScript('/js/app.js');

      expect(result).not.toBeNull();
      expect(result!.element.as).toBe('script');
    });

    it('sets crossOrigin when provided', () => {
      const result = preloadScript('/js/app.js', { crossOrigin: 'anonymous' });
      expect(result!.element.crossOrigin).toBe('anonymous');
    });
  });

  describe('generatePreloadHeader', () => {
    it('generates Link header for preload', () => {
      const header = generatePreloadHeader({
        href: '/hero.webp',
        as: 'image',
        type: 'image/webp',
      });

      expect(header).toBe('</hero.webp>; rel=preload; as=image; type=image/webp');
    });

    it('includes fetchpriority when provided', () => {
      const header = generatePreloadHeader({
        href: '/hero.jpg',
        as: 'image',
        fetchpriority: 'high',
      });

      expect(header).toContain('fetchpriority=high');
    });
  });

  describe('generateLinkHeader', () => {
    it('combines multiple preload hints', () => {
      const header = generateLinkHeader([
        { href: '/hero.jpg', as: 'image' },
        { href: '/font.woff2', as: 'font' },
      ]);

      expect(header).toContain('</hero.jpg>');
      expect(header).toContain('</font.woff2>');
      expect(header.split(', ')).toHaveLength(2);
    });
  });
});
