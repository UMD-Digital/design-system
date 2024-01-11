const spacing = {
  min: '8px',
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '40px',
  '2xl': '48px',
  '3xl': '56px',
  '4xl': '64px',
  '5xl': '72px',
  '6xl': '80px',
  '7xl': '96px',
  '8xl': '104px',
  max: '128px',
};

const screens = {
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
    min: `min-width: ${screens.small.min}`,
    max: `max-width: ${screens.small.max}`,
  },
  medium: {
    min: `min-width: ${screens.medium.min}`,
    max: `max-width: ${screens.medium.max}`,
  },
  large: {
    min: `min-width: ${screens.large.min}`,
    max: `max-width: ${screens.large.max}`,
  },
  tablet: {
    min: `min-width: ${screens.tablet.min}`,
    max: `max-width: ${screens.tablet.max}`,
  },
  desktop: {
    min: `min-width: ${screens.desktop.min}`,
    max: `max-width: ${screens.desktop.max}`,
  },
  highDef: {
    min: `min-width: ${screens.highDef.min}`,
    max: `max-width: ${screens.highDef.max}`,
  },
  maximum: { min: `min-width: ${screens.maximum.min}` },
};

export { queries, screens, spacing };
