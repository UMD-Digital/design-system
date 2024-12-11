import postcss from 'postcss';
import * as animations from './animations';
import * as fonts from './fonts';

const postcssNesting = require('postcss-nesting');

const postcssJs = require('postcss-js');

const combineStyles = (...styles: string[]) => styles.join('');

const convertJSSObjectToStyles = ({ styleObj }: { styleObj: any }) =>
  postcss([postcssNesting]).process(styleObj, {
    parser: postcssJs,
  }).css;

const convertPixelStringToNumber = (styleStr: string) =>
  parseInt(styleStr.replace('px', ''));

export default {
  animations,
  fonts,
  combineStyles,
  convertJSSObjectToStyles,
  convertPixelStringToNumber,
};
