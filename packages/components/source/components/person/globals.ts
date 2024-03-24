export const SLOTS = {
  IMAGE: 'image',
  NAME: 'name',
  TEXT: 'text',
  SUB_TEXT: 'sub-text',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-person',
  ATTRIBUTE_THEME: 'theme',
  THEME_LIGHT: 'light',
  THEME_DARK: 'dark',
};
export const REFERENCES = {
  IS_THEME_DARK: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_DARK}']`,
  IS_THEME_LIGHT: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_LIGHT}']`,
};
