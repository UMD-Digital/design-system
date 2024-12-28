import { Spacing, Media } from '../../tokens';
import { create } from '../../utilities';

// umd-layout-grid-masonry
export const twoColumn = create.jssObject({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.md,

  className: [
    `umd-layout-grid-masonry`,
    /** @deprecated Use 'umd-layout-grid-masonry' instead */
    'umd-grid-gap-masonry',
  ],

  [`@media (${Media.queries.tablet.min})`]: {
    gridTemplateColumns: '1fr 1fr',
    gridGap: Spacing.lg,
  },

  [`@media (${Media.queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },

  '& > *': {
    '& > *': {
      width: '100%',
      height: '100%',
    },
  },

  '& > *:nth-of-type(odd)': {
    [`@media (${Media.queries.tablet.min})`]: {
      marginTop: `-${Spacing.lg}`,
      marginBottom: `${Spacing.lg}`,
    },

    [`@media (${Media.queries.desktop.min})`]: {
      marginTop: `-${Spacing.xl}`,
      marginBottom: `${Spacing.xl}`,
    },
  },

  '& > *:nth-of-type(even)': {
    [`@media (${Media.queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:first-child': {
    [`@media (${Media.queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:nth-of-type(2)': {
    [`@media (${Media.queries.tablet.min})`]: {
      marginTop: `${Spacing.lg}`,
    },

    [`@media (${Media.queries.desktop.min})`]: {
      marginTop: `${Spacing.xl}`,
    },
  },
});
