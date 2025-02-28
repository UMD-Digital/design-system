import * as Styles from '@universityofmaryland/web-styles-library';
import postcss from 'postcss';

const postcssNesting = require('postcss-nesting');
const postcssJs = require('postcss-js');

export * as animations from './animations';
export * as assets from './assets';

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

// To be deleted after refactor is done.

export const parseNestedJSStoCSS = (
  styles: Record<string, any>,
  className: string,
) => {
  const toKebabCase = (str: string) => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  };

  const processStyles = (obj: Record<string, any>, selector: string) => {
    let css = `${selector} {\n`;

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') continue;

      const property = toKebabCase(key);
      css += `  ${property}: ${value};\n`;
    }

    css += '}\n';
    return css;
  };

  let result = '';

  for (const [key, value] of Object.entries(styles)) {
    if (typeof value !== 'object') continue;

    let selector;
    switch (key) {
      case 'element':
        selector = `.${className}`;
        break;
      case 'siblingAfter':
        selector = `* + .${className}`;
        break;
      case 'subElement':
        selector = `.${className} + *`;
        break;
      default:
        selector = `.${className}-${key}`;
    }

    result += processStyles(value, selector);
  }

  return result;
};
