/**
 * @module resource-hints/preload
 * Utilities for creating preload resource hints.
 * @since 1.1.0
 */

import type {
  PreloadOptions,
  ResourceHintResult,
  FetchPriorityHint,
} from './types';
import { isBrowser, hintExists } from './detection';

/**
 * Create a preload link element for critical resources.
 * Preload tells the browser to download a resource as soon as possible.
 *
 * @param options - Preload configuration
 * @returns ResourceHintResult with element and remove function, or null if SSR
 *
 * @example
 * ```typescript
 * // Preload hero image
 * createPreloadLink({
 *   href: '/images/hero.webp',
 *   as: 'image',
 *   type: 'image/webp',
 *   fetchpriority: 'high',
 * });
 *
 * // Preload responsive image
 * createPreloadLink({
 *   href: '/images/hero-800.jpg',
 *   as: 'image',
 *   imagesrcset: '/images/hero-400.jpg 400w, /images/hero-800.jpg 800w',
 *   imagesizes: '(max-width: 600px) 400px, 800px',
 * });
 *
 * // Preload critical CSS
 * createPreloadLink({
 *   href: '/css/critical.css',
 *   as: 'style',
 * });
 * ```
 */
export const createPreloadLink = (
  options: PreloadOptions,
): ResourceHintResult | null => {
  if (!isBrowser()) return null;

  const {
    href,
    as,
    type,
    crossOrigin,
    media,
    fetchpriority,
    imagesrcset,
    imagesizes,
  } = options;

  if (!href || !as) {
    console.warn('createPreloadLink: href and as are required');
    return null;
  }

  // Skip if already exists
  if (hintExists('preload', href)) {
    const existing = document.head.querySelector(
      `link[rel="preload"][href="${href}"]`,
    ) as HTMLLinkElement;
    return {
      element: existing,
      remove: () => {},
    };
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;

  if (type) {
    link.type = type;
  }

  // Fonts always need crossorigin
  if (as === 'font' && crossOrigin === undefined) {
    link.crossOrigin = 'anonymous';
  } else if (crossOrigin !== undefined) {
    link.crossOrigin = crossOrigin;
  }

  if (media) {
    link.media = media;
  }

  if (fetchpriority) {
    link.setAttribute('fetchpriority', fetchpriority);
  }

  // Responsive image attributes
  if (imagesrcset) {
    link.setAttribute('imagesrcset', imagesrcset);
  }

  if (imagesizes) {
    link.setAttribute('imagesizes', imagesizes);
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
 * Preload an image element's src (and optionally srcset).
 * Automatically extracts URL and responsive attributes.
 *
 * @param image - HTMLImageElement to preload
 * @param options - Optional fetchpriority setting
 * @returns ResourceHintResult or null if no valid src
 *
 * @example
 * ```typescript
 * const heroImg = document.querySelector('.hero-image');
 * preloadImage(heroImg, { fetchpriority: 'high' });
 * ```
 */
export const preloadImage = (
  image: HTMLImageElement,
  options?: { fetchpriority?: FetchPriorityHint },
): ResourceHintResult | null => {
  if (!image) return null;

  const src = image.src || image.dataset.src;
  if (!src) return null;

  const preloadOptions: PreloadOptions = {
    href: src,
    as: 'image',
    fetchpriority: options?.fetchpriority,
  };

  // Include srcset if present
  const srcset = image.srcset || image.dataset.srcset;
  if (srcset) {
    preloadOptions.imagesrcset = srcset;
  }

  // Include sizes if present
  const sizes = image.sizes;
  if (sizes) {
    preloadOptions.imagesizes = sizes;
  }

  // Detect image type from extension
  const extension = src.split('.').pop()?.toLowerCase();
  const typeMap: Record<string, string> = {
    webp: 'image/webp',
    avif: 'image/avif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
  };
  if (extension && typeMap[extension]) {
    preloadOptions.type = typeMap[extension];
  }

  return createPreloadLink(preloadOptions);
};

/**
 * Preload a font file.
 * Always sets crossOrigin for CORS compliance.
 *
 * @param href - URL of the font file
 * @param type - MIME type of the font (e.g., 'font/woff2')
 * @returns ResourceHintResult or null
 *
 * @example
 * ```typescript
 * preloadFont('/fonts/inter.woff2', 'font/woff2');
 * ```
 */
export const preloadFont = (
  href: string,
  type?: string,
): ResourceHintResult | null => {
  if (!href) return null;

  // Detect font type from extension if not provided
  let fontType = type;
  if (!fontType) {
    const extension = href.split('.').pop()?.toLowerCase();
    const typeMap: Record<string, string> = {
      woff2: 'font/woff2',
      woff: 'font/woff',
      ttf: 'font/ttf',
      otf: 'font/otf',
      eot: 'application/vnd.ms-fontobject',
    };
    fontType = extension ? typeMap[extension] : undefined;
  }

  return createPreloadLink({
    href,
    as: 'font',
    type: fontType,
    crossOrigin: 'anonymous', // Fonts always need crossorigin
  });
};

/**
 * Preload a stylesheet.
 *
 * @param href - URL of the stylesheet
 * @param media - Optional media query
 * @returns ResourceHintResult or null
 *
 * @example
 * ```typescript
 * preloadStylesheet('/css/critical.css');
 * preloadStylesheet('/css/print.css', 'print');
 * ```
 */
export const preloadStylesheet = (
  href: string,
  media?: string,
): ResourceHintResult | null => {
  if (!href) return null;

  return createPreloadLink({
    href,
    as: 'style',
    media,
  });
};

/**
 * Preload a script.
 *
 * @param href - URL of the script
 * @param options - Optional crossOrigin and fetchpriority
 * @returns ResourceHintResult or null
 *
 * @example
 * ```typescript
 * preloadScript('/js/critical.js', { fetchpriority: 'high' });
 * ```
 */
export const preloadScript = (
  href: string,
  options?: { crossOrigin?: 'anonymous' | 'use-credentials'; fetchpriority?: FetchPriorityHint },
): ResourceHintResult | null => {
  if (!href) return null;

  return createPreloadLink({
    href,
    as: 'script',
    crossOrigin: options?.crossOrigin,
    fetchpriority: options?.fetchpriority,
  });
};

/**
 * Generate an HTTP Link header value for server-side preload hints.
 * Use with server frameworks to send early hints (103 status).
 *
 * @param options - Preload configuration
 * @returns Link header value string
 *
 * @example
 * ```typescript
 * const header = generatePreloadHeader({
 *   href: '/hero.webp',
 *   as: 'image',
 *   type: 'image/webp'
 * });
 * // Returns: </hero.webp>; rel=preload; as=image; type=image/webp
 * ```
 */
export const generatePreloadHeader = (options: PreloadOptions): string => {
  const { href, as, type, crossOrigin, fetchpriority } = options;

  const parts = [`<${href}>`, 'rel=preload', `as=${as}`];

  if (type) {
    parts.push(`type=${type}`);
  }

  if (crossOrigin) {
    parts.push(`crossorigin=${crossOrigin || 'anonymous'}`);
  }

  if (fetchpriority) {
    parts.push(`fetchpriority=${fetchpriority}`);
  }

  return parts.join('; ');
};

/**
 * Generate combined Link header for multiple preload hints.
 *
 * @param hints - Array of preload configurations
 * @returns Combined Link header value
 *
 * @example
 * ```typescript
 * const header = generateLinkHeader([
 *   { href: '/hero.webp', as: 'image' },
 *   { href: '/font.woff2', as: 'font' },
 * ]);
 * // Returns: </hero.webp>; rel=preload; as=image, </font.woff2>; rel=preload; as=font; crossorigin=anonymous
 * ```
 */
export const generateLinkHeader = (hints: PreloadOptions[]): string => {
  return hints.map(generatePreloadHeader).join(', ');
};
