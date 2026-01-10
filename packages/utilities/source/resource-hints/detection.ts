/**
 * @module resource-hints/detection
 * Utilities for detecting origins, connection quality, and environment.
 * @since 1.1.0
 */

import type { NavigatorWithConnection, NetworkInfo } from './types';

/**
 * Check if code is running in a browser environment.
 * @returns true if running in browser with document access
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Extract origin (protocol + host) from a URL.
 *
 * @param url - URL string to extract origin from
 * @returns Origin string or null if invalid/relative URL
 *
 * @example
 * ```typescript
 * getOriginFromUrl('https://cdn.example.com/images/hero.jpg');
 * // Returns: 'https://cdn.example.com'
 *
 * getOriginFromUrl('/images/hero.jpg');
 * // Returns: null (relative URL)
 * ```
 */
export const getOriginFromUrl = (url: string): string | null => {
  if (!url) return null;

  try {
    // Handle protocol-relative URLs
    if (url.startsWith('//')) {
      url = `https:${url}`;
    }

    // Check if it's an absolute URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return null;
    }

    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return null;
  }
};

/**
 * Check if a URL is same-origin as the current page.
 *
 * @param url - URL to check
 * @returns true if same-origin, false if cross-origin or invalid
 *
 * @example
 * ```typescript
 * // On https://example.com
 * isSameOrigin('https://example.com/page'); // true
 * isSameOrigin('https://cdn.example.com/img.jpg'); // false
 * isSameOrigin('/images/hero.jpg'); // true (relative)
 * ```
 */
export const isSameOrigin = (url: string): boolean => {
  if (!url || !isBrowser()) return true;

  const origin = getOriginFromUrl(url);

  // Relative URLs are same-origin
  if (origin === null) return true;

  return origin === window.location.origin;
};

/**
 * Get network connection information if available.
 *
 * @returns NetworkInfo object or undefined if not supported
 */
export const getNetworkInfo = (): NetworkInfo | undefined => {
  if (!isBrowser()) return undefined;

  const nav = navigator as NavigatorWithConnection;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
};

/**
 * Check if the user has a good network connection suitable for prefetching.
 * Returns false for slow connections or when data-saver is enabled.
 *
 * @returns true if connection is suitable for prefetching
 *
 * @example
 * ```typescript
 * if (hasGoodConnection()) {
 *   prefetchNextPageImages();
 * }
 * ```
 */
export const hasGoodConnection = (): boolean => {
  const info = getNetworkInfo();

  // If we can't detect, assume good connection
  if (!info) return true;

  // Respect data saver preference
  if (info.saveData) return false;

  // Check effective connection type
  if (info.effectiveType) {
    const slowTypes = ['slow-2g', '2g'];
    if (slowTypes.includes(info.effectiveType)) return false;
  }

  // Check RTT (round-trip time) - high latency indicates slow connection
  if (info.rtt && info.rtt > 500) return false;

  return true;
};

/**
 * Check if the user prefers reduced data usage.
 *
 * @returns true if data-saver is enabled
 */
export const prefersReducedData = (): boolean => {
  const info = getNetworkInfo();
  return info?.saveData === true;
};

/**
 * Extract all unique external origins from images in a container.
 * Useful for bulk preconnect setup.
 *
 * @param container - HTML element to search for images
 * @returns Array of unique external origin URLs
 *
 * @example
 * ```typescript
 * const origins = detectExternalOrigins(document.body);
 * // Returns: ['https://cdn.example.com', 'https://images.third-party.com']
 * ```
 */
export const detectExternalOrigins = (container: HTMLElement): string[] => {
  if (!container) return [];

  const origins = new Set<string>();
  const images = container.querySelectorAll('img[src]');

  images.forEach((img) => {
    const src = (img as HTMLImageElement).src;
    if (!isSameOrigin(src)) {
      const origin = getOriginFromUrl(src);
      if (origin) origins.add(origin);
    }
  });

  // Also check srcset
  const imagesWithSrcset = container.querySelectorAll('img[srcset]');
  imagesWithSrcset.forEach((img) => {
    const srcset = (img as HTMLImageElement).srcset;
    // Parse srcset to extract URLs
    const urls = srcset.split(',').map((entry) => entry.trim().split(' ')[0]);
    urls.forEach((url) => {
      if (!isSameOrigin(url)) {
        const origin = getOriginFromUrl(url);
        if (origin) origins.add(origin);
      }
    });
  });

  // Check background images in style attributes
  const elementsWithBg = container.querySelectorAll('[style*="background"]');
  elementsWithBg.forEach((el) => {
    const style = (el as HTMLElement).style.backgroundImage;
    const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
    if (match && match[1]) {
      if (!isSameOrigin(match[1])) {
        const origin = getOriginFromUrl(match[1]);
        if (origin) origins.add(origin);
      }
    }
  });

  return Array.from(origins);
};

/**
 * Check if a resource hint already exists in the document.
 *
 * @param rel - The rel attribute value
 * @param href - The href to check
 * @returns true if hint already exists
 */
export const hintExists = (rel: string, href: string): boolean => {
  if (!isBrowser()) return false;

  const selector = `link[rel="${rel}"][href="${href}"]`;
  return document.head.querySelector(selector) !== null;
};
