import { color, media, spacing } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-background-wrap';

const box = {
  padding: `${spacing.md}`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: `${spacing.lg}`,
  },

  [`@media (${media.queries.desktop.min})`]: {
    padding: `${spacing['3xl']}`,
  },
};

// umd-layout-background-wrap
export const white = create.jssObject({
  ...box,

  className: `${classNamePrefix}`,
});

// umd-layout-background-wrap-light
export const light = create.jssObject({
  ...box,
  backgroundColor: `${color.gray.lighter}`,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-wrap-light' instead */
    'umd-forms-layout',
  ],
});

// umd-layout-background-wrap-dark
export const dark = create.jssObject({
  ...box,
  backgroundColor: `${color.gray.darker}`,

  className: `${classNamePrefix}-dark`,
});
