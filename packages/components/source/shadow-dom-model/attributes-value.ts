// Types

export type DisplayValue = (typeof DisplayValues)[keyof typeof DisplayValues];
export type LayoutValue = (typeof LayoutValues)[keyof typeof LayoutValues];
export type SizeValue = (typeof SizeValues)[keyof typeof SizeValues];
export type StateValue = (typeof StateValues)[keyof typeof StateValues];
export type ThemeValue = (typeof ThemeValues)[keyof typeof ThemeValues];

export type AttributeValue =
  | DisplayValue
  | LayoutValue
  | SizeValue
  | StateValue
  | ThemeValue;

// Values

const DisplayValues = {
  DISPLAY_FEATURE: 'feature',
  DISPLAY_FEATURED: 'featured',
  DISPLAY_HERO: 'hero',
  DISPLAY_IMAGE: 'image',
  DISPLAY_LIST: 'list',
  DISPLAY_MINIMAL: 'minimal',
  DISPLAY_OVERLAY: 'overlay',
  DISPLAY_PROMO: 'promo',
  DISPLAY_STACKED: 'stacked',
  DISPLAY_STATEMENT: 'statement',
  DISPLAY_STICKY: 'sticky',
  DISPLAY_TABULAR: 'tabular',
};

const LayoutValues = {
  LAYOUT_DEFAULT_CENTERED: 'default-centered',
  LAYOUT_DEFAULT_INTERIOR_CENTERED: 'default-interior-centered',
  LAYOUT_DEFAULT_INTERIOR: 'default-interior',
  LAYOUT_FULL_IMAGE: 'full-image',
  LAYOUT_STACKED_INTERIOR: 'stacked-interior',
  LAYOUT_TEXT_CENTER: 'center',
};

const SizeValues = {
  SIZE_NORMAL: 'normal',
};

const StateValues = {
  STATE_CLOSED: 'closed',
  STATE_FALSE: 'false',
  STATE_OPENED: 'open',
  STATE_TRUE: 'true',
};

const ThemeValues = {
  THEME_DARK: 'dark',
  THEME_LIGHT: 'light',
  THEME_MARYLAND: 'maryland',
};

const AttributeValues = {
  ...DisplayValues,
  ...LayoutValues,
  ...SizeValues,
  ...StateValues,
  ...ThemeValues,
};

export default AttributeValues;
