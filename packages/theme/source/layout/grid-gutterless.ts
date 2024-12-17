import { Tokens } from '@universityofmaryland/variables';

const { Media, Spacing, Colors } = Tokens;

const BorderedChildren = {
  padding: Spacing.md,

  [`@media (${Media.queries.highDef.min})`]: {
    padding: Spacing['2xl'],
  },
};

const GutterlessTwoColumn = {
  display: 'grid',
  gridGap: Spacing.min,

  [`@media (${Media.queries.large.min})`]: {
    gridGap: `0px`,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

const GutterlessThreeColumn = {
  display: 'grid',
  gridGap: Spacing.min,

  [`@media (${Media.queries.large.min})`]: {
    gridGap: `0px`,
  },

  [`@media (${Media.queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const GutterlessFourColumn = {
  display: 'grid',
  gridGap: Spacing.min,

  [`@media (${Media.queries.large.min})`]: {
    gridGap: `0px`,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Media.queries.desktop.min})`]: {
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
    ...BorderedChildren,
  },

  '&:not(:has(> :last-child:nth-child(2)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },
  },
};

const GutterlessThreeColumnBorder = {
  ...GutterlessThreeColumn,
  ...GutterlessBoarder,

  '& > *': {
    borderBottom: `1px solid ${Colors.gray.light}`,
    borderRight: `1px solid ${Colors.gray.light}`,
    ...BorderedChildren,
  },

  '&:not(:has(> :last-child:nth-child(3)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },
  },
};

const GutterlessFourColumnBorder = {
  ...GutterlessFourColumn,
  ...GutterlessBoarder,

  '& > *': {
    borderBottom: `1px solid ${Colors.gray.light}`,
    borderRight: `1px solid ${Colors.gray.light}`,
    ...BorderedChildren,
  },

  '&:not(:has(> :last-child:nth-child(4)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },

    '& > *:nth-child(4)': {
      borderTop: `1px solid ${Colors.gray.light}`,
    },
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
      ...BorderedChildren,
    },

    '&:not(:has(> :last-child:nth-child(2)))': {
      borderTop: `none`,
      borderRight: `none`,

      '& > *:first-child': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },

      '& > *:nth-child(2)': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },
    },
  },

  '.umd-grid-three-border-dark': {
    ...GutterlessThreeColumnBorder,
    ...GutterlessBoarderDark,

    '& > *': {
      borderBottom: `1px solid ${Colors.gray.dark}`,
      borderRight: `1px solid ${Colors.gray.dark}`,
      ...BorderedChildren,
    },

    '&:not(:has(> :last-child:nth-child(3)))': {
      borderTop: `none`,
      borderRight: `none`,

      '& > *:first-child': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },

      '& > *:nth-child(2)': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },

      '& > *:nth-child(3)': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },
    },
  },

  '.umd-grid-four-border-dark': {
    ...GutterlessFourColumnBorder,
    ...GutterlessBoarderDark,

    '& > *': {
      borderBottom: `1px solid ${Colors.gray.dark}`,
      borderRight: `1px solid ${Colors.gray.dark}`,
      ...BorderedChildren,
    },

    '&:not(:has(> :last-child:nth-child(4)))': {
      borderTop: `none`,
      borderRight: `none`,

      '& > *:first-child': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },

      '& > *:nth-child(2)': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },

      '& > *:nth-child(3)': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },

      '& > *:nth-child(4)': {
        borderTop: `1px solid ${Colors.gray.dark}`,
      },
    },
  },
};

export default {
  ...GridColumnsGutterless,
  ...GridColumnsGutterlessBorder,
  ...GridColumnsGutterlessBorderDark,
};
