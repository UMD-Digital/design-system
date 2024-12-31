import { Media, Spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-columns';

const baseSmallScreen = {
  display: 'grid',

  [`@media (${Media.queries.medium.max})`]: {
    gridGap: Spacing.lg,
  },
};

export const base = {
  two: {
    ...baseSmallScreen,

    [`@media (${Media.queries.large.min})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  three: {
    ...baseSmallScreen,

    [`@media (${Media.queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  four: {
    ...baseSmallScreen,

    [`@media (${Media.queries.large.min})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${Media.queries.desktop.min})`]: {
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
