/**
 * Checks if the user has enabled the "reduced motion" accessibility preference
 *
 * Queries the prefers-reduced-motion media query to determine if animations
 * and transitions should be minimized for accessibility (WCAG 2.1 compliance).
 *
 * @returns True if user prefers reduced motion
 *
 * @example
 * ```typescript
 * if (isPreferredReducedMotion()) {
 *   // Skip animations
 *   element.classList.add('no-animation');
 * } else {
 *   // Use full animations
 *   element.classList.add('with-animation');
 * }
 * ```
 *
 * @category accessibility
 */
export const isPreferredReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;