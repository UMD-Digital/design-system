/**
 * Media query and responsive utilities
 */

/**
 * Wrap styles with view timeline animation support
 * Checks for reduced motion preference and animation-timeline support
 */
export const withViewTimelineAnimation = (styles: Record<string, any>) => ({
  '@media (prefers-reduced-motion: no-preference)': {
    '@supports (animation-timeline: view())': styles,
  },
});

/**
 * Creates container query-style media query for responsive layouts.
 * @param {number} breakpoint - The breakpoint value in pixels
 * @param {string} comparison - The comparison operator ('min-width' or 'max-width')
 * @param {object} styles - The styles to apply at this breakpoint
 * @returns {object} Media query object with styles
 */
export const createContainerQuery = (
  comparison = 'max-width',
  breakpoint: number,
  styles = {},
) => {
  return {
    [`@media (${comparison}: ${breakpoint}px)`]: styles,
  };
};
