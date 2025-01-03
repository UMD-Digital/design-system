import { color, media, spacing } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-background-highlight';

const box = {
  padding: `${spacing.md}`,
  borderLeft: `2px solid ${color.red}`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: `${spacing.lg}`,
  },

  [`@media (${media.queries.desktop.min})`]: {
    padding: `${spacing['3xl']}`,
  },
};

// umd-layout-background-highlight
export const white = create.jssObject({
  ...box,

  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-layout-background-highlight' instead */
    'umd-layout-background-box',
  ],
});

// umd-layout-background-highlight-light
export const light = create.jssObject({
  ...box,
  backgroundColor: `${color.gray.lighter}`,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-highlight-light' instead */
    'umd-layout-background-box',
  ],
});

// umd-layout-background-highlight-dark
export const dark = create.jssObject({
  ...box,
  backgroundColor: `${color.gray.darker}`,

  className: [
    `${classNamePrefix}-dark`,
    /** @deprecated Use 'umd-layout-background-highlight-dark' instead */
    'umd-layout-background-box[theme="dark"]',
  ],
});
