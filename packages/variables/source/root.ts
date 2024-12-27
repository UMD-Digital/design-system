import { Colors, Font, Spacing } from './tokens';
import { sans } from './typography';

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
    margin: `${Spacing.lg} 0`,
    backgroundColor: Colors.gray.light,
    border: 'none',
    height: '1px',
  },

  li: {
    ...sans.medium,
    color: Colors.gray.dark,
  },

  date: {
    color: Colors.black,
  },

  p: {
    ...sans.medium,
    color: Colors.gray.dark,
    marginBottom: Spacing.md,

    '&:last-child': {
      marginBottom: '0',
    },
  },

  address: {
    fontStyle: 'normal',
  },
};

export const Root = {
  ':root': {
    '--red': Colors.red,
    '--gold': Colors.gold,
    '--blue': Colors.blue,
    '--green': Colors.green,
    '--white': Colors.white,
    '--black': Colors.black,
    '--redDark': Colors.redDark,
    '--grayDarker': Colors.gray.darker,
    '--grayDark': Colors.gray.dark,
    '--grayAA': Colors.gray.mediumAA,
    '--gray': Colors.gray.medium,
    '--grayLight': Colors.gray.light,
    '--grayLighter': Colors.gray.lighter,
    '--grayLightest': Colors.gray.lightest,
    '--serif': Font.family.serif,
    '--sanSerif': Font.family.sans,
    FontFamily: Font.family.sans,
    FontSize: Font.size.base,
    lineHeight: '1.5em',
  },

  ...reset,
};
