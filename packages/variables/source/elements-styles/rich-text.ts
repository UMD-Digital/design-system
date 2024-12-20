import { Colors, Font, Spacing } from '../tokens';
import { sans } from '../typography';
import { line } from '../animations';
import * as lists from './list';

export const simpleBase = {
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

export const advancedBase = {
  ...simpleBase,
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

export const simple = {
  ...simpleBase,
};

export const simpleLarge = {
  ...simpleBase,
  ...sans.medium,
};

export const advanced = {
  FontWeight: Font.weight.normal,
  ...advancedBase,
  ...lists.ordered,
  ...lists.unordered,
};

export const advancedDarkAnimations = {
  color: Colors.white,

  '& *': {
    color: Colors.white,
  },

  '& a': {
    ...line.fadeUnderBlack,
  },
};

export const advancedDark = {
  ...advanced,
  ...advancedDarkAnimations,
};
