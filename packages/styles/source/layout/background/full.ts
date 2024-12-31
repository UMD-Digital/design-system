import { Colors, Media, Spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-background-full';

export const padding = {
  padding: `${Spacing['2xl']} 0`,

  [`@media (${Media.queries.tablet.min})`]: {
    padding: `${Spacing['6xl']} 0`,
  },

  [`@media (${Media.queries.highDef})`]: {
    padding: `${Spacing['8xl']} 0`,
  },
};

// umd-layout-background-full-light
export const light = create.jssObject({
  ...padding,
  backgroundColor: `${Colors.gray.lightest}`,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-full-light' instead */
    'umd-layout-background-color',
  ],
});

// umd-layout-background-full-dark
export const dark = create.jssObject({
  ...padding,
  backgroundColor: `${Colors.black}`,

  className: [
    `${classNamePrefix}-dark`,
    /** @deprecated Use 'umd-layout-background-full-dark' instead */
    'umd-layout-background-color-dark',
  ],
});
