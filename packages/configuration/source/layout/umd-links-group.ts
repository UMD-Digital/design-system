import { spacing, queries } from '../tokens/layout';

const umdLinksGroupBase = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  justifyContent: 'flex-start',

  [`@media (${queries.large.min})`]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

const umdLinksGroup = {
  '.umd-links-group': { ...umdLinksGroupBase },

  '.umd-links-group-center': {
    ...umdLinksGroupBase,

    alignItems: 'center',
    justifyContent: 'center',

    [`@media (${queries.large.min})`]: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
};

export { umdLinksGroup };
