import { Media, Spacing, SpaceLayout } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-space-horizontal';

const lockBase = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: Spacing['md'],
  paddingRight: Spacing['md'],
  maxWidth: `${SpaceLayout.maxWidth.max}`,

  [`@media (${Media.queries.tablet.min})`]: {
    paddingLeft: Spacing['2xl'],
    paddingRight: Spacing['2xl'],
  },

  [`@media (${Media.queries.desktop.min})`]: {
    paddingLeft: Spacing['4xl'],
    paddingRight: Spacing['4xl'],
  },

  [`@media (${Media.queries.highDef.min})`]: {
    paddingLeft: Spacing.max,
    paddingRight: Spacing.max,
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
  maxWidth: `${SpaceLayout.maxWidth.large}`,

  className: [
    `${classNamePrefix}-large`,
    /** @deprecated Use 'umd-layout-space-horizontal-large' instead */
    'umd-lock-small',
  ],
});

// umd-layout-space-horizontal-normal
export const normal = create.jssObject({
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.normal}`,

  className: [
    `${classNamePrefix}-normal`,
    /** @deprecated Use 'umd-layout-space-horizontal-normal' instead */
    'umd-lock-smaller',
  ],
});

// umd-layout-space-horizontal-small
export const small = create.jssObject({
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.small}`,

  className: [
    `${classNamePrefix}-small`,
    /** @deprecated Use 'umd-layout-space-horizontal-small' instead */
    'umd-lock-extra-small',
  ],
});

// umd-layout-space-horizontal-smallest
export const smallest = create.jssObject({
  ...lockBase,
  maxWidth: `${SpaceLayout.maxWidth.smallest}`,

  className: [
    `${classNamePrefix}-smallest`,
    /** @deprecated Use 'umd-layout-space-horizontal-smallest' instead */
    'umd-lock-smallest',
  ],
});
