import { Typography, UmdFields, Tokens } from '@universityofmaryland/variables';

const { colors, spacing, fontFamily } = Tokens;
const { Text } = UmdFields;

const RichTextCoding = {
  '.umd-rich-text-coding': {
    '& code, & pre': {
      border: `1px solid ${colors.gray.lightest}`,
      backgroundColor: colors.gray.lightest,
      borderRadius: '3px',
      color: 'currentColor',
      fontFamily: fontFamily.mono,
    },

    '& code': {
      display: 'inline-block',
      padding: `0 ${spacing.min}`,
    },

    '& pre': {
      padding: spacing.min,
    },
  },
};

const RichTextQuotes = {
  '.umd-rich-text-inline-quote': {
    '& blockquote': {
      ...Typography['.umd-sans-larger'],
      ...{
        display: 'inline-block',
        borderLeft: `2px solid ${colors.red}`,
        position: 'relative',
        paddingLeft: spacing.md,
      },
    },
  },
};

const RichTextTables = {
  '.umd-rich-text-inline-table': {
    '& table': {
      borderCollapse: 'collapse',
      display: 'block',
      overflowX: 'auto',
      tableLayout: 'fixed',
      maxWidth: '100%',

      '& th': Typography['.umd-sans-large'],
      '& td': Typography['.umd-sans-smaller'],

      '& th, & td': {
        padding: `${spacing.lg} ${spacing.md}`,
        verticalAlign: 'top',

        '&:first-child': {
          paddingLeft: spacing.lg,
        },

        '&:last-Child': {
          paddingRight: spacing.lg,
        },
      },

      '& thead th': {
        background: colors.gray.lighter,
        color: colors.black,
        textAlign: 'left',
      },

      '& tbody tr': {
        borderTop: `1px solid ${colors.gray.light}`,
      },

      '& tr:nth-child(even)': {
        background: colors.gray.lightest,
      },
    },
  },
};

const RichText = {
  '.umd-rich-text': {
    ...Text['.umd-text'],
    ...RichTextCoding['.umd-rich-text-coding'],
    ...RichTextQuotes['.umd-rich-text-inline-quote'],
    ...RichTextTables['.umd-rich-text-inline-table'],
  },

  '.umd-rich-text-dark': {
    ...Text['.umd-text-dark'],
  },
};

export { RichText, RichTextCoding, RichTextQuotes, RichTextTables };
