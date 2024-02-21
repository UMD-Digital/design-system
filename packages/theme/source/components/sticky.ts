import { Tokens } from '@universityofmaryland/variables';

const { Spacing, Queries } = Tokens;

const Sticky = {
  alignItems: 'start',
  display: 'grid',
  gridGap: Spacing.md,
  gridTemplateColumns: '1fr',

  '& .umd-sticky-featured': {
    [`@media (${Queries.small.min})`]: {
      display: 'flex',
      minHeight: '400px',
    },

    [`@media (${Queries.tablet.min})`]: {
      minHeight: '475px',
    },

    [`@media (${Queries.desktop.min})`]: {
      minHeight: '560px',
    },

    '& > *': {
      width: '100%',
    },
  },

  [`@media (${Queries.tablet.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.desktop.min})`]: {
    gridGap: Spacing.lg,
  },

  '& > *:not(umd-feed-articles):first-child': {
    [`@media (${Queries.tablet.min})`]: {
      position: 'sticky',
      top: '32px',
    },
  },
};

export default {
  '.umd-sticky-listing': {
    ...Sticky,
  },
};
