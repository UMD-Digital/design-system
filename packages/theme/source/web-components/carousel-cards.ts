import { Tokens } from '@universityofmaryland/variables';

const { colors, spacing, queries } = Tokens;

export default {
  'umd-element-carousel-cards:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel-cards:defined': {
    display: 'block',

    '& [slot="headline"], & [slot="text"], & [slot="cta"]': {
      textWrap: 'pretty',
      marginTop: spacing.sm,

      [`@media (${queries.large.min})`]: {
        marginTop: spacing.md,
      },
    },

    '&:first-child': {
      marginTop: 0,
    },

    '& .umd-cta-secondary': {
      color: colors.white,
    },
  },
};
