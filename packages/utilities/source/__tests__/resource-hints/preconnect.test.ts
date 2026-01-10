/**
 * @jest-environment jsdom
 */

import {
  createPreconnectLink,
  createDnsPrefetchLink,
  preconnectWithFallback,
  preconnectToOrigins,
} from '../../resource-hints/preconnect';

describe('resource-hints/preconnect', () => {
  beforeEach(() => {
    // Clear any existing hints
    document.head.querySelectorAll('link[rel]').forEach((el) => el.remove());
  });

  describe('createPreconnectLink', () => {
    it('creates a preconnect link element', () => {
      const result = createPreconnectLink({ href: 'https://cdn.example.com' });

      expect(result).not.toBeNull();
      expect(result!.element.rel).toBe('preconnect');
      expect(result!.element.href).toBe('https://cdn.example.com/');
    });

    it('adds crossOrigin when specified', () => {
      const result = createPreconnectLink({
        href: 'https://cdn.example.com',
        crossOrigin: 'anonymous',
      });

      expect(result!.element.crossOrigin).toBe('anonymous');
    });

    it('appends link to document head', () => {
      createPreconnectLink({ href: 'https://cdn.example.com' });

      const link = document.head.querySelector('link[rel="preconnect"]');
      expect(link).not.toBeNull();
      expect((link as HTMLLinkElement).href).toContain('cdn.example.com');
    });

    it('returns existing link if already exists', () => {
      const result1 = createPreconnectLink({ href: 'https://cdn.example.com' });
      const result2 = createPreconnectLink({ href: 'https://cdn.example.com' });

      expect(result1!.element).toBe(result2!.element);
    });

    it('remove function removes the link', () => {
      const result = createPreconnectLink({ href: 'https://cdn.example.com' });
      result!.remove();

      const link = document.head.querySelector(
        'link[rel="preconnect"][href="https://cdn.example.com/"]',
      );
      expect(link).toBeNull();
    });

    it('returns null for empty href', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const result = createPreconnectLink({ href: '' });

      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe('createDnsPrefetchLink', () => {
    it('creates a dns-prefetch link element', () => {
      const result = createDnsPrefetchLink('https://cdn.example.com');

      expect(result).not.toBeNull();
      expect(result!.element.rel).toBe('dns-prefetch');
      expect(result!.element.href).toBe('https://cdn.example.com/');
    });

    it('appends link to document head', () => {
      createDnsPrefetchLink('https://cdn.example.com');

      const link = document.head.querySelector('link[rel="dns-prefetch"]');
      expect(link).not.toBeNull();
      expect((link as HTMLLinkElement).href).toContain('cdn.example.com');
    });
  });

  describe('preconnectWithFallback', () => {
    it('creates both preconnect and dns-prefetch links', () => {
      const result = preconnectWithFallback({ href: 'https://cdn.example.com' });

      expect(result.preconnect).not.toBeNull();
      expect(result.dnsPrefetch).not.toBeNull();
      expect(result.preconnect!.element.rel).toBe('preconnect');
      expect(result.dnsPrefetch!.element.rel).toBe('dns-prefetch');
    });
  });

  describe('preconnectToOrigins', () => {
    it('creates preconnect links for multiple origins', () => {
      const origins = [
        'https://cdn1.example.com',
        'https://cdn2.example.com',
      ];
      const results = preconnectToOrigins(origins);

      expect(results).toHaveLength(2);
      expect(results[0]!.element.href).toBe('https://cdn1.example.com/');
      expect(results[1]!.element.href).toBe('https://cdn2.example.com/');
    });

    it('applies options to all connections', () => {
      const origins = ['https://cdn.example.com'];
      const results = preconnectToOrigins(origins, { crossOrigin: 'anonymous' });

      expect(results[0]!.element.crossOrigin).toBe('anonymous');
    });
  });
});
