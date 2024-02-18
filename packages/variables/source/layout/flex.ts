import { Queries } from '../tokens/breakpoints';
import { spacing } from '../tokens/spacing';

const FlexBase = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: spacing.md,

  [`@media (${Queries.large.min})`]: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
};

const FlexRowBase = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
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

export { FlexBase, FlexRows };
