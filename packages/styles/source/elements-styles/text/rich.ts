import { colors, font, spacing } from '../../tokens';
import { sans } from '../../typography';
import * as animations from '../../animations';
import { create } from '../../utilities';
import * as list from '../list';
import * as table from '../table';
import { code } from './code';
import { quote } from './quote';

// Consistent naming
const classNamePrefix = 'umd-text-rich';

const simpleBase = {
  '& > *': {
    ...sans.small,
    marginTop: spacing.md,
    lineHeight: '1.5em',

    '&:first-child': {
      marginTop: '0',
    },
  },

  '& em, & i': {
    fontStyle: 'italic',
  },

  '& strong, & b': {
    FontWeight: font.weight.bold,
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
};

const advancedBase = {
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
    fontSize: font.size.min,
  },

  '& sub': {
    fontSize: font.size.min,
  },

  '& small': {
    ...sans.smaller,
    display: 'inline-block',
  },
};

// umd-text-rich-simple
export const simple = create.jssObject({
  className: [
    `${classNamePrefix}-simple`,
    /** @deprecated Use 'umd-text-rich-simple' instead */
    `umd-text-simple`,
  ],
  ...simpleBase,
});

// umd-text-rich-simple-large
export const simpleLarge = create.jssObject({
  ...simpleBase,

  '& > *': {
    ...sans.medium,
  },

  className: [
    `${classNamePrefix}-simple-large`,
    /** @deprecated Use 'umd-text-rich-simple-large' instead */
    `umd-text-simple-large`,
  ],
});

// umd-text-rich-advanced
export const advanced = create.jssObject({
  FontWeight: font.weight.normal,

  ...advancedBase,
  ...code,
  ...quote,

  [`& ul,
    & ol ul`]: {
    ...list.unordered,
  },

  [`& ol,
    & ul ol`]: {
    ...list.ordered,
  },

  '& + ol, &ol + ul': {
    marginTop: spacing.sm,
  },

  '& table': {
    ...table.inline,
  },

  className: [
    `${classNamePrefix}-advanced`,
    /** @deprecated Use 'umd-text-rich-advanced' instead */
    `umd-rich-text`,
  ],
});

// umd-text-rich-advanced-dark
export const advancedDark = create.jssObject({
  ...advanced,
  ...animations.nestedElements.linksDark,

  color: colors.white,

  '& *': {
    color: colors.white,
  },

  className: [
    `${classNamePrefix}-advanced-dark`,
    /** @deprecated Use 'umd-text-rich-advanced-dark' instead */
    `umd-rich-text-dark`,
  ],
});
