import { colors } from '../tokens/colors';
import { fontWeight } from '../tokens/fonts';
import { spacing } from '../tokens/spacing';
import Animations from '../animations';
import Lists from '../elements/list';

const TextBase = {
  '.umd-text-base': {
    lineHeight: '1.5em',

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
      fontWeight: fontWeight.bold,
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

const Text = {
  '.umd-text': {
    fontWeight: fontWeight.normal,

    ...TextBase['.umd-text-base'],
    ...Lists,
  },

  '.umd-text-dark': {
    color: colors.white,

    '& a': {
      ...Animations.LinkLineFade['.fadein-simple-dark'],
    },
  },
};

export { TextBase, Text };
