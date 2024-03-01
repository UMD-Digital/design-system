export const BREAKPOINTS = { small: 480 };
export const ELEMENTS = {
  CONTAINER_NAME: 'umd-element-accordion-item-container',
  ACCORDION_HEADLINE: 'umd-accordion-item-headline',
  ACCORDION_BODY_WRAPPER: 'umd-accordion-body-wrapper',
  ACCORDION_BODY: 'umd-accordion-body',
};
export const SLOTS = { HEADLINE: 'headline', BODY: 'body' };
export const VARIABLES = {
  ATTRIBUTE_THEME: 'theme',
  THEME_DARK: 'dark',
  THEME_DEFAULT: 'light',
  ATTRIBUTE_OPEN: 'open',
  OPEN_DEFAULT: false,
};

export const NAMING = {
  THEME_DARK_ATTR: `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_DARK}']`,
};

export const ELEMENT_NAME = 'umd-element-accordion-item';
