import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing, Queries } = Tokens;

const PeopleListing = {
  borderBottom: `1px solid ${Colors.gray.light}`,
  display: 'grid',
  gap: Spacing.sm,
  position: 'relative',
  marginTop: Spacing.sm,

  '&:has(> figure)': {
    gridTemplateColumns: '18% auto',
    paddingLeft: Spacing.sm,

    [`@media (${Queries.medium.max})`]: {
      paddingLeft: '0',
    },

    '& .listing-content': {
      marginTop: Spacing.min,

      [`@media (${Queries.medium.max})`]: {
        marginTop: '0',
      },
    },
  },

  '&:not(:has(> figure))': {
    gridTemplateColumns: '1fr',

    [`@media (${Queries.medium.max})`]: {
      paddingLeft: '0',
    },
  },

  [`@media (${Queries.tablet.max})`]: {
    gap: Spacing.min,
  },

  '& .listing-content': {
    marginBottom: Spacing.sm,
    textWrap: 'pretty',
  },

  '& > figure': {
    marginBottom: Spacing.md,
    transition: 'margin 0.5s ease-in-out',
  },

  '& .listing-title': {
    marginBottom: Spacing.min,

    '& > a': {
      color: 'currentColor',
    },
  },

  '& .listing-details': {
    color: Colors.gray.dark,
    marginTop: '0',
    marginBottom: '0',
  },

  '& .emphasized-details': {
    color: Colors.gray.dark,
    marginTop: Spacing.min,
    fontStyle: 'italic',
  },
};

const PeopleListingDark = {
  ...PeopleListing,
  ...{
    borderBottom: `1px solid ${Colors.gray.dark}`,
    color: Colors.white,

    '& .listing-details': {
      color: Colors.gray.lighter,
      marginTop: '0',
      marginBottom: '0',
    },

    '& .emphasized-details': {
      color: Colors.gray.lighter,
      marginTop: Spacing.min,
      fontStyle: 'italic',
    },
  },
};

export default {
  'umd-people-listing': {
    ...PeopleListing,
  },

  'umd-people-listing-dark': {
    ...PeopleListingDark,
  },
};
