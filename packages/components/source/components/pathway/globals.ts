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
};
export const VARIABLES = {
  ATTRIBUTE_IMAGE: 'data-image',
  ATTRIBUTE_HIGHLIGHT: 'data-highlight',
  ATTRIBUTE_IMAGE_POSITION: 'data-image-position',
  ATTRIBUTE_IMAGE_SCALED: 'data-image-scaled',
  ATTRIBUTE_THEME: 'data-theme',
  ATTRIBUTE_HERO: 'data-hero',
};

export const NAMING = {
  WITH_IMAGE: `[${VARIABLES.ATTRIBUTE_IMAGE}]`,
  WITH_IMAGE_RIGHT: `[${VARIABLES.ATTRIBUTE_IMAGE_POSITION}="right"]`,
  WITH_IMAGE_LEFT: `[${VARIABLES.ATTRIBUTE_IMAGE_POSITION}="left"]`,
  WITH_IMAGE_SCALED: `[${VARIABLES.ATTRIBUTE_IMAGE_SCALED}="true"]`,
  WITHOUT_IMAGE_SCALED: `[${VARIABLES.ATTRIBUTE_IMAGE_SCALED}="false"]`,
  WITH_HIGHLIGHT: `[${VARIABLES.ATTRIBUTE_HIGHLIGHT}]`,
  WITH_THEME: `[${VARIABLES.ATTRIBUTE_THEME}]`,
  WITH_HERO: `[${VARIABLES.ATTRIBUTE_HERO}]`,
};
