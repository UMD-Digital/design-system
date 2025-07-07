import * as Styles from '@universityofmaryland/web-styles-library';
import postcss from 'postcss';

const postcssNesting = require('postcss-nesting');
const postcssJs = require('postcss-js');

export * as animations from './animations';
export * as assets from './assets';
export * as media from './media';

export const combineStyles = (...styles: (string | null | undefined)[]) =>
  styles.filter(Boolean).join('');

export const convertJSSObjectToStyles = ({ styleObj }: { styleObj: any }) =>
  postcss([postcssNesting]).process(styleObj, {
    parser: postcssJs,
  }).css;

export const convertPixelStringToNumber = (styleStr: string) =>
  parseInt(styleStr.replace('px', ''));

export const getStyleStringFromJssObject = (styleObj: Styles.JssEntry) =>
  convertJSSObjectToStyles({
    styleObj: {
      [`.${styleObj.className}`]: styleObj,
    },
  });
