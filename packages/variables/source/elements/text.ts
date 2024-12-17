import { Colors, Font, Spacing } from '../tokens';
import { sans } from '../typography';
import { line as lineAnimations } from '../animations';
import Lists from './list';

const Base = {
  ...sans.small,
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
    FontWeight: Font.weight.bold,
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
  ...sans.medium,

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
    fontSize: Font.size.min,
  },

  '& sub': {
    fontSize: Font.size.min,
  },

  '& small': {
    ...sans.smaller,
    display: 'inline-block',
  },
};

const Simple = {
  ...Base,
};

const SimpleLarge = {
  ...Base,
  ...sans.medium,
};

const RichText = {
  FontWeight: Font.weight.normal,
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
    ...lineAnimations.fadeUnder.dark,
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
