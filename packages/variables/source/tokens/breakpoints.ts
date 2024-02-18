const Breakpoints = {
  small: { min: '320px', max: '479px' },
  medium: { min: '480px', max: '649px' },
  large: { min: '650px', max: '767px' },
  tablet: { min: '768px', max: '1023px' },
  desktop: { min: '1024px', max: '1199px' },
  highDef: { min: '1200px', max: '1499px' },
  maximum: { min: '1500px' },
};

const Queries = {
  small: {
    min: `min-width: ${Breakpoints.small.min}`,
    max: `max-width: ${Breakpoints.small.max}`,
  },
  medium: {
    min: `min-width: ${Breakpoints.medium.min}`,
    max: `max-width: ${Breakpoints.medium.max}`,
  },
  large: {
    min: `min-width: ${Breakpoints.large.min}`,
    max: `max-width: ${Breakpoints.large.max}`,
  },
  tablet: {
    min: `min-width: ${Breakpoints.tablet.min}`,
    max: `max-width: ${Breakpoints.tablet.max}`,
  },
  desktop: {
    min: `min-width: ${Breakpoints.desktop.min}`,
    max: `max-width: ${Breakpoints.desktop.max}`,
  },
  highDef: {
    min: `min-width: ${Breakpoints.highDef.min}`,
    max: `max-width: ${Breakpoints.highDef.max}`,
  },
  maximum: { min: `min-width: ${Breakpoints.maximum.min}` },
};

export { Breakpoints, Queries };
