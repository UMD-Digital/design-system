import { Colors } from '../tokens/colors';
import { FontSize, FontWeight } from '../tokens/fonts';
import { Spacing } from '../tokens/spacing';
import { SansSmall, SansMedium, SansSmaller } from '../typography/sans';
import Animations from '../animations';
import Lists from './list';

const { Link } = Animations;

const Base = {
  ...SansSmall,
  lineHeight: '1.5em',

  '& > *': {
    marginTop: Spacing.md,

    '&:first-child': {
      marginTop: '0',
    },
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
};

const RichTextBase = {
  ...Base,
  ...SansMedium,

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

  '& img': {
    maxWidth: '100%',
  },

  '& sup': {
    fontSize: FontSize.min,
  },

  '& sub': {
    fontSize: FontSize.min,
  },

  '& small': {
    ...SansSmaller,
    display: 'inline-block',
  },
};

const Simple = {
  ...Base,
};

const SimpleLarge = {
  ...Base,
  ...SansMedium,
};

const RichText = {
  FontWeight: FontWeight.normal,
  ...RichTextBase,
  ...Lists.Base,
  ...Lists.Ordered,
  ...Lists.Unordered,
};

const RichTextDarkAnimations = {
  color: Colors.white,

  '& *': {
    color: Colors.white,
  },

  '& a': {
    ...Link.LineFadeUnder.dark,
  },
};

const RichTextDark = {
  ...RichText,
  ...RichTextDarkAnimations,
};

export default {
  Simple,
  SimpleLarge,
  RichText,
  RichTextDarkAnimations,
  RichTextDark,
};
