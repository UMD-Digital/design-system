export const SLOTS = {
  STAT: 'stat',
  TEXT: 'text',
  SUB_TEXT: 'sub-text',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-stat',
  ATTRIBUTE_TYPE: 'type',
  ATTRIBUTE_THEME: 'theme',
  ATTRIBUTE_SIZE: 'size',
  ATTRIBUTE_HAS_LINE: 'has-line',
  THEME_LIGHT: 'light',
  THEME_DARK: 'dark',
  TYPE_DEFAULT: 'default',
  SIZE_DEFAULT: 'default',
  SIZE_LARGE: 'large',
};
export const REFERENCES = {
  IS_THEME_DARK: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_DARK}']`,
  IS_THEME_LIGHT: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_LIGHT}']`,
  IS_SIZE_LARGE: `[${VARIABLES.ATTRIBUTE_SIZE}='${VARIABLES.SIZE_LARGE}']`,
  IS_WITH_LINE: `[${VARIABLES.ATTRIBUTE_HAS_LINE}]`,
};