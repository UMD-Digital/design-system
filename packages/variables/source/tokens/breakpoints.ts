const breakpoints = {
  small: { min: '320px', max: '479px' },
  medium: { min: '480px', max: '649px' },
  large: { min: '650px', max: '767px' },
  tablet: { min: '768px', max: '1023px' },
  desktop: { min: '1024px', max: '1199px' },
  highDef: { min: '1200px', max: '1499px' },
  maximum: { min: '1500px' },
};

const queries = {
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

export { breakpoints, queries };
