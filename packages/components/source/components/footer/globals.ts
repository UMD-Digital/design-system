export const BREAKPOINTS = {
  SMALL: 280,
  MEDIUM: 650,
  LARGE: 1000,
};
export const ELEMENTS = {
  ELEMENT_WRAPPER: 'umd-footer-element-wrapper',
};
export const SLOTS = {
  CONTACT_HEADLINE: 'contact-headline',
  CONTACT_LINKS: 'contact-links',
  CONTACT_ADDRESS: 'contact-address',
  CTA: 'call-to-action',
  SOCIAL: 'social-links',
  UTILITY: 'utility-links',
  LINK_COLUMN_ONE: 'link-column-one',
  LINK_COLUMN_TWO: 'link-column-two',
  LINK_COLUMN_THREE: 'link-column-three',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-footer',
  ATTRIBUTE_THEME: 'theme',
  ATTRIBUTE_TYPE: 'type',
  VERSION_TYPE_MEGA: 'mega',
  VERSION_TYPE_VISUAL: 'visual',
  VERSION_TYPE_SIMPLE: 'simple',
  VERSION_TYPES: ['mega', 'visual', 'simple'],
  THEME_OPTION_DARK: 'dark',
  THEME_OPTION_LIGHT: 'light',
};
export const REFERENCES = {
  IS_THEME_LIGHT: `[${VARIABLES.ATTRIBUTE_THEME}="${VARIABLES.THEME_OPTION_LIGHT}"]`,
  IS_THEME_DARK: `[${VARIABLES.ATTRIBUTE_THEME}="${VARIABLES.THEME_OPTION_DARK}"]`,
  IS_VERSION_MEGA: `[${VARIABLES.ATTRIBUTE_TYPE}="${VARIABLES.VERSION_TYPE_MEGA}"]`,
  IS_VERSION_VISUAL: `[${VARIABLES.ATTRIBUTE_TYPE}="${VARIABLES.VERSION_TYPE_VISUAL}"]`,
  IS_VERSION_SIMPLE: `[${VARIABLES.ATTRIBUTE_TYPE}="${VARIABLES.VERSION_TYPE_SIMPLE}"]`,
};
