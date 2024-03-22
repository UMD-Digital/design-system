export const BREAKPOINTS = {};
export const ELEMENTS = {
  CONTAINER: 'nav-item-container',
  DROPDOWN_CONTAINER: 'dropdown-container',
  PRIMARLY_LINK_WRAPPER: 'primary-link-wrapper',
  PRIMARY_LINK_CONTAINER_BUTTON: 'primary-link-container-button',
};
export const SLOTS = {
  PRIMARY_LINK: 'primary-link',
  DROPDOWN_LINKS: 'dropdown-links',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-nav-item',
  ATTRIBUTE_SHOW: 'show',
  ATTRIBUTE_DROPDOWN: 'data-dropdown',
  ATTRIBUTE_SHOWING: 'data-showing',
  ATTRIBUTE_SELECTED: 'data-selected',
};
export const REFERENCES = {
  IS_SELECTED: `[${VARIABLES.ATTRIBUTE_SELECTED}]`,
  IS_SHOWING: `[${VARIABLES.ATTRIBUTE_SHOWING}]`,
  IS_DROPDOWN: `[${VARIABLES.ATTRIBUTE_DROPDOWN}]`,
};
