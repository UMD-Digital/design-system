/**
 * Wraps styles with view timeline animation support checks.
 * Ensures animations only run when the user hasn't enabled reduced motion preferences
 * and the browser supports the animation-timeline API.
 *
 * @param styles - The CSS-in-JS styles object to wrap
 * @returns A media query object that conditionally applies the styles
 *
 * @example
 * ```typescript
 * const animationStyles = {
 *   animation: 'fadeIn 1s ease-in',
 *   'animation-timeline': 'view()'
 * };
 *
 * const wrappedStyles = withViewTimelineAnimation(animationStyles);
 * // Returns:
 * // {
 * //   '@media (prefers-reduced-motion: no-preference)': {
 * //     '@supports (animation-timeline: view())': {
 * //       animation: 'fadeIn 1s ease-in',
 * //       'animation-timeline': 'view()'
 * //     }
 * //   }
 * // }
 * ```
 */
export const withViewTimelineAnimation = (
  styles: Record<string, any>
): Record<string, any> => ({
  '@media (prefers-reduced-motion: no-preference)': {
    '@supports (animation-timeline: view())': styles,
  },
});