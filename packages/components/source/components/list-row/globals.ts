export const ELEMENTS = {
  HERO_CONTAINER: `umd-list-row-container`,
};
export const SLOTS = {
  IMAGE: 'image',
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  DATE: 'date',
  ACTIONS: 'actions',
  DATEBLOCK: 'date-block',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-list-row',
  ATTRIBUTE_THEME: 'theme',
  THEME_LIGHT: 'light',
  THEME_DARK: 'dark',
};
export const REFERENCES = {
  IS_THEME_DARK: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_DARK}']`,
  IS_THEME_LIGHT: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_LIGHT}']`,
};
