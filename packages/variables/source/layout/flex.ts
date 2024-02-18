import { Queries } from '../tokens/breakpoints';
import { Spacing } from '../tokens/spacing';

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

export { FlexBase, FlexRows };
