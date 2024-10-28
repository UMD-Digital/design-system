import ScrollAnimations from '../animations/scroll';
import { Queries } from '../tokens/breakpoints';
import { Spacing } from '../tokens/spacing';

const { FadeInFromBottom } = ScrollAnimations;

const GridAnimationTwo = {
  '& > *': {
    ...FadeInFromBottom,
    animationRangeStart: '10%',
    animationRangeEnd: '30%',
  },

  '& > *:nth-of-type(2n)': {
    animationRangeStart: '20%',
    animationRangeEnd: '50%',
  },
};

const GridAnimationThree = {
  ...GridAnimationTwo,

  '& > *': {
    ...FadeInFromBottom,
    animationRangeStart: '10%',
    animationRangeEnd: '30%',
  },

  '& > *:nth-child(2n)': {
    animationRangeStart: '20%',
    animationRangeEnd: '50%',
  },

  '& > *:nth-child(3n)': {
    animationRangeStart: '30%',
    animationRangeEnd: '70%',
  },
};

const GridAnimationFour = {
  ...GridAnimationTwo,

  '& > *': {
    ...FadeInFromBottom,
    animationRangeStart: '10%',
    animationRangeEnd: '30%',
  },

  '& > *:nth-child(2n)': {
    animationRangeStart: '20%',
    animationRangeEnd: '50%',
  },

  '& > *:nth-child(3n)': {
    animationRangeStart: '30%',
    animationRangeEnd: '60%',
  },

  '& > *:nth-child(4n)': {
    animationRangeStart: '40%',
    animationRangeEnd: '70%',
  },
};

const GridColumnsTwo = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

const GridColumnsThree = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const GridColumnsFour = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

const GridColumnsBaseWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },
};

const GridColumnsThreeWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const GridColumnsFourWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

const GridColumnsThreeWithGapLarge = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: Spacing.xl,
  },
};

const GridColumnsFourWithGapLarge = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: Spacing.xl,
  },
};

const GridRowsWithGapBase = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,
};

const GridColumnAndRows = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: Spacing.sm,
  justifyContent: 'flex-start',
};

const GridColumnAndRowsMobileTablet = {
  ...GridColumnAndRows,

  [`@media (${Queries.large.min})`]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
};

export default {
  GridColumnsTwo,
  GridColumnsThree,
  GridColumnsFour,
  GridRowsWithGapBase,
  GridColumnsBaseWithGap,
  GridColumnsThreeWithGap,
  GridColumnsFourWithGap,
  GridColumnsThreeWithGapLarge,
  GridColumnsFourWithGapLarge,
  GridColumnAndRows,
  GridColumnAndRowsMobileTablet,
  GridAnimationTwo,
  GridAnimationThree,
  GridAnimationFour,
};
