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