import { Tokens, Typography } from '@universityofmaryland/variables';

import Animations from './animations';
import Accessibility from './accessibility';
import Common from './common';
import Elements from './elements';
import Layout from './layout';
import WebComponents from './web-components';

const { Colors, FontFamily, FontSize } = Tokens;
const { SansMedium } = Typography;

const Reset = {
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
    margin: `${Tokens.Spacing.lg} 0`,
    backgroundColor: Colors.gray.light,
    border: 'none',
    height: '1px',
  },

  li: {
    ...SansMedium,
    color: Colors.gray.dark,
  },

  date: {
    color: Colors.black,
  },

  p: {
    ...SansMedium,
    color: Colors.gray.dark,
    marginBottom: Tokens.Spacing.md,

    '&:last-child': {
      marginBottom: '0',
    },
  },

  address: {
    fontStyle: 'normal',
  },
};

const root = {
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
    '--serif': FontFamily.serif,
    '--sanSerif': FontFamily.sans,
    FontFamily: FontFamily.sans,
    FontSize: FontSize.base,
    lineHeight: '1.5em',
  },

  ...Reset,
};

export const base = Tokens;
export const theme = {
  root,
  Accessibility,
  Animations,
  Common,
  Elements,
  Layout,
  WebComponents,
};
