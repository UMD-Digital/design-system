import { Typography, Fields, Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing, FontFamily } = Tokens;
const { Text } = Fields;

const RichTextCoding = {
  '.umd-rich-text-coding': {
    '& code, & pre': {
      border: `1px solid ${Colors.gray.lightest}`,
      backgroundColor: Colors.gray.lightest,
      borderRadius: '3px',
      color: 'currentColor',
      FontFamily: FontFamily.mono,
    },

    '& code': {
      display: 'inline-block',
      padding: `0 ${Spacing.min}`,
    },

    '& pre': {
      padding: Spacing.min,
    },
  },
};

const RichTextQuotes = {
  '.umd-rich-text-inline-quote': {
    '& blockquote': {
      ...Typography['.umd-sans-larger'],
      ...{
        display: 'inline-block',
        borderLeft: `2px solid ${Colors.red}`,
        position: 'relative',
        paddingLeft: Spacing.md,
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
        padding: `${Spacing.lg} ${Spacing.md}`,
        verticalAlign: 'top',

        '&:first-child': {
          paddingLeft: Spacing.lg,
        },

        '&:last-Child': {
          paddingRight: Spacing.lg,
        },
      },

      '& thead th': {
        background: Colors.gray.lighter,
        color: Colors.black,
        textAlign: 'left',
      },

      '& tbody tr': {
        borderTop: `1px solid ${Colors.gray.light}`,
      },

      '& tr:nth-child(even)': {
        background: Colors.gray.lightest,
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
