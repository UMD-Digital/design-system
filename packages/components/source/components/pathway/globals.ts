export const BREAKPOINTS = {
  large: 1200,
  medium: 800,
  small: 600,
};
export const ELEMENTS = {
  PATHWAY_CONTAINER: 'umd-pathway-container',
};
export const SLOTS = {
  IMAGE: 'image',
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  ACTIONS: 'actions',
  HIGHLIGHT: 'highlight',
  HIGHLIGHT_ATTRIBUTION: 'highlight-attribution',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-pathway',
  ATTRIBUTE_IMAGE: 'data-image',
  ATTRIBUTE_HIGHLIGHT: 'data-highlight',
  ATTRIBUTE_IMAGE_POSITION: 'data-image-position',
  ATTRIBUTE_IMAGE_SCALED: 'data-image-scaled',
  ATTRIBUTE_THEME: 'data-theme',
  ATTRIBUTE_HERO: 'data-hero',
};

export const NAMING = {
  IS_WITH_IMAGE: `[${VARIABLES.ATTRIBUTE_IMAGE}]`,
  IS_WITH_IMAGE_RIGHT: `[${VARIABLES.ATTRIBUTE_IMAGE_POSITION}="right"]`,
  IS_WITH_IMAGE_LEFT: `[${VARIABLES.ATTRIBUTE_IMAGE_POSITION}="left"]`,
  IS_WITH_IMAGE_SCALED: `[${VARIABLES.ATTRIBUTE_IMAGE_SCALED}="true"]`,
  IS_WITHOUT_IMAGE_SCALED: `[${VARIABLES.ATTRIBUTE_IMAGE_SCALED}="false"]`,
  IS_WITH_HIGHLIGHT: `[${VARIABLES.ATTRIBUTE_HIGHLIGHT}]`,
  IS_WITH_THEME: `[${VARIABLES.ATTRIBUTE_THEME}]`,
  IS_WITH_HERO: `[${VARIABLES.ATTRIBUTE_HERO}]`,
};
