import { object as objectAnimation } from '../animations';
import { Media, Spacing } from '../tokens';

export const animationTwo = {
  '& > *': {
    ...objectAnimation.fadeInFromBottom,
    animationRangeStart: '10%',
    animationRangeEnd: '30%',
  },

  '& > *:nth-of-type(2n)': {
    animationRangeStart: '20%',
    animationRangeEnd: '50%',
  },
};

export const animationThree = {
  ...animationTwo,

  '& > *': {
    ...objectAnimation.fadeInFromBottom,
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

export const animationFour = {
  ...animationTwo,

  '& > *': {
    ...objectAnimation.fadeInFromBottom,
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

export const columnsTwo = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Media.queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

export const columnsThree = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Media.queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

export const columnsFour = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Media.queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Media.queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

export const columnsBaseWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Media.queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Media.queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },
};

export const columnsThreeWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Media.queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

export const columnsFourWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Media.queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Media.queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

export const columnsThreeWithGapLarge = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Media.queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: Spacing.xl,
  },
};

export const columnsFourWithGapLarge = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Media.queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Media.queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: Spacing.xl,
  },
};

export const rowsWithGapBase = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,
};

export const columnAndRows = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: Spacing.sm,
  justifyContent: 'flex-start',
};

export const columnAndRowsMobileTablet = {
  ...columnAndRows,

  [`@media (${Media.queries.large.min})`]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
};
