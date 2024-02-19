import { Queries } from '../tokens/breakpoints';
import { Spacing } from '../tokens/spacing';

const roundToThree = (number: number): number =>
  Math.round(number * 1000) / 1000;

const FlexBase = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: Spacing.md,

  [`@media (${Queries.large.min})`]: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
};

const FlexRowBase = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: Spacing.sm,
  justifyContent: 'flex-start',

  [`@media (${Queries.large.min})`]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

const FlexRows = {
  '.auto': { ...FlexRowBase },

  '.center': {
    ...FlexRowBase,

    alignItems: 'center',
    justifyContent: 'center',

    [`@media (${Queries.large.min})`]: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
};

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

export {
  FlexBase,
  FlexRows,
  FlexChildrenTwo,
  FlexChildrenThree,
  FlexChildrenFour,
};
