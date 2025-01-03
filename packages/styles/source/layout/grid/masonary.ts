import { spacing, media } from '../../tokens';
import { create } from '../../utilities';

// umd-layout-grid-masonry
export const twoColumn = create.jssObject({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: spacing.md,

  className: [
    `umd-layout-grid-masonry`,
    /** @deprecated Use 'umd-layout-grid-masonry' instead */
    'umd-grid-gap-masonry',
  ],

  [`@media (${media.queries.tablet.min})`]: {
    gridTemplateColumns: '1fr 1fr',
    gridGap: spacing.lg,
  },

  [`@media (${media.queries.desktop.min})`]: {
    gridGap: spacing.xl,
  },

  '& > *': {
    '& > *': {
      width: '100%',
      height: '100%',
    },
  },

  '& > *:nth-of-type(odd)': {
    [`@media (${media.queries.tablet.min})`]: {
      marginTop: `-${spacing.lg}`,
      marginBottom: `${spacing.lg}`,
    },

    [`@media (${media.queries.desktop.min})`]: {
      marginTop: `-${spacing.xl}`,
      marginBottom: `${spacing.xl}`,
    },
  },

  '& > *:nth-of-type(even)': {
    [`@media (${media.queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:first-child': {
    [`@media (${media.queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:nth-of-type(2)': {
    [`@media (${media.queries.tablet.min})`]: {
      marginTop: `${spacing.lg}`,
    },

    [`@media (${media.queries.desktop.min})`]: {
      marginTop: `${spacing.xl}`,
    },
  },
});
