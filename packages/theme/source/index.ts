import { Tokens, Typography } from '@universityofmaryland/variables';

import Animations from './animations';
import Accessibility from './accessibility';
import Common from './common';
import Components from './components';
import Elements from './elements';
import Layout from './layout';
import WebComponents from './web-components';
import WebFeeds from './web-feeds';

const { Colors, fontFamily, fontSize } = Tokens;

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
    '--serif': fontFamily.serif,
    '--sanSerif': fontFamily.sans,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    lineHeight: '1.5em',
  },
};

const exposedTokens = Object.fromEntries(
  Object.entries(Tokens).map(([key, value]) => [key.toLowerCase(), value]),
);

export const base = {
  ...exposedTokens,
};

export const theme = {
  root,
  Accessibility,
  Animations,
  Common,
  Typography,
  Components,
  Elements,
  Layout,
  WebComponents,
  WebFeeds,
};
