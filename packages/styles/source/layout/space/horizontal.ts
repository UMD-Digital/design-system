import { media, spacing } from '../../token';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-space-horizontal';

const lockBase = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: spacing['md'],
  paddingRight: spacing['md'],
  maxWidth: `${spacing.maxWidth.normal}`,

  [`@media (${media.queries.tablet.min})`]: {
    paddingLeft: spacing['2xl'],
    paddingRight: spacing['2xl'],
  },

  [`@media (${media.queries.desktop.min})`]: {
    paddingLeft: spacing['4xl'],
    paddingRight: spacing['4xl'],
  },

  [`@media (${media.queries.highDef.min})`]: {
    paddingLeft: spacing.max,
    paddingRight: spacing.max,
  },
};

// umd-layout-space-horizontal-full
export const full = create.jssObject({
  ...lockBase,
  maxWidth: '100%',

  className: [
    `${classNamePrefix}-full`,
    /** @deprecated Use 'umd-layout-space-horizontal-full' instead */
    'umd-lock-full',
  ],
});

// umd-layout-space-horizontal-larger
export const max = create.jssObject({
  ...lockBase,

  className: [
    `${classNamePrefix}-larger`,
    /** @deprecated Use 'umd-layout-space-horizontal-larger' instead */
    'umd-lock',
  ],
});

// umd-layout-space-horizontal-large
export const large = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.large}`,

  className: [
    `${classNamePrefix}-large`,
    /** @deprecated Use 'umd-layout-space-horizontal-large' instead */
    'umd-lock-small',
  ],
});

// umd-layout-space-horizontal-normal
export const normal = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.normal}`,

  className: [
    `${classNamePrefix}-normal`,
    /** @deprecated Use 'umd-layout-space-horizontal-normal' instead */
    'umd-lock-smaller',
  ],
});

// umd-layout-space-horizontal-small
export const small = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.small}`,

  className: [
    `${classNamePrefix}-small`,
    /** @deprecated Use 'umd-layout-space-horizontal-small' instead */
    'umd-lock-extra-small',
  ],
});

// umd-layout-space-horizontal-smallest
export const smallest = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.smallest}`,

  className: [
    `${classNamePrefix}-smallest`,
    /** @deprecated Use 'umd-layout-space-horizontal-smallest' instead */
    'umd-lock-smallest',
  ],
});
