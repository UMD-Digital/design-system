import { Typography, Fields, Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing, FontFamily } = Tokens;
const { RichText, RichTextDark } = Fields;
const { SansSmaller, SansLarge, SansLarger } = Typography;

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
      ...SansLarger,
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

      '& th': SansLarge,
      '& td': SansSmaller,

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

export default {
  '.umd-rich-text': {
    ...RichText,
    ...RichTextCoding['.umd-rich-text-coding'],
    ...RichTextQuotes['.umd-rich-text-inline-quote'],
    ...RichTextTables['.umd-rich-text-inline-table'],
  },

  '.umd-rich-text-dark': {
    ...RichTextDark,
  },
};
