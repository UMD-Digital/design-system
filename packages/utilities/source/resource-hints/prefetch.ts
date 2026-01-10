/**
 * @module resource-hints/prefetch
 * Utilities for creating prefetch resource hints.
 * @since 1.1.0
 */

import type { PrefetchOptions, ResourceHintResult } from './types';
import { isBrowser, hintExists, hasGoodConnection } from './detection';

/**
 * Create a prefetch link element for resources needed on future pages.
 * Prefetch downloads resources during idle time for future navigation.
 *
 * @param options - Prefetch configuration
 * @returns ResourceHintResult with element and remove function, or null if SSR
 *
 * @example
 * ```typescript
 * // Prefetch next page
 * createPrefetchLink({ href: '/next-page.html' });
 *
 * // Prefetch image for gallery
 * createPrefetchLink({ href: '/images/gallery-1.jpg', as: 'image' });
 * ```
 */
export const createPrefetchLink = (
  options: PrefetchOptions,
): ResourceHintResult | null => {
  if (!isBrowser()) return null;

  const { href, as, crossOrigin } = options;

  if (!href) {
    console.warn('createPrefetchLink: href is required');
    return null;
  }

  // Skip if already exists
  if (hintExists('prefetch', href)) {
    const existing = document.head.querySelector(
      `link[rel="prefetch"][href="${href}"]`,
    ) as HTMLLinkElement;
    return {
      element: existing,
      remove: () => {},
    };
  }

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;

  if (as) {
    link.as = as;
  }

  if (crossOrigin !== undefined) {
    link.crossOrigin = crossOrigin;
  }

  document.head.appendChild(link);

  return {
    element: link,
    remove: () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    },
  };
};

/**
 * Prefetch resources only on good network connections.
 * Returns null if connection is slow or data-saver is enabled.
 *
 * @param options - Prefetch configuration
 * @returns ResourceHintResult or null if connection is poor
 *
 * @example
 * ```typescript
 * // Only prefetch on good connections
 * const hint = conditionalPrefetch({ href: '/images/large.jpg', as: 'image' });
 * if (!hint) {
 *   console.log('Skipped prefetch due to slow connection');
 * }
 * ```
 */
export const conditionalPrefetch = (
  options: PrefetchOptions,
): ResourceHintResult | null => {
  if (!hasGoodConnection()) {
    return null;
  }

  return createPrefetchLink(options);
};

/**
 * Prefetch multiple resources at once.
 *
 * @param urls - Array of URLs to prefetch
 * @param options - Optional settings applied to all
 * @returns Array of ResourceHintResults
 *
 * @example
 * ```typescript
 * const hints = prefetchUrls([
 *   '/page-2.html',
 *   '/page-3.html',
 * ]);
 * ```
 */
export const prefetchUrls = (
  urls: string[],
  options?: Omit<PrefetchOptions, 'href'>,
): (ResourceHintResult | null)[] => {
  return urls.map((href) => createPrefetchLink({ href, ...options }));
};

/**
 * Conditionally prefetch multiple resources (only on good connections).
 *
 * @param urls - Array of URLs to prefetch
 * @param options - Optional settings applied to all
 * @returns Array of ResourceHintResults (empty if poor connection)
 *
 * @example
 * ```typescript
 * const hints = conditionalPrefetchUrls([
 *   '/images/gallery-1.jpg',
 *   '/images/gallery-2.jpg',
 * ], { as: 'image' });
 * ```
 */
export const conditionalPrefetchUrls = (
  urls: string[],
  options?: Omit<PrefetchOptions, 'href'>,
): (ResourceHintResult | null)[] => {
  if (!hasGoodConnection()) {
    return [];
  }

  return prefetchUrls(urls, options);
};

/**
 * Prefetch resources when the browser is idle.
 * Uses requestIdleCallback when available, falls back to setTimeout.
 *
 * @param options - Prefetch configuration
 * @param timeout - Maximum time to wait for idle (default: 2000ms)
 * @returns Promise that resolves with ResourceHintResult
 *
 * @example
 * ```typescript
 * // Prefetch during idle time
 * prefetchWhenIdle({ href: '/large-resource.js', as: 'script' });
 * ```
 */
export const prefetchWhenIdle = (
  options: PrefetchOptions,
  timeout = 2000,
): Promise<ResourceHintResult | null> => {
  return new Promise((resolve) => {
    const doPrefetch = () => resolve(createPrefetchLink(options));

    if (!isBrowser()) {
      resolve(null);
      return;
    }

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(doPrefetch, { timeout });
    } else {
      setTimeout(doPrefetch, 0);
    }
  });
};

/**
 * Prefetch a resource when an element enters the viewport.
 * Useful for prefetching resources linked from visible elements.
 *
 * @param element - Element to observe
 * @param options - Prefetch configuration
 * @param observerOptions - IntersectionObserver options
 * @returns Cleanup function to stop observing
 *
 * @example
 * ```typescript
 * // Prefetch when link becomes visible
 * const link = document.querySelector('a[href="/next-page"]');
 * const cleanup = prefetchOnVisible(link, {
 *   href: '/next-page.html'
 * });
 *
 * // Later: stop observing
 * cleanup();
 * ```
 */
export const prefetchOnVisible = (
  element: HTMLElement,
  options: PrefetchOptions,
  observerOptions?: IntersectionObserverInit,
): (() => void) => {
  if (!isBrowser() || !element) {
    return () => {};
  }

  let hint: ResourceHintResult | null = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hint) {
          hint = conditionalPrefetch(options);
          observer.disconnect();
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0,
      ...observerOptions,
    },
  );

  observer.observe(element);

  return () => {
    observer.disconnect();
    hint?.remove();
  };
};
