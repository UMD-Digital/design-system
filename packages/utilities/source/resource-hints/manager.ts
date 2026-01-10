/**
 * @module resource-hints/manager
 * Resource hint manager for deduplication and lifecycle management.
 * @since 1.1.0
 */

import type {
  ResourceHintManager,
  PreloadOptions,
  PreconnectOptions,
  PrefetchOptions,
  ResourceHintResult,
} from './types';
import { createPreloadLink } from './preload';
import { createPreconnectLink, createDnsPrefetchLink } from './preconnect';
import { createPrefetchLink } from './prefetch';
import { isBrowser, detectExternalOrigins } from './detection';

/**
 * Create a resource hint manager for component-scoped hint lifecycle.
 * Tracks all hints created and provides cleanup functionality.
 *
 * @returns ResourceHintManager instance
 *
 * @example
 * ```typescript
 * class MyComponent extends HTMLElement {
 *   private hints = createResourceHintManager();
 *
 *   connectedCallback() {
 *     this.hints.preload({
 *       href: '/critical.jpg',
 *       as: 'image',
 *       fetchpriority: 'high',
 *     });
 *
 *     this.hints.preconnect({ href: 'https://cdn.example.com' });
 *   }
 *
 *   disconnectedCallback() {
 *     this.hints.cleanup();
 *   }
 * }
 * ```
 */
export const createResourceHintManager = (): ResourceHintManager => {
  const activeHints: HTMLLinkElement[] = [];

  const trackHint = (result: ResourceHintResult | null): ResourceHintResult => {
    if (result) {
      activeHints.push(result.element);
      return {
        ...result,
        remove: () => {
          result.remove();
          const index = activeHints.indexOf(result.element);
          if (index > -1) {
            activeHints.splice(index, 1);
          }
        },
      };
    }

    // Return a no-op result for SSR or duplicate hints
    return {
      element: null as unknown as HTMLLinkElement,
      remove: () => {},
    };
  };

  return {
    preload: (options: PreloadOptions): ResourceHintResult => {
      return trackHint(createPreloadLink(options));
    },

    preconnect: (options: PreconnectOptions): ResourceHintResult => {
      return trackHint(createPreconnectLink(options));
    },

    prefetch: (options: PrefetchOptions): ResourceHintResult => {
      return trackHint(createPrefetchLink(options));
    },

    dnsPrefetch: (href: string): ResourceHintResult => {
      return trackHint(createDnsPrefetchLink(href));
    },

    cleanup: (): void => {
      activeHints.forEach((element) => {
        if (element?.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      activeHints.length = 0;
    },

    getActiveHints: (): HTMLLinkElement[] => {
      return [...activeHints];
    },
  };
};

// Global singleton manager
let globalManager: ResourceHintManager | null = null;

/**
 * Get the global resource hint manager singleton.
 * Use for app-wide hint management and deduplication.
 *
 * @returns Global ResourceHintManager instance
 *
 * @example
 * ```typescript
 * import { getGlobalHintManager } from '@universityofmaryland/web-utilities-library/resource-hints';
 *
 * const hints = getGlobalHintManager();
 * hints.preconnect({ href: 'https://cdn.example.com' });
 * ```
 */
export const getGlobalHintManager = (): ResourceHintManager => {
  if (!globalManager) {
    globalManager = createResourceHintManager();
  }
  return globalManager;
};

/**
 * Remove all resource hints from the document.
 * Clears preload, preconnect, prefetch, and dns-prefetch links.
 *
 * @example
 * ```typescript
 * // Clean slate for testing or page transitions
 * removeAllHints();
 * ```
 */
export const removeAllHints = (): void => {
  if (!isBrowser()) return;

  const selectors = [
    'link[rel="preload"]',
    'link[rel="preconnect"]',
    'link[rel="prefetch"]',
    'link[rel="dns-prefetch"]',
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.parentNode?.removeChild(el);
    });
  });

  // Also clear the global manager if it exists
  if (globalManager) {
    globalManager.cleanup();
  }
};

/**
 * Auto-detect external origins in a container and create preconnect hints.
 * Useful for automatically optimizing third-party image loading.
 *
 * @param container - HTML element to scan for external resources
 * @returns Array of created preconnect hints
 *
 * @example
 * ```typescript
 * // Auto-preconnect to all external image origins in a section
 * const hints = autoPreconnectContainer(document.querySelector('.hero'));
 *
 * // Cleanup later
 * hints.forEach(h => h.remove());
 * ```
 */
export const autoPreconnectContainer = (
  container: HTMLElement,
): ResourceHintResult[] => {
  const origins = detectExternalOrigins(container);
  const manager = createResourceHintManager();

  return origins.map((origin) => manager.preconnect({ href: origin }));
};

/**
 * Create a scoped hint manager that auto-cleans on element disconnect.
 * Uses MutationObserver to detect when the element is removed.
 *
 * @param element - Element to scope hints to
 * @returns ResourceHintManager that auto-cleans on disconnect
 *
 * @example
 * ```typescript
 * const container = document.querySelector('.my-section');
 * const hints = createScopedHintManager(container);
 *
 * hints.preload({ href: '/image.jpg', as: 'image' });
 *
 * // Hints auto-clean when container is removed from DOM
 * container.remove(); // Hints are automatically cleaned up
 * ```
 */
export const createScopedHintManager = (
  element: HTMLElement,
): ResourceHintManager => {
  const manager = createResourceHintManager();

  if (!isBrowser() || !element) {
    return manager;
  }

  // Watch for element removal from DOM
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const removedNode of mutation.removedNodes) {
        if (removedNode === element || (removedNode as HTMLElement).contains?.(element)) {
          manager.cleanup();
          observer.disconnect();
          return;
        }
      }
    }
  });

  // Observe the parent for child removal
  if (element.parentNode) {
    observer.observe(element.parentNode, { childList: true, subtree: true });
  }

  return manager;
};
