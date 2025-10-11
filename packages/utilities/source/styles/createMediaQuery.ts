/**
 * Creates a media query for responsive layouts based on viewport width.
 * Generates a media query object that applies styles based on viewport width constraints.
 *
 * @param comparison - The comparison operator ('min-width' or 'max-width')
 * @param breakpoint - The breakpoint value in pixels
 * @param styles - The CSS-in-JS styles object to apply at this breakpoint
 * @returns A media query object with the specified styles
 *
 * @example
 * ```typescript
 * // Apply styles when viewport is at least 768px wide
 * const tabletStyles = createMediaQuery('min-width', 768, {
 *   fontSize: '18px',
 *   padding: '2rem'
 * });
 * // Returns: { '@media (min-width: 768px)': { fontSize: '18px', padding: '2rem' } }
 *
 * // Apply styles when viewport is at most 767px wide
 * const mobileStyles = createMediaQuery('max-width', 767, {
 *   fontSize: '16px',
 *   padding: '1rem'
 * });
 * // Returns: { '@media (max-width: 767px)': { fontSize: '16px', padding: '1rem' } }
 * ```
 */
export const createMediaQuery = (
  comparison = 'max-width',
  breakpoint: number,
  styles: Record<string, any> = {},
): Record<string, any> => {
  return {
    [`@media (${comparison}: ${breakpoint}px)`]: styles,
  };
};
