import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing, Queries } = Tokens;

export default {
  'umd-element-carousel-cards:not(:defined)': {
    display: 'none',
  },
  'umd-element-carousel-cards:defined': {
    display: 'block',

    '& [slot="headline"], & [slot="text"], & [slot="cta"]': {
      textWrap: 'pretty',
      marginTop: Spacing.sm,

      [`@media (${Queries.large.min})`]: {
        marginTop: Spacing.md,
      },
    },

    '&:first-child': {
      marginTop: 0,
    },

    '& .umd-cta-secondary': {
      color: Colors.white,
    },
  },
};
