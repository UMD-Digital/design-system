/**
 * @module resource-hints/preconnect
 * Utilities for creating preconnect and dns-prefetch resource hints.
 * @since 1.1.0
 */

import type { PreconnectOptions, ResourceHintResult } from './types';
import { isBrowser, hintExists } from './detection';

/**
 * Create a preconnect link element.
 * Preconnect establishes early connections to origins, saving DNS, TCP, and TLS time.
 *
 * @param options - Preconnect configuration
 * @returns ResourceHintResult with element and remove function, or null if SSR
 *
 * @example
 * ```typescript
 * // Preconnect to image CDN
 * createPreconnectLink({ href: 'https://images.umd.edu' });
 *
 * // Preconnect to API with credentials
 * createPreconnectLink({
 *   href: 'https://api.umd.edu',
 *   crossOrigin: 'use-credentials'
 * });
 * ```
 */
export const createPreconnectLink = (
  options: PreconnectOptions,
): ResourceHintResult | null => {
  if (!isBrowser()) return null;

  const { href, crossOrigin } = options;

  if (!href) {
    console.warn('createPreconnectLink: href is required');
    return null;
  }

  // Skip if already exists
  if (hintExists('preconnect', href)) {
    const existing = document.head.querySelector(
      `link[rel="preconnect"][href="${href}"]`,
    ) as HTMLLinkElement;
    return {
      element: existing,
      remove: () => {}, // Don't remove existing hints
    };
  }

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;

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
 * Create a dns-prefetch link element.
 * DNS-prefetch only resolves DNS, providing a fallback for older browsers.
 *
 * @param href - Origin URL to prefetch DNS for
 * @returns ResourceHintResult with element and remove function, or null if SSR
 *
 * @example
 * ```typescript
 * createDnsPrefetchLink('https://cdn.example.com');
 * ```
 */
export const createDnsPrefetchLink = (href: string): ResourceHintResult | null => {
  if (!isBrowser()) return null;

  if (!href) {
    console.warn('createDnsPrefetchLink: href is required');
    return null;
  }

  // Skip if already exists
  if (hintExists('dns-prefetch', href)) {
    const existing = document.head.querySelector(
      `link[rel="dns-prefetch"][href="${href}"]`,
    ) as HTMLLinkElement;
    return {
      element: existing,
      remove: () => {},
    };
  }

  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = href;

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
 * Create both preconnect and dns-prefetch for maximum browser compatibility.
 * Older browsers will use dns-prefetch while modern browsers use preconnect.
 *
 * @param options - Preconnect configuration
 * @returns Object with both hint results
 *
 * @example
 * ```typescript
 * const { preconnect, dnsPrefetch } = preconnectWithFallback({
 *   href: 'https://fonts.googleapis.com',
 *   crossOrigin: 'anonymous'
 * });
 *
 * // Cleanup both
 * preconnect?.remove();
 * dnsPrefetch?.remove();
 * ```
 */
export const preconnectWithFallback = (
  options: PreconnectOptions,
): {
  preconnect: ResourceHintResult | null;
  dnsPrefetch: ResourceHintResult | null;
} => {
  return {
    preconnect: createPreconnectLink(options),
    dnsPrefetch: createDnsPrefetchLink(options.href),
  };
};

/**
 * Preconnect to multiple origins at once.
 *
 * @param origins - Array of origin URLs to preconnect to
 * @param options - Optional settings applied to all connections
 * @returns Array of ResourceHintResults
 *
 * @example
 * ```typescript
 * const hints = preconnectToOrigins([
 *   'https://cdn.example.com',
 *   'https://api.example.com'
 * ]);
 *
 * // Cleanup all
 * hints.forEach(h => h?.remove());
 * ```
 */
export const preconnectToOrigins = (
  origins: string[],
  options?: Omit<PreconnectOptions, 'href'>,
): (ResourceHintResult | null)[] => {
  return origins.map((href) =>
    createPreconnectLink({ href, ...options }),
  );
};
