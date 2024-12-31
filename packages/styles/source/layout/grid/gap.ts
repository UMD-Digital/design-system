import { Media, Spacing } from '../../tokens';
import { create } from '../../utilities';
import { base } from './base';
import { startSecond } from './child';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-gap';

const fourColumnCenteredChild = {
  '& > *:first-child': {
    ...startSecond,
  },
};

// umd-layout-grid-gap-two
export const two = create.jssObject({
  ...base.two,

  [`@media (${Media.queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },

  className: [
    `${classNamePrefix}-two`,
    /** @deprecated Use 'umd-layout-grid-gap-two' instead */
    'umd-grid-gap',
  ],
});

// umd-layout-grid-gap-three
export const three = create.jssObject({
  ...base.three,

  [`@media (${Media.queries.large.min})`]: {
    gridGap: Spacing.lg,
  },

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-gap-three' instead */
    'umd-grid-gap-three',
  ],
});

// umd-layout-grid-gap-three-large
export const threeLarge = create.jssObject({
  ...base.three,

  [`@media (${Media.queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: Spacing.xl,
  },

  className: [
    `${classNamePrefix}-three-large`,
    /** @deprecated Use 'umd-layout-grid-gap-three-large' instead */
    'umd-grid-gap-three-large',
  ],
});

// umd-layout-grid-gap-four
export const four = create.jssObject({
  ...base.four,

  [`@media (${Media.queries.large.min})`]: {
    gridGap: Spacing.lg,
  },

  className: [
    `${classNamePrefix}-four`,
    /** @deprecated Use 'umd-layout-grid-gap-four' instead */
    'umd-grid-gap-four',
  ],
});

// umd-layout-grid-gap-four-centered
export const fourCentered = create.jssObject({
  ...base.four,

  [`@media (${Media.queries.large.min})`]: {
    gridGap: Spacing.lg,
  },

  ...fourColumnCenteredChild,

  className: [
    `${classNamePrefix}-four-centered`,
    /** @deprecated Use 'umd-layout-grid-gap-four-centered' instead */
    'umd-grid-gap-four-center',
  ],
});

// umd-layout-grid-gap-four-large
export const fourLarge = create.jssObject({
  ...base.four,

  [`@media (${Media.queries.highDef.min})`]: {
    gridGap: Spacing.xl,
  },

  className: [
    `${classNamePrefix}-four-large`,
    /** @deprecated Use 'umd-layout-grid-gap-four-large' instead */
    'umd-grid-gap-four-large',
  ],
});

// umd-layout-grid-gap-four-large-centered
export const fourLargeCentered = create.jssObject({
  ...base.four,

  [`@media (${Media.queries.highDef.min})`]: {
    gridGap: Spacing.xl,
  },

  ...fourColumnCenteredChild,

  className: [
    `${classNamePrefix}-four-large-centered`,
    /** @deprecated Use 'umd-layout-grid-gap-four-large-centered' instead */
    'umd-grid-gap-four-center',
  ],
});

// umd-layout-grid-gap-stacked
export const stacked = create.jssObject({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: `${Spacing.md}`,

  [`@media (${Media.queries.desktop.min})`]: {
    gridGap: `${Spacing.xl}`,
  },

  className: [
    `${classNamePrefix}-stacked`,
    /** @deprecated Use 'umd-layout-grid-gap-stacked' instead */
    'umd-grid-gap-stacked',
  ],
});

// '.umd-grid-row-mobile-tablet': {
//   ...Layout.grid.columnAndRowsMobileTablet,
// },
