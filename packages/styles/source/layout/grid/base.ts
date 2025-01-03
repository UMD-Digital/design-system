import { media, spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-columns';

const baseSmallScreen = {
  display: 'grid',

  [`@media (${media.queries.medium.max})`]: {
    gridGap: spacing.lg,
  },
};

export const base = {
  two: {
    ...baseSmallScreen,

    [`@media (${media.queries.large.min})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  three: {
    ...baseSmallScreen,

    [`@media (${media.queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  four: {
    ...baseSmallScreen,

    [`@media (${media.queries.large.min})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${media.queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

// umd-layout-grid-columns-two
export const columnsTwo = create.jssObject({
  ...base.two,

  className: [
    `${classNamePrefix}-two`,
    /** @deprecated Use 'umd-layout-grid-columns-two' instead */
    'umd-grid',
  ],
});

// umd-layout-grid-columns-three
export const columnsThree = create.jssObject({
  ...base.three,

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-columns-three' instead */
    'umd-grid-three',
  ],
});

// umd-layout-grid-columns-four
export const columnsFour = create.jssObject({
  ...base.four,

  className: [
    `${classNamePrefix}-four`,
    /** @deprecated Use 'umd-layout-grid-columns-four' instead */
    'umd-grid-four',
  ],
});
