import { spacing, queries } from '../tokens/layout';

const roundToThree = (number: number): number => {
  return Math.round(number * 1000) / 1000;
};

const flexBase = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: spacing.md,

  [`@media (${queries.large.min})`]: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
};

const flexGridCore = {
  '.umd-flex': {
    ...flexBase,
    ...{
      [`@media (${queries.desktop.min})`]: {
        gap: spacing['4xl'],
      },
    },
  },

  '.umd-flex-three': {
    ...flexBase,
  },

  '.umd-flex-four': {
    ...flexBase,
  },
};

const flexGridContent = {
  '.umd-flex > *': {
    width: '100%',

    [`@media (${queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(spacing.lg) / 2)}px)`,
    },

    [`@media (${queries.desktop.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(spacing['4xl']) / 2)}px)`,
    },
  },

  '.umd-flex-three > *': {
    width: '100%',

    [`@media (${queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(spacing['lg']) / 2)}px)`,
    },

    [`@media (${queries.desktop.min})`]: {
      width: `calc(33.333% - ${roundToThree(
        (parseInt(spacing['lg']) * 2) / 3,
      )}px)`,
    },
  },

  '.umd-flex-four > *': {
    width: '100%',

    [`@media (${queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(spacing['lg']) / 2)}px)`,
    },

    [`@media (${queries.desktop.min})`]: {
      width: `calc(25% - ${roundToThree((parseInt(spacing['lg']) * 3) / 4)}px)`,
    },
  },
};

const umdFlexSpecial = {
  '.umd-flex-three-animated-icon-card': {
    ...flexGridCore['.umd-flex-three'],
    ...flexGridContent['.umd-flex-three > *'],
    ...{
      '& umd-element-card-icon': {
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

  '.umd-flex-four-animated-icon-card': {
    ...flexGridCore['.umd-flex-four'],
    ...flexGridContent['.umd-flex-four > *'],
    ...{
      '& umd-element-card-icon': {
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
};

const umdFlexGrid = {
  ...flexGridCore,
  ...flexGridContent,
  ...umdFlexSpecial,
};

export { umdFlexGrid };
