/**
 * @jest-environment jsdom
 */

import {
  createResourceHintManager,
  getGlobalHintManager,
  removeAllHints,
  autoPreconnectContainer,
  createScopedHintManager,
} from '../../resource-hints/manager';

describe('resource-hints/manager', () => {
  beforeEach(() => {
    // Clear any existing hints
    document.head.querySelectorAll('link[rel]').forEach((el) => el.remove());
    // Reset window.location mock
    Object.defineProperty(window, 'location', {
      value: { origin: 'https://example.com' },
      writable: true,
    });
  });

  describe('createResourceHintManager', () => {
    it('creates a manager instance', () => {
      const manager = createResourceHintManager();

      expect(manager).toHaveProperty('preload');
      expect(manager).toHaveProperty('preconnect');
      expect(manager).toHaveProperty('prefetch');
      expect(manager).toHaveProperty('dnsPrefetch');
      expect(manager).toHaveProperty('cleanup');
      expect(manager).toHaveProperty('getActiveHints');
    });

    it('tracks created hints', () => {
      const manager = createResourceHintManager();

      manager.preload({ href: '/image.jpg', as: 'image' });
      manager.preconnect({ href: 'https://cdn.example.com' });

      const hints = manager.getActiveHints();
      expect(hints).toHaveLength(2);
    });

    it('cleanup removes all tracked hints', () => {
      const manager = createResourceHintManager();

      manager.preload({ href: '/image.jpg', as: 'image' });
      manager.preconnect({ href: 'https://cdn.example.com' });

      manager.cleanup();

      const hints = manager.getActiveHints();
      expect(hints).toHaveLength(0);

      const links = document.head.querySelectorAll('link[rel]');
      expect(links).toHaveLength(0);
    });

    it('individual remove updates active hints', () => {
      const manager = createResourceHintManager();

      const hint1 = manager.preload({ href: '/image1.jpg', as: 'image' });
      manager.preload({ href: '/image2.jpg', as: 'image' });

      hint1.remove();

      const hints = manager.getActiveHints();
      expect(hints).toHaveLength(1);
    });

    it('preload creates preload hint', () => {
      const manager = createResourceHintManager();

      const result = manager.preload({ href: '/style.css', as: 'style' });

      expect(result.element.rel).toBe('preload');
      expect(result.element.as).toBe('style');
    });

    it('preconnect creates preconnect hint', () => {
      const manager = createResourceHintManager();

      const result = manager.preconnect({ href: 'https://cdn.example.com' });

      expect(result.element.rel).toBe('preconnect');
    });

    it('prefetch creates prefetch hint', () => {
      const manager = createResourceHintManager();

      const result = manager.prefetch({ href: '/next-page.html' });

      expect(result.element.rel).toBe('prefetch');
    });

    it('dnsPrefetch creates dns-prefetch hint', () => {
      const manager = createResourceHintManager();

      const result = manager.dnsPrefetch('https://cdn.example.com');

      expect(result.element.rel).toBe('dns-prefetch');
    });
  });

  describe('getGlobalHintManager', () => {
    it('returns the same instance on multiple calls', () => {
      const manager1 = getGlobalHintManager();
      const manager2 = getGlobalHintManager();

      expect(manager1).toBe(manager2);
    });

    it('provides all manager methods', () => {
      const manager = getGlobalHintManager();

      expect(typeof manager.preload).toBe('function');
      expect(typeof manager.preconnect).toBe('function');
      expect(typeof manager.prefetch).toBe('function');
      expect(typeof manager.cleanup).toBe('function');
    });
  });

  describe('removeAllHints', () => {
    it('removes all resource hints from document', () => {
      const manager = createResourceHintManager();

      manager.preload({ href: '/image.jpg', as: 'image' });
      manager.preconnect({ href: 'https://cdn.example.com' });
      manager.prefetch({ href: '/next.html' });
      manager.dnsPrefetch('https://api.example.com');

      removeAllHints();

      const preload = document.head.querySelectorAll('link[rel="preload"]');
      const preconnect = document.head.querySelectorAll('link[rel="preconnect"]');
      const prefetch = document.head.querySelectorAll('link[rel="prefetch"]');
      const dnsPrefetch = document.head.querySelectorAll('link[rel="dns-prefetch"]');

      expect(preload).toHaveLength(0);
      expect(preconnect).toHaveLength(0);
      expect(prefetch).toHaveLength(0);
      expect(dnsPrefetch).toHaveLength(0);
    });
  });

  describe('autoPreconnectContainer', () => {
    it('creates preconnect hints for external origins', () => {
      const container = document.createElement('div');
      const img = document.createElement('img');
      img.src = 'https://cdn.external.com/image.jpg';
      container.appendChild(img);

      const results = autoPreconnectContainer(container);

      expect(results).toHaveLength(1);
      expect(results[0].element.rel).toBe('preconnect');
    });

    it('ignores same-origin images', () => {
      const container = document.createElement('div');
      const img = document.createElement('img');
      img.src = 'https://example.com/image.jpg';
      container.appendChild(img);

      const results = autoPreconnectContainer(container);

      expect(results).toHaveLength(0);
    });
  });

  describe('createScopedHintManager', () => {
    let mockObserver: jest.Mock;
    let mutationCallback: MutationCallback;

    beforeEach(() => {
      mockObserver = jest.fn((callback: MutationCallback) => {
        mutationCallback = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
        };
      });
      (window as any).MutationObserver = mockObserver;
    });

    it('creates a manager scoped to element', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const manager = createScopedHintManager(element);

      expect(manager).toHaveProperty('preload');
      expect(manager).toHaveProperty('cleanup');
    });

    it('sets up MutationObserver on parent', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      createScopedHintManager(element);

      expect(mockObserver).toHaveBeenCalled();
    });

    it('cleans up hints when element is removed', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const manager = createScopedHintManager(element);
      manager.preload({ href: '/image.jpg', as: 'image' });

      // Simulate element removal via MutationObserver
      mutationCallback(
        [{ removedNodes: [element] }] as unknown as MutationRecord[],
        {} as MutationObserver,
      );

      const hints = manager.getActiveHints();
      expect(hints).toHaveLength(0);
    });
  });
});
