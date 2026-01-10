/**
 * Resource Hints Utilities
 *
 * Utilities for creating resource hints (preload, preconnect, prefetch)
 * to improve LCP and overall page performance.
 *
 * ## Key Features:
 *
 * 1. **Preload**: Load critical resources immediately (hero images, fonts)
 * 2. **Preconnect**: Establish early connections to CDN origins
 * 3. **Prefetch**: Fetch resources for future navigation
 * 4. **Connection-Aware**: Respects data-saver and slow connections
 *
 * ## Usage Example:
 *
 * ```typescript
 * import {
 *   preloadImage,
 *   createPreconnectLink,
 *   conditionalPrefetch,
 *   createResourceHintManager
 * } from '@universityofmaryland/web-utilities-library/resource-hints';
 *
 * // Preload hero image for LCP optimization
 * const heroImg = document.querySelector('.hero-image');
 * preloadImage(heroImg, { fetchpriority: 'high' });
 *
 * // Preconnect to CDN
 * createPreconnectLink({ href: 'https://cdn.example.com' });
 *
 * // Conditionally prefetch (respects data-saver)
 * conditionalPrefetch({ href: '/next-page.html' });
 *
 * // Component-scoped hint management
 * const hints = createResourceHintManager();
 * hints.preload({ href: '/critical.css', as: 'style' });
 * hints.cleanup(); // Remove all hints when done
 * ```
 *
 * @module resource-hints
 * @since 1.1.0
 */

// Type exports
export type {
  ResourceHintType,
  PreloadAsType,
  FetchPriorityHint,
  CrossOriginValue,
  PreloadOptions,
  PreconnectOptions,
  PrefetchOptions,
  ResourceHintResult,
  ResourceHintManager,
  NetworkInfo,
  NavigatorWithConnection,
} from './types';

// Detection utilities
export {
  isBrowser,
  getOriginFromUrl,
  isSameOrigin,
  getNetworkInfo,
  hasGoodConnection,
  prefersReducedData,
  detectExternalOrigins,
  hintExists,
} from './detection';

// Preconnect utilities
export {
  createPreconnectLink,
  createDnsPrefetchLink,
  preconnectWithFallback,
  preconnectToOrigins,
} from './preconnect';

// Preload utilities
export {
  createPreloadLink,
  preloadImage,
  preloadFont,
  preloadStylesheet,
  preloadScript,
  generatePreloadHeader,
  generateLinkHeader,
} from './preload';

// Prefetch utilities
export {
  createPrefetchLink,
  conditionalPrefetch,
  prefetchUrls,
  conditionalPrefetchUrls,
  prefetchWhenIdle,
  prefetchOnVisible,
} from './prefetch';

// Manager utilities
export {
  createResourceHintManager,
  getGlobalHintManager,
  removeAllHints,
  autoPreconnectContainer,
  createScopedHintManager,
} from './manager';
