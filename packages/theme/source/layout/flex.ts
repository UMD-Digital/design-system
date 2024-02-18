import { Layout, Tokens } from '@universityofmaryland/variables';

const { FlexBase, FlexRows: Rows } = Layout;
const { queries, spacing } = Tokens;

const roundToThree = (number: number): number =>
  Math.round(number * 1000) / 1000;

const RowTwoChildren = {
  width: '100%',

  [`@media (${queries.large.min})`]: {
    width: `calc(50% - ${roundToThree(parseInt(spacing.lg) / 2)}px)`,
  },

  [`@media (${queries.desktop.min})`]: {
    width: `calc(50% - ${roundToThree(parseInt(spacing['4xl']) / 2)}px)`,
  },
};

const RowThreeChildren = {
  width: '100%',

  [`@media (${queries.large.min})`]: {
    width: `calc(50% - ${roundToThree(parseInt(spacing['lg']) / 2)}px)`,
  },

  [`@media (${queries.desktop.min})`]: {
    width: `calc(33.333% - ${roundToThree(
      (parseInt(spacing['lg']) * 2) / 3,
    )}px)`,
  },
};

const RowFourChildren = {
  width: '100%',

  [`@media (${queries.large.min})`]: {
    width: `calc(50% - ${roundToThree(parseInt(spacing['lg']) / 2)}px)`,
  },

  [`@media (${queries.desktop.min})`]: {
    width: `calc(25% - ${roundToThree((parseInt(spacing['lg']) * 3) / 4)}px)`,
  },
};

export const FlexRows = {
  '.umd-layout-flex-row-auto': {
    ...Rows['.auto'],
  },

  '.umd-layout-flex-row-center': {
    ...Rows['.center'],
  },
};

export const FlexGridCore = {
  '.umd-flex': {
    ...FlexBase,
    ...{
      [`@media (${queries.desktop.min})`]: {
        gap: spacing['4xl'],
      },
    },
  },

  '.umd-flex-three': {
    ...FlexBase,
  },

  '.umd-flex-four': {
    ...FlexBase,
  },
};

export const FlexGridContent = {
  '.umd-flex > *': {
    ...RowTwoChildren,
  },

  '.umd-flex-three > *': {
    ...RowThreeChildren,
  },

  '.umd-flex-four > *': {
    ...RowFourChildren,
  },
};

export const FlexSpecial = {
  '.umd-flex-three-animated-icon-card': {
    ...FlexGridCore['.umd-flex-three'],
    ...{
      '& umd-element-card-icon': {
        ...RowThreeChildren,
        ...{
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.5s ease-in-out, transform 0.5s ease-in-out',
          transform: 'scale(1)',

          [`&:hover,
        &:focus-within `]: {
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.025)',
            zIndex: '99',
          },
        },
      },
    },
  },

  '.umd-flex-four-animated-icon-card': {
    ...FlexGridCore['.umd-flex-four'],
    ...{
      '& umd-element-card-icon': {
        ...RowFourChildren,
        ...{
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.5s ease-in-out, transform 0.5s ease-in-out',
          transform: 'scale(1)',

          [`&:hover,
        &:focus-within `]: {
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.025)',
            zIndex: '99',
          },
        },
      },
    },
  },
};
