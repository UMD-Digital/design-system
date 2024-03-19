import { Layout, Tokens } from '@universityofmaryland/variables';
import { FlexColumnsCore } from '../layout/flex';

// Deprecated - Do Not Use

const roundToThree = (number: number): number =>
  Math.round(number * 1000) / 1000;

const { Queries, Spacing } = Tokens;

const FlexChildrenTwo = {
  width: '100%',

  [`@media (${Queries.large.min})`]: {
    width: `calc(50% - ${roundToThree(parseInt(Spacing.lg) / 2)}px)`,
  },

  [`@media (${Queries.desktop.min})`]: {
    width: `calc(50% - ${roundToThree(parseInt(Spacing['4xl']) / 2)}px)`,
  },
};

const FlexChildrenThree = {
  width: '100%',

  [`@media (${Queries.large.min})`]: {
    width: `calc(50% - ${roundToThree(parseInt(Spacing['lg']) / 2)}px)`,
  },

  [`@media (${Queries.desktop.min})`]: {
    width: `calc(33.333% - ${roundToThree(
      (parseInt(Spacing['lg']) * 2) / 3,
    )}px)`,
  },
};

const FlexChildrenFour = {
  width: '100%',

  [`@media (${Queries.large.min})`]: {
    width: `calc(50% - ${roundToThree(parseInt(Spacing['lg']) / 2)}px)`,
  },

  [`@media (${Queries.desktop.min})`]: {
    width: `calc(25% - ${roundToThree((parseInt(Spacing['lg']) * 3) / 4)}px)`,
  },
};

const FlexColumnsContent = {
  '.umd-flex > *': {
    ...FlexChildrenTwo,
    width: '100%',

    [`@media (${Queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(Spacing.lg) / 2)}px)`,
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(Spacing['4xl']) / 2)}px)`,
    },
  },

  '.umd-flex-three > *': {
    ...FlexChildrenThree,
    width: '100%',

    [`@media (${Queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(Spacing['lg']) / 2)}px)`,
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(33.333% - ${roundToThree(
        (parseInt(Spacing['lg']) * 2) / 3,
      )}px)`,
    },
  },

  '.umd-flex-four > *': {
    ...FlexChildrenFour,
    width: '100%',

    [`@media (${Queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(Spacing['lg']) / 2)}px)`,
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(25% - ${roundToThree((parseInt(Spacing['lg']) * 3) / 4)}px)`,
    },
  },
};

export const FloatCardsIcon = {
  '.umd-flex-three-float-icon-card': {
    ...FlexColumnsCore['.umd-flex-three'],
    ...{
      '& umd-element-card-icon': {
        ...FlexChildrenThree,
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

  '.umd-flex-four-float-icon-card': {
    ...FlexColumnsCore['.umd-flex-four'],
    ...{
      '& umd-element-card-icon': {
        ...FlexChildrenFour,
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
