export const SLOTS = {
  STAT: 'stat',
  TEXT: 'text',
  SUB_TEXT: 'sub-text',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-stat',
  ATTRIBUTE_TYPE: 'type',
  ATTRIBUTE_THEME: 'theme',
  THEME_LIGHT: 'light',
  THEME_DARK: 'dark',
  TYPE_DEFAULT: 'default',
};
export const REFERENCES = {
  IS_THEME_DARK: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_DARK}']`,
  IS_THEME_LIGHT: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_LIGHT}']`,
};
