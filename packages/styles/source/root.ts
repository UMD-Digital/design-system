import { colors, font, spacing } from './tokens';
import { sans } from './typography';
import { input } from './elements-styles/field/input';
import { textarea } from './elements-styles/field/textarea';
import { select } from './elements-styles/field/select';
import { label } from './elements-styles/text/label';

export const reset = {
  body: {
    overscrollBehavior: 'none',
  },

  'h1, h2, h3, h4, h5, h6': {
    marginBottom: '0',
    fontSize: '16px',
    lineHeight: '1.4em',
    fontWeight: 'normal',
  },

  hr: {
    margin: `${spacing.lg} 0`,
    backgroundColor: colors.gray.light,
    border: 'none',
    height: '1px',
  },

  li: {
    ...sans.medium,
    color: colors.gray.dark,
  },

  date: {
    color: colors.black,
  },

  p: {
    ...sans.medium,
    color: colors.gray.dark,
    marginBottom: spacing.md,

    '&:last-child': {
      marginBottom: '0',
    },
  },

  address: {
    fontStyle: 'normal',
  },

  label: {
    ...label,
  },

  input: {
    ...input,
  },

  textarea: {
    ...textarea,
  },

  select: {
    ...select,
  },
};

// border: 0,
// borderBottom: '1px solid transparent',

export const root = {
  ':root': {
    '--red': colors.red,
    '--gold': colors.gold,
    '--blue': colors.blue,
    '--green': colors.green,
    '--white': colors.white,
    '--black': colors.black,
    '--redDark': colors.redDark,
    '--grayDarker': colors.gray.darker,
    '--grayDark': colors.gray.dark,
    '--grayAA': colors.gray.mediumAA,
    '--gray': colors.gray.medium,
    '--grayLight': colors.gray.light,
    '--grayLighter': colors.gray.lighter,
    '--grayLightest': colors.gray.lightest,
    '--serif': font.family.serif,
    '--sanSerif': font.family.sans,
    FontFamily: font.family.sans,
    FontSize: font.size.base,
    lineHeight: '1.5em',
  },

  ...reset,
};
