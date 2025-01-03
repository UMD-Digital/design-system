import { colors, media, spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-background-full';

export const padding = {
  padding: `${spacing['2xl']} 0`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: `${spacing['6xl']} 0`,
  },

  [`@media (${media.queries.highDef})`]: {
    padding: `${spacing['8xl']} 0`,
  },
};

// umd-layout-background-full-light
export const light = create.jssObject({
  ...padding,
  backgroundColor: `${colors.gray.lightest}`,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-full-light' instead */
    'umd-layout-background-color',
  ],
});

// umd-layout-background-full-dark
export const dark = create.jssObject({
  ...padding,
  backgroundColor: `${colors.black}`,

  className: [
    `${classNamePrefix}-dark`,
    /** @deprecated Use 'umd-layout-background-full-dark' instead */
    'umd-layout-background-color-dark',
  ],
});
