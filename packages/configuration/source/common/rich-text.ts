import { colors } from '../tokens/colors';
import { fontFamily, fontWeight } from '../tokens/fonts';
import { spacing } from '../tokens/layout';
import { icons } from '../assets/icons';
import { typography } from './typography';
import { richTextLists } from './rich-text-lists';
import { animatedLinks } from '../common/animated-links';

const richTextBase = {
  '.umd-rich-text-base': {
    '& > *': {
      marginTop: spacing.md,

      '&:first-child': {
        marginTop: '0',
      },
    },

    [`& p,
    & ul,
    & ol,
    & pre,
    & blockquote`]: {
      maxWidth: '960px',
    },

    '& hr': {
      border: 'none',
      height: '1px',
      backgroundColor: 'currentColor',
    },

    '& em, & i': {
      fontStyle: 'italic',
    },

    '& strong, & b': {
      fontWeight: fontWeight.black,
    },

    '& u': {
      textDecoration: 'underline',
    },

    '& a': {
      color: 'currentColor',
      textDecoration: 'underline',
      transition: 'color 0.5s',

      '&:hover, &:focus': {
        color: colors.red,
      },
    },

    '& img': {
      maxWidth: '100%',
    },
  },
};

const richTextCoding = {
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

const richTextQuotes = {
  '.umd-rich-text-inline-quote': {
    '& blockquote': {
      ...typography['.umd-sans-larger'],
      ...{
        display: 'inline-block',
        borderLeft: `2px solid ${colors.red}`,
        position: 'relative',
        paddingLeft: spacing.md,

        '&:before': {
          content: '""',
          backgroundImage: `url('${icons.quoteRed}')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          position: 'absolute',
          top: '0',
          left: '-40px',
          height: '30px',
          width: '30px',
        },
      },
    },
  },
};

const richTextTables = {
  '.umd-rich-text-inline-table': {
    '& table': {
      borderCollapse: 'collapse',
      display: 'block',
      overflowX: 'auto',
      tableLayout: 'fixed',
      maxWidth: '100%',

      '& th': typography['.umd-sans-large'],
      '& td': typography['.umd-sans-smaller'],

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

const richText = {
  '.umd-rich-text': {
    fontWeight: fontWeight.medium,

    ...richTextBase['.umd-rich-text-base'],
    ...richTextCoding['.umd-rich-text-coding'],
    ...richTextQuotes['.umd-rich-text-inline-quote'],
    ...richTextTables['.umd-rich-text-inline-table'],
    ...richTextLists['.umd-rich-text-lists'],
  },

  '.umd-rich-text-dark': {
    color: colors.white,

    '& a': {
      ...animatedLinks['.umd-fadein-simple-dark'],
    },
  },
};

export {
  richText,
  richTextBase,
  richTextCoding,
  richTextQuotes,
  richTextTables,
  richTextLists,
};
