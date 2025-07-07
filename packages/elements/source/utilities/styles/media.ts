export const withViewTimelineAnimation = (styles: Record<string, any>) => ({
  '@media (prefers-reduced-motion: no-preference)': {
    '@supports (animation-timeline: view())': styles,
  },
});
