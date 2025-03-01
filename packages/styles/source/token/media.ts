export const breakpointValues = {
  small: { min: 320, max: 479 },
  medium: { min: 480, max: 649 },
  large: { min: 650, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1199 },
  highDef: { min: 1200, max: 1499 },
  maximum: { min: 1500 },
};

export const breakpoints = {
  small: {
    min: `${breakpointValues.small.min}px`,
    max: `${breakpointValues.small.max}px`,
  },
  medium: {
    min: `${breakpointValues.medium.min}px`,
    max: `${breakpointValues.medium.max}px`,
  },
  large: {
    min: `${breakpointValues.large.min}px`,
    max: `${breakpointValues.large.max}px`,
  },
  tablet: {
    min: `${breakpointValues.tablet.min}px`,
    max: `${breakpointValues.tablet.max}px`,
  },
  desktop: {
    min: `${breakpointValues.desktop.min}px`,
    max: `${breakpointValues.desktop.max}px`,
  },
  highDef: {
    min: `${breakpointValues.highDef.min}px`,
    max: `${breakpointValues.highDef.max}px`,
  },
  maximum: { min: `${breakpointValues.maximum.min}px` },
};

export const queries = {
  small: {
    min: `min-width: ${breakpoints.small.min}`,
    max: `max-width: ${breakpoints.small.max}`,
  },
  medium: {
    min: `min-width: ${breakpoints.medium.min}`,
    max: `max-width: ${breakpoints.medium.max}`,
  },
  large: {
    min: `min-width: ${breakpoints.large.min}`,
    max: `max-width: ${breakpoints.large.max}`,
  },
  tablet: {
    min: `min-width: ${breakpoints.tablet.min}`,
    max: `max-width: ${breakpoints.tablet.max}`,
  },
  desktop: {
    min: `min-width: ${breakpoints.desktop.min}`,
    max: `max-width: ${breakpoints.desktop.max}`,
  },
  highDef: {
    min: `min-width: ${breakpoints.highDef.min}`,
    max: `max-width: ${breakpoints.highDef.max}`,
  },
  maximum: { min: `min-width: ${breakpoints.maximum.min}` },
};
