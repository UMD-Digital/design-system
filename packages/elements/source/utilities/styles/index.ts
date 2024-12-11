import postcss from 'postcss';
import * as Fonts from './fonts';

const postcssNesting = require('postcss-nesting');

const postcssJs = require('postcss-js');

const CombineStyles = (...styles: string[]) => styles.join('');

const ConvertJSSObjectToStyles = ({ styleObj }: { styleObj: any }) =>
  postcss([postcssNesting]).process(styleObj, {
    parser: postcssJs,
  }).css;

const ConvertPixelStringToNumber = (styleStr: string) =>
  parseInt(styleStr.replace('px', ''));

export default {
  Fonts,
  CombineStyles,
  ConvertJSSObjectToStyles,
  ConvertPixelStringToNumber,
};
