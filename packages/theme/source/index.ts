import { Tokens, Typography } from '@universityofmaryland/variables';

import Animations from './animations';
import Accessibility from './accessibility';
import Common from './common';
import Components from './components';
import Elements from './elements';
import Layout from './layout';
import WebComponents from './web-components';
import WebFeeds from './web-feeds';

const { colors, fontFamily, fontSize } = Tokens;

const root = {
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
    '--serif': fontFamily.serif,
    '--sanSerif': fontFamily.sans,
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    lineHeight: '1.5em',
  },
};

export const base = {
  ...Tokens,
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
