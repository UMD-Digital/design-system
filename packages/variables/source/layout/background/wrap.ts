import { Colors, Media, Spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-background-wrap';

const box = {
  padding: `${Spacing.md}`,
  borderLeft: `2px solid ${Colors.red}`,

  [`@media (${Media.queries.tablet.min})`]: {
    padding: `${Spacing.lg}`,
  },

  [`@media (${Media.queries.desktop.min})`]: {
    padding: `${Spacing['3xl']}`,
  },
};

// umd-layout-background-wrap
export const white = create.jssObject({
  ...box,

  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-layout-background-wrap' instead */
    'umd-layout-background-box',
  ],
});

// umd-layout-background-wrap-light
export const light = create.jssObject({
  ...box,
  backgroundColor: `${Colors.gray.lighter}`,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-wrap-light' instead */
    'umd-layout-background-box',
  ],
});

// umd-layout-background-wrap-dark
export const dark = create.jssObject({
  ...box,
  backgroundColor: `${Colors.gray.darker}`,

  className: [
    `${classNamePrefix}-dark`,
    /** @deprecated Use 'umd-layout-background-wrap-dark' instead */
    'umd-layout-background-box[theme="dark"]',
  ],
});
