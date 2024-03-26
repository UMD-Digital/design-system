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
    gridTemplateColumns: 'repeat(2, 1fr)',
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

  '& > *': {
    borderRight: `1px solid ${Colors.gray.light}`,
  },
};

const GutterlessBoarderDark = {
  border: `1px solid ${Colors.gray.dark}`,

  '& > *': {
    borderRight: `1px solid ${Colors.gray.dark}`,
  },
};

const GutterlessTwoColumnBorder = {
  ...GutterlessTwoColumn,
  ...GutterlessBoarder,

  '& > *:first-child, & > *:nth-child(2)': {
    borderTop: `none`,
    borderBottom: `1px solid ${Colors.gray.light}`,
  },

  '& > *:nth-of-type(2n)': {
    borderRight: `none`,
  },
};

const GutterlessThreeColumnBorder = {
  ...GutterlessThreeColumn,
  ...GutterlessBoarder,

  '& > *:first-child, & > *:nth-child(2), & > *:nth-child(3)': {
    borderTop: `none`,
    borderBottom: `1px solid ${Colors.gray.light}`,
  },

  '& > *:nth-of-type(3n)': {
    borderRight: `none`,
  },
};

const GutterlessFourColumnBorder = {
  ...GutterlessFourColumn,
  ...GutterlessBoarder,

  '& > *:first-child, & > *:nth-child(2), & > *:nth-child(3), & > *:nth-child(4)':
    {
      borderTop: `none`,
      borderBottom: `1px solid ${Colors.gray.light}`,
    },

  '& > *:nth-of-type(4n)': {
    borderRight: `none`,
  },
};

export const GridColumnsGutterless = {
  '.umd-grid-gutterless-two': {
    ...GutterlessTwoColumn,
  },

  '.umd-grid-gutterless-three': {
    ...GutterlessThreeColumn,
  },

  '.umd-grid-gutterless-four': {
    ...GutterlessFourColumn,
  },
};

const GridColumnsGutterlessBorder = {
  '.umd-grid-gutterless-border-two': {
    ...GutterlessTwoColumnBorder,
  },

  '.umd-grid-gutterless-border-three': {
    ...GutterlessThreeColumnBorder,
  },

  '.umd-grid-gutterless-border-four': {
    ...GutterlessFourColumnBorder,
  },
};

const GridColumnsGutterlessBorderDark = {
  '.umd-grid-gutterless-border-two-dark': {
    ...GutterlessTwoColumnBorder,
    ...GutterlessBoarderDark,

    '& > *:first-child, & > *:nth-child(2)': {
      borderBottom: `1px solid ${Colors.gray.dark}`,
    },
  },

  '.umd-grid-gutterless-border-three-dark': {
    ...GutterlessThreeColumnBorder,
    ...GutterlessBoarderDark,

    '& > *:first-child, & > *:nth-child(2), & > *:nth-child(3)': {
      borderBottom: `1px solid ${Colors.gray.dark}`,
    },
  },

  '.umd-grid-gutterless-border-four-dark': {
    ...GutterlessFourColumnBorder,
    ...GutterlessBoarderDark,

    '& > *:first-child, & > *:nth-child(2), & > *:nth-child(3), & > *:nth-child(4)':
      {
        borderBottom: `1px solid ${Colors.gray.dark}`,
      },
  },
};

export default {
  ...GridColumnsGutterless,
  ...GridColumnsGutterlessBorder,
  ...GridColumnsGutterlessBorderDark,
};
