import { Tokens } from '@universityofmaryland/variables';

import Animations from './animations';
import Accessibility from './accessibility';
import Common from './common';
import Elements from './elements';
import Layout from './layout';
import WebComponents from './web-components';

const { Colors, FontFamily, FontSize } = Tokens;

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

  hr: {
    margin: `${Tokens.Spacing.lg} 0`,
    backgroundColor: Colors.gray.light,
    border: 'none',
    height: '1px',
  },
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
