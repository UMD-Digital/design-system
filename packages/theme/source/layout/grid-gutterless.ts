import { Tokens } from '@universityofmaryland/variables';

const { Queries, Spacing, Colors } = Tokens;

const GutterlessTwoColumn = {
  display: 'grid',
  gridGap: Spacing.min,

  [`@media (${Queries.large.min})`]: {
    gridGap: `0px`,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

const GutterlessThreeColumn = {
  display: 'grid',
  gridGap: Spacing.min,

  [`@media (${Queries.large.min})`]: {
    gridGap: `0px`,
  },

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const GutterlessFourColumn = {
  display: 'grid',
  gridGap: Spacing.min,

  [`@media (${Queries.large.min})`]: {
    gridGap: `0px`,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

const GutterlessBoarder = {
  border: `1px solid ${Colors.gray.light}`,
  borderBottom: `none`,
};

const GutterlessBoarderDark = {
  border: `1px solid ${Colors.gray.dark}`,
  borderBottom: `none`,
};

const GutterlessTwoColumnBorder = {
  ...GutterlessTwoColumn,
  ...GutterlessBoarder,

  '& > *': {
    borderBottom: `1px solid ${Colors.gray.light}`,
    borderRight: `1px solid ${Colors.gray.light}`,
  },

  '& > *:first-child, & > *:nth-child(2)': {
    borderTop: `none`,
  },

  '& > *:nth-of-type(2n)': {
    borderRight: `none`,
  },
};

const GutterlessThreeColumnBorder = {
  ...GutterlessThreeColumn,
  ...GutterlessBoarder,

  '& > *': {
    borderBottom: `1px solid ${Colors.gray.light}`,
    borderRight: `1px solid ${Colors.gray.light}`,
  },

  '& > *:first-child, & > *:nth-child(2), & > *:nth-child(3)': {
    borderTop: `none`,
  },

  '& > *:nth-of-type(3n)': {
    borderRight: `none`,
  },
};

const GutterlessFourColumnBorder = {
  ...GutterlessFourColumn,
  ...GutterlessBoarder,

  '& > *': {
    borderBottom: `1px solid ${Colors.gray.light}`,
    borderRight: `1px solid ${Colors.gray.light}`,
  },

  '& > *:first-child, & > *:nth-child(2), & > *:nth-child(3), & > *:nth-child(4)':
    {
      borderTop: `none`,
    },

  '& > *:nth-of-type(4n)': {
    borderRight: `none`,
  },
};

export const GridColumnsGutterless = {
  '.umd-grid': {
    ...GutterlessTwoColumn,
  },

  '.umd-grid-three': {
    ...GutterlessThreeColumn,
  },

  '.umd-grid-four': {
    ...GutterlessFourColumn,
  },
};

const GridColumnsGutterlessBorder = {
  '.umd-grid-border': {
    ...GutterlessTwoColumnBorder,
  },

  '.umd-grid-three-border': {
    ...GutterlessThreeColumnBorder,
  },

  '.umd-grid-four-border': {
    ...GutterlessFourColumnBorder,
  },
};

const GridColumnsGutterlessBorderDark = {
  '.umd-grid-border-dark': {
    ...GutterlessTwoColumnBorder,
    ...GutterlessBoarderDark,

    '& > *': {
      borderBottom: `1px solid ${Colors.gray.dark}`,
      borderRight: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:first-child, & > *:nth-child(2)': {
      borderTop: `none`,
    },

    '& > *:nth-of-type(2n)': {
      borderRight: `none`,
    },
  },

  '.umd-grid-three-border-dark': {
    ...GutterlessThreeColumnBorder,
    ...GutterlessBoarderDark,

    '& > *': {
      borderBottom: `1px solid ${Colors.gray.dark}`,
      borderRight: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:first-child, & > *:nth-child(2), & > *:nth-child(3)': {
      borderTop: `none`,
    },

    '& > *:nth-of-type(3n)': {
      borderRight: `none`,
    },
  },

  '.umd-grid-four-border-dark': {
    ...GutterlessFourColumnBorder,
    ...GutterlessBoarderDark,

    '& > *': {
      borderBottom: `1px solid ${Colors.gray.dark}`,
      borderRight: `1px solid ${Colors.gray.dark}`,
    },

    '& > *:first-child, & > *:nth-child(2), & > *:nth-child(3), & > *:nth-child(4)':
      {
        borderTop: `none`,
      },

    '& > *:nth-of-type(4n)': {
      borderRight: `none`,
    },
  },
};

export default {
  ...GridColumnsGutterless,
  ...GridColumnsGutterlessBorder,
  ...GridColumnsGutterlessBorderDark,
};
