export const ELEMENTS = {
  CTA_CONTAINER: 'umd-call-to-action-container',
  CTA_CONTAINER_ELEMENT: 'umd-call-to-action-element-container',
};
export const SLOTS = {
  PLAIN_TEXT: 'plain-text',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-call-to-action',
  ATTRIBUTE_PLAIN_TEXT: 'plain-text',
  ATTRIBUTE_TYPE: 'type',
  ATTRIBUTE_SIZE: 'size',
  ATTRIBUTE_THEME: 'theme',
  ATTRIBUTE_STYLE_PROPS: 'styleProps',
  TYPE_PRIMARY: 'primary',
  TYPE_SECONDARY: 'secondary',
  TYPE_OUTLINE: 'outline',
  SIZE_STANDARD: 'standard',
  SIZE_LARGE: 'large',
  THEME_LIGHT: 'light',
  THEME_DARK: 'dark',
};
export const REFERENCES = {
  IS_PRIMARY: `[${VARIABLES.ATTRIBUTE_TYPE}="${VARIABLES.TYPE_PRIMARY}"]`,
  IS_SECONDARY: `[${VARIABLES.ATTRIBUTE_TYPE}="${VARIABLES.TYPE_SECONDARY}"]`,
  IS_PLAIN_TEXT: `[${VARIABLES.ATTRIBUTE_PLAIN_TEXT}="true"] `,
};
