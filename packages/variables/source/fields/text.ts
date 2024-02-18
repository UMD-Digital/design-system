import { Colors } from '../tokens/colors';
import { FontWeight } from '../tokens/fonts';
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
      FontWeight: FontWeight.bold,
    },

    '& u': {
      textDecoration: 'underline',
    },

    '& a': {
      color: 'currentColor',
      textDecoration: 'underline',
      transition: 'color 0.5s',

      '&:hover, &:focus': {
        color: Colors.red,
      },
    },

    '& img': {
      maxWidth: '100%',
    },
  },
};

const Text = {
  '.umd-text': {
    FontWeight: FontWeight.normal,

    ...TextBase['.umd-text-base'],
    ...Lists,
  },

  '.umd-text-dark': {
    color: Colors.white,

    '& a': {
      ...Animations.LinkLineFade['.fadein-simple-dark'],
    },
  },
};

export { TextBase, Text };
