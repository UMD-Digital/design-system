import {
  fontFaceInterstateLight,
  fontFaceInterstateNormal,
  fontFaceInterstateBold,
  fontFaceInterstateBlack,
} from './font-face-interstate';

const fontFace = {
  '@font-face': [
    fontFaceInterstateLight['@font-face'],
    fontFaceInterstateNormal['@font-face'],
    fontFaceInterstateBold['@font-face'],
    fontFaceInterstateBlack['@font-face'],
  ],
};

const fontSize = {
  min: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '22px',
  '3xl': '24px',
  '4xl': '32px',
  '5xl': '48px',
  '6xl': '56px',
  '7xl': '64px',
  '8xl': '72px',
  '9xl': '80px',
  '10xl': '96px',
  max: '120px',
};

const fontWeight = {
  thin: '100',
  extraLight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
  extraBlack: '950',
};

const fontFamily = {
  campaign: "'Barlow Condensed', Arial Narrow, sans-serif",
  sans: "'Interstate', Helvetica, Arial, Verdana, sans-serif",
  serif: "'Crimson Pro', Georgia, serif",
  mono: 'monospace',
};

export { fontFace, fontFamily, fontSize, fontWeight };
