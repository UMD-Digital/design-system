import { media, spacing } from '../../tokens';
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

  [`@media (${media.queries.desktop.min})`]: {
    gridGap: spacing.xl,
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

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
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

  [`@media (${media.queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: spacing.xl,
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

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
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

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
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

  [`@media (${media.queries.highDef.min})`]: {
    gridGap: spacing.xl,
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

  [`@media (${media.queries.highDef.min})`]: {
    gridGap: spacing.xl,
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
  gridGap: `${spacing.md}`,

  [`@media (${media.queries.desktop.min})`]: {
    gridGap: `${spacing.xl}`,
  },

  className: [
    `${classNamePrefix}-stacked`,
    /** @deprecated Use 'umd-layout-grid-gap-stacked' instead */
    'umd-grid-gap-stacked',
  ],
});

// '.umd-grid-row-mobile-tablet': {
//   ...layout.grid.columnAndRowsMobileTablet,
// },
