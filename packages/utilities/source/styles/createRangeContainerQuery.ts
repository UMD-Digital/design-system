/**
 * Creates a container query for a range of viewport sizes.
 * Generates a media query that applies styles only when the viewport width
 * falls between the minimum and maximum breakpoints (inclusive).
 *
 * @param min - The minimum breakpoint in pixels
 * @param max - The maximum breakpoint in pixels
 * @param styles - The CSS-in-JS styles object to apply within this range
 * @returns A media query object with the specified range constraint
 *
 * @example
 * ```typescript
 * // Apply styles only for tablet viewports (768px - 1023px)
 * const tabletStyles = createRangeContainerQuery(768, 1023, {
 *   fontSize: '18px',
 *   padding: '2rem',
 *   columns: 2
 * });
 * // Returns: {
 * //   '@media (min-width: 768px) and (max-width: 1023px)': {
 * //     fontSize: '18px',
 * //     padding: '2rem',
 * //     columns: 2
 * //   }
 * // }
 * ```
 */
export const createRangeContainerQuery = (
  min: number,
  max: number,
  styles: Record<string, any> = {},
): Record<string, any> => {
  return {
    [`@media (min-width: ${min}px) and (max-width: ${max}px)`]: styles,
  };
};