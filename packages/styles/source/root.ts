import { color, font, spacing } from './token';
import { sans } from './typography';
import { input } from './element/field/input';
import { textarea } from './element/field/textarea';
import { select } from './element/field/select';
import { label } from './element/text/label';

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
    backgroundColor: color.gray.light,
    border: 'none',
    height: '1px',
  },

  li: {
    ...sans.medium,
    color: color.gray.dark,
  },

  date: {
    color: color.black,
  },

  p: {
    ...sans.medium,
    color: color.gray.dark,
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
    '--red': color.red,
    '--gold': color.gold,
    '--blue': color.blue,
    '--green': color.green,
    '--white': color.white,
    '--black': color.black,
    '--redDark': color.redDark,
    '--grayDarker': color.gray.darker,
    '--grayDark': color.gray.dark,
    '--grayAA': color.gray.mediumAA,
    '--gray': color.gray.medium,
    '--grayLight': color.gray.light,
    '--grayLighter': color.gray.lighter,
    '--grayLightest': color.gray.lightest,
    '--serif': font.family.serif,
    '--sanSerif': font.family.sans,
    FontFamily: font.family.sans,
    FontSize: font.size.base,
    lineHeight: '1.5em',
  },

  ...reset,
};
