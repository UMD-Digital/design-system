/**
 * Core Web Vitals thresholds per web.dev guidelines
 *
 * Provides threshold constants and validation functions for
 * LCP (Largest Contentful Paint) and FCP (First Contentful Paint).
 *
 * @see https://web.dev/articles/lcp
 * @see https://web.dev/articles/fcp
 *
 * @category performance
 */

/**
 * LCP threshold in seconds - Good: <= 2.5s
 */
export const LCP_THRESHOLD_GOOD = 2.5;

/**
 * LCP threshold in seconds - Needs Improvement: <= 4.0s
 */
export const LCP_THRESHOLD_NEEDS_IMPROVEMENT = 4.0;

/**
 * FCP threshold in seconds - Good: <= 1.8s
 */
export const FCP_THRESHOLD_GOOD = 1.8;

/**
 * FCP threshold in seconds - Needs Improvement: <= 3.0s
 */
export const FCP_THRESHOLD_NEEDS_IMPROVEMENT = 3.0;

/**
 * Performance thresholds object for Core Web Vitals
 */
export const THRESHOLDS = {
  lcp: {
    good: LCP_THRESHOLD_GOOD,
    needsImprovement: LCP_THRESHOLD_NEEDS_IMPROVEMENT,
    poor: LCP_THRESHOLD_NEEDS_IMPROVEMENT,
  },
  fcp: {
    good: FCP_THRESHOLD_GOOD,
    needsImprovement: FCP_THRESHOLD_NEEDS_IMPROVEMENT,
    poor: FCP_THRESHOLD_NEEDS_IMPROVEMENT,
  },
} as const;

/**
 * Web Vitals rating type
 */
export type WebVitalsRating = 'good' | 'needs-improvement' | 'poor';

/**
 * Check if LCP value is within good threshold
 *
 * @param lcpSeconds - LCP value in seconds
 * @returns true if LCP is good (<=2.5s)
 *
 * @example
 * ```typescript
 * const lcpSeconds = 2.1;
 * if (isLCPGood(lcpSeconds)) {
 *   console.log('LCP is within acceptable range');
 * }
 * ```
 */
export const isLCPGood = (lcpSeconds: number): boolean =>
  lcpSeconds <= LCP_THRESHOLD_GOOD;

/**
 * Check if FCP value is within good threshold
 *
 * @param fcpSeconds - FCP value in seconds
 * @returns true if FCP is good (<=1.8s)
 *
 * @example
 * ```typescript
 * const fcpSeconds = 1.5;
 * if (isFCPGood(fcpSeconds)) {
 *   console.log('FCP is within acceptable range');
 * }
 * ```
 */
export const isFCPGood = (fcpSeconds: number): boolean =>
  fcpSeconds <= FCP_THRESHOLD_GOOD;

/**
 * Get rating for LCP value
 *
 * @param lcpSeconds - LCP value in seconds
 * @returns 'good' | 'needs-improvement' | 'poor'
 *
 * @example
 * ```typescript
 * const rating = getLCPRating(3.2);
 * console.log(rating); // 'needs-improvement'
 * ```
 */
export const getLCPRating = (lcpSeconds: number): WebVitalsRating => {
  if (lcpSeconds <= LCP_THRESHOLD_GOOD) return 'good';
  if (lcpSeconds <= LCP_THRESHOLD_NEEDS_IMPROVEMENT) return 'needs-improvement';
  return 'poor';
};

/**
 * Get rating for FCP value
 *
 * @param fcpSeconds - FCP value in seconds
 * @returns 'good' | 'needs-improvement' | 'poor'
 *
 * @example
 * ```typescript
 * const rating = getFCPRating(1.2);
 * console.log(rating); // 'good'
 * ```
 */
export const getFCPRating = (fcpSeconds: number): WebVitalsRating => {
  if (fcpSeconds <= FCP_THRESHOLD_GOOD) return 'good';
  if (fcpSeconds <= FCP_THRESHOLD_NEEDS_IMPROVEMENT) return 'needs-improvement';
  return 'poor';
};

/**
 * Convert milliseconds to seconds
 *
 * @param ms - Value in milliseconds
 * @returns Value in seconds
 */
export const msToSeconds = (ms: number): number => ms / 1000;

/**
 * Convert seconds to milliseconds
 *
 * @param seconds - Value in seconds
 * @returns Value in milliseconds
 */
export const secondsToMs = (seconds: number): number => seconds * 1000;
