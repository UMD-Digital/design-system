import { Colors } from '../tokens/colors';
import { FontWeight } from '../tokens/fonts';
import { Spacing } from '../tokens/spacing';
import Animations from '../animations';
import Lists from '../elements/list';

const TextBase = {
  lineHeight: '1.5em',

  '& > *': {
    marginTop: Spacing.md,

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
};

const Text = {
  FontWeight: FontWeight.normal,
  ...TextBase,
  ...Lists,
};

const TextDark = {
  color: Colors.white,

  '& a': {
    ...Animations.LinkLineFade['.fadein-simple-dark'],
  },
};

export { Text, TextDark };
