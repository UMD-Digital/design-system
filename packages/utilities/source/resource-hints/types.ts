/**
 * @module resource-hints/types
 * TypeScript interfaces for resource hint utilities.
 * @since 1.1.0
 */

/**
 * Types of resource hints supported by browsers.
 */
export type ResourceHintType =
  | 'preload'
  | 'preconnect'
  | 'prefetch'
  | 'dns-prefetch';

/**
 * Resource types for preload `as` attribute.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#as
 */
export type PreloadAsType =
  | 'image'
  | 'font'
  | 'style'
  | 'script'
  | 'fetch'
  | 'video'
  | 'audio'
  | 'document'
  | 'embed'
  | 'object'
  | 'track'
  | 'worker';

/**
 * Fetch priority hint for resource loading.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority
 */
export type FetchPriorityHint = 'high' | 'low' | 'auto';

/**
 * Cross-origin attribute values.
 */
export type CrossOriginValue = 'anonymous' | 'use-credentials' | '';

/**
 * Options for creating a preload link.
 */
export interface PreloadOptions {
  /** URL of the resource to preload */
  href: string;
  /** Type of resource being preloaded */
  as: PreloadAsType;
  /** MIME type of the resource (e.g., 'image/webp', 'font/woff2') */
  type?: string;
  /** Cross-origin setting for the request */
  crossOrigin?: CrossOriginValue;
  /** Media query for conditional preloading */
  media?: string;
  /** Fetch priority hint */
  fetchpriority?: FetchPriorityHint;
  /** Srcset for responsive images */
  imagesrcset?: string;
  /** Sizes for responsive images */
  imagesizes?: string;
}

/**
 * Options for creating a preconnect link.
 */
export interface PreconnectOptions {
  /** Origin URL to preconnect to (e.g., 'https://cdn.example.com') */
  href: string;
  /** Cross-origin setting for the connection */
  crossOrigin?: CrossOriginValue;
}

/**
 * Options for creating a prefetch link.
 */
export interface PrefetchOptions {
  /** URL of the resource to prefetch */
  href: string;
  /** Type of resource being prefetched */
  as?: PreloadAsType;
  /** Cross-origin setting for the request */
  crossOrigin?: CrossOriginValue;
}

/**
 * Result of creating a resource hint.
 */
export interface ResourceHintResult {
  /** The created link element */
  element: HTMLLinkElement;
  /** Remove the hint from the document */
  remove: () => void;
}

/**
 * Manager for handling multiple resource hints with deduplication.
 */
export interface ResourceHintManager {
  /** Create a preload link */
  preload: (options: PreloadOptions) => ResourceHintResult;
  /** Create a preconnect link */
  preconnect: (options: PreconnectOptions) => ResourceHintResult;
  /** Create a prefetch link */
  prefetch: (options: PrefetchOptions) => ResourceHintResult;
  /** Create a dns-prefetch link */
  dnsPrefetch: (href: string) => ResourceHintResult;
  /** Remove all hints created by this manager */
  cleanup: () => void;
  /** Get all active hints */
  getActiveHints: () => HTMLLinkElement[];
}

/**
 * Network connection information (when available).
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
export interface NetworkInfo {
  /** Effective connection type */
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  /** Whether data saver is enabled */
  saveData?: boolean;
  /** Downlink speed in Mbps */
  downlink?: number;
  /** Round-trip time in ms */
  rtt?: number;
}

/**
 * Extended Navigator interface with Network Information API.
 */
export interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInfo;
  mozConnection?: NetworkInfo;
  webkitConnection?: NetworkInfo;
}
