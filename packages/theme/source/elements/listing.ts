import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing, FontSize, Queries } = Tokens;

const Listing = {
  borderBottom: `1px solid ${Colors.gray.light}`,
  display: 'block',
  containerType: 'inline-size',
  containerName: 'umd-listing',
  paddingBottom: Spacing.sm,
  position: 'relative',

  '& > figure, & .umd-image-link': {
    float: 'right',
    width: '30%',
    marginBottom: Spacing.min,
    marginLeft: Spacing.min,
    transition: 'margin 0.5s ease-in-out',

    '@container umd-listing (min-width: 650px)': {
      marginLeft: Spacing.sm,
      marginBottom: Spacing.sm,
    },
  },

  '& .listing-content > *': {
    textWrap: 'pretty',
    marginBottom: Spacing.min,

    '&:first-child': {
      marginTop: '0',
    },

    '&:last-child': {
      marginBottom: '0',
    },
  },

  '& .listing-title': {
    '& svg': {
      display: 'inline',
      fill: 'currentColor',
      height: FontSize.sm,
      marginLeft: Spacing.min,
      verticalAlign: 'baseline',
      transition: 'height 0.5s ease-in-out, width 0.5s ease-in-out, fill 0.5s',
      width: FontSize.sm,

      '@container umd-listing (min-width: 650px)': {
        height: FontSize.lg,
        width: FontSize.lg,
      },
    },

    '& > a': {
      color: 'currentColor',
    },
  },

  '& .listing-datetime, & .listing-details': {
    color: Colors.gray.dark,
    marginTop: '0',
    marginBottom: '0',
  },

  '& .listing-text, & .umd-eyebrow': {
    color: Colors.gray.dark,
  },

  'umd-element-call-to-action': {
    paddingTop: Spacing.min,
  },
};

export default {
  'umd-listing': {
    ...Listing,
  },
};
