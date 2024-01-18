import { colors, fontFamily, fontSize } from '@universityofmaryland/variables';

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

export { root };
