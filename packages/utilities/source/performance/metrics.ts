/**
 * Performance metrics collection utilities
 *
 * Uses Performance API and PerformanceObserver for runtime metrics collection.
 * Provides utilities for observing and measuring Core Web Vitals.
 *
 * @category performance
 */

import { getLCPRating, getFCPRating, type WebVitalsRating } from './thresholds';

/**
 * Performance metric entry
 */
export interface PerformanceMetricEntry {
  /** Metric name (e.g., 'FCP', 'LCP') */
  name: string;
  /** Metric value in milliseconds */
  value: number;
  /** Rating based on web.dev thresholds */
  rating: WebVitalsRating;
  /** Timestamp when metric was recorded */
  timestamp: number;
}

/**
 * Callback for performance observations
 */
export type MetricsCallback = (entry: PerformanceMetricEntry) => void;

/**
 * Create a PerformanceObserver for paint timing (FCP)
 *
 * Observes First Contentful Paint using the Performance API.
 * Falls back gracefully in non-browser environments.
 *
 * @param callback - Function to call when FCP is detected
 * @returns Cleanup function to disconnect observer
 *
 * @example
 * ```typescript
 * const cleanup = observeFCP((entry) => {
 *   console.log('FCP:', entry.value, 'ms');
 *   console.log('Rating:', entry.rating);
 * });
 *
 * // Later, to stop observing:
 * cleanup();
 * ```
 */
export const observeFCP = (callback: MetricsCallback): (() => void) => {
  if (typeof PerformanceObserver === 'undefined') {
    return () => {};
  }

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        const fcpSeconds = entry.startTime / 1000;
        callback({
          name: 'FCP',
          value: entry.startTime,
          rating: getFCPRating(fcpSeconds),
          timestamp: Date.now(),
        });
      }
    }
  });

  try {
    observer.observe({ type: 'paint', buffered: true });
  } catch {
    // Fallback for older browsers
    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch {
      // Observer not supported
      return () => {};
    }
  }

  return () => observer.disconnect();
};

/**
 * Create a PerformanceObserver for largest contentful paint (LCP)
 *
 * Observes Largest Contentful Paint using the Performance API.
 * Note: LCP can fire multiple times as larger elements are rendered.
 *
 * @param callback - Function to call when LCP is detected
 * @returns Cleanup function to disconnect observer
 *
 * @example
 * ```typescript
 * const cleanup = observeLCP((entry) => {
 *   console.log('LCP:', entry.value, 'ms');
 *   console.log('Rating:', entry.rating);
 * });
 *
 * // Later, to stop observing:
 * cleanup();
 * ```
 */
export const observeLCP = (callback: MetricsCallback): (() => void) => {
  if (typeof PerformanceObserver === 'undefined') {
    return () => {};
  }

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    if (lastEntry) {
      const lcpSeconds = lastEntry.startTime / 1000;
      callback({
        name: 'LCP',
        value: lastEntry.startTime,
        rating: getLCPRating(lcpSeconds),
        timestamp: Date.now(),
      });
    }
  });

  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // LCP may not be supported in all browsers
    return () => {};
  }

  return () => observer.disconnect();
};

/**
 * Get current FCP value if available
 *
 * Retrieves the First Contentful Paint value from the Performance API.
 * Returns null if FCP hasn't occurred yet or API is unavailable.
 *
 * @returns FCP in milliseconds or null if not available
 *
 * @example
 * ```typescript
 * const fcp = getFCP();
 * if (fcp !== null) {
 *   console.log('FCP:', fcp, 'ms');
 * }
 * ```
 */
export const getFCP = (): number | null => {
  if (typeof performance === 'undefined') return null;

  const entries = performance.getEntriesByType('paint');
  const fcpEntry = entries.find((e) => e.name === 'first-contentful-paint');
  return fcpEntry ? fcpEntry.startTime : null;
};

/**
 * Get current navigation timing metrics
 *
 * Returns key timing metrics from the Navigation Timing API.
 *
 * @returns Navigation timing metrics or null if unavailable
 *
 * @example
 * ```typescript
 * const timing = getNavigationTiming();
 * if (timing) {
 *   console.log('DNS Lookup:', timing.dnsLookup, 'ms');
 *   console.log('DOM Content Loaded:', timing.domContentLoaded, 'ms');
 * }
 * ```
 */
export const getNavigationTiming = (): {
  dnsLookup: number;
  tcpConnection: number;
  serverResponse: number;
  domContentLoaded: number;
  loadComplete: number;
} | null => {
  if (typeof performance === 'undefined') return null;

  const entries = performance.getEntriesByType(
    'navigation',
  ) as PerformanceNavigationTiming[];
  if (entries.length === 0) return null;

  const nav = entries[0];

  return {
    dnsLookup: nav.domainLookupEnd - nav.domainLookupStart,
    tcpConnection: nav.connectEnd - nav.connectStart,
    serverResponse: nav.responseEnd - nav.requestStart,
    domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
    loadComplete: nav.loadEventEnd - nav.startTime,
  };
};

/**
 * Mark a performance timing point
 *
 * Creates a named performance mark for custom timing measurements.
 *
 * @param name - Name of the performance mark
 *
 * @example
 * ```typescript
 * markPerformance('component-start');
 * // ... component initialization
 * markPerformance('component-end');
 * const duration = measurePerformance('component-init', 'component-start', 'component-end');
 * ```
 */
export const markPerformance = (name: string): void => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name);
  }
};

/**
 * Measure duration between two marks
 *
 * Creates a performance measure between two named marks and returns the duration.
 *
 * @param name - Name for the measure
 * @param startMark - Start mark name
 * @param endMark - End mark name
 * @returns Duration in milliseconds or null if measurement failed
 *
 * @example
 * ```typescript
 * markPerformance('fetch-start');
 * await fetchData();
 * markPerformance('fetch-end');
 * const duration = measurePerformance('data-fetch', 'fetch-start', 'fetch-end');
 * console.log('Fetch took:', duration, 'ms');
 * ```
 */
export const measurePerformance = (
  name: string,
  startMark: string,
  endMark: string,
): number | null => {
  if (typeof performance === 'undefined' || !performance.measure) {
    return null;
  }

  try {
    const measure = performance.measure(name, startMark, endMark);
    return measure.duration;
  } catch {
    return null;
  }
};

/**
 * Clear performance marks and measures
 *
 * Clears specific marks/measures or all if no name provided.
 *
 * @param markName - Optional specific mark name to clear
 * @param measureName - Optional specific measure name to clear
 */
export const clearPerformanceMarks = (
  markName?: string,
  measureName?: string,
): void => {
  if (typeof performance === 'undefined') return;

  if (markName) {
    performance.clearMarks(markName);
  } else {
    performance.clearMarks();
  }

  if (measureName) {
    performance.clearMeasures(measureName);
  } else {
    performance.clearMeasures();
  }
};
