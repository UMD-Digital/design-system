const display = 'data-display';

const feature = {
  ANIMATION: 'data-animation',
};

const information = {
  TITLE: 'data-title',
  URL: 'data-url',
  SEARCH: 'data-search',
  SEARCH_TYPE: 'data-search-type',
  GIFT: 'data-gift',
  ADMISSIONS: 'data-admissions',
  SCHOOLS: 'data-schools',
  NEWS: 'data-news',
  EVENTS: 'data-events',
};

const layout = {
  LOCK: 'data-layout-lock',
  ALERT_OFF: 'data-alert-off',
};

const sharing = {
  EMAIL: 'data-email',
  PRINT: 'data-print',
};

const social = {
  FACEBOOK: 'data-facebook',
  TWITTER: 'data-twitter',
};

const theme = 'data-theme';

const value = {
  ALERT_URL: 'data-alert-url',
};

// Depracted

const depractedFeature = {
  FULLSCREEN: 'option-full-screen',
  SHOW_TIME: 'show-time',
};

const depractedDisplay = {
  DISPLAY_SIZE: 'size',
  DISPLAY_TYPE: 'display-type',
  DISPLAY: 'display',
};

const depractedFeed = {
  FEED_CATEGORIES: 'categories',
  FEED_COLUMN_COUNT: 'show-count',
  FEED_LAZY_LOAD: 'lazyload',
  FEED_NOT_ENTRIES: 'not',
  FEED_ROW_COUNT: 'row-count',
  FEED_TOKEN: 'token',
  FEED_UNION: 'union',
};

const depractedOption = {
  OPTIONAL_HAS_LINE: 'has-line',
  OPTIONAL_HAS_SEPARATOR: 'include-separator',
  OPTIONAL_STICKY_FIRST: 'isStickyFirst',
};

const depractedLayout = {
  LAYOUT_FIXED: 'fixed',
  LAYOUT_IMAGE_POSITION: 'image-position',
  LAYOUT_IMAGE_SCALED: 'image-scaled',
  LAYOUT_STICKY_TOP: 'position-top',
};

const depractedState = {
  RESIZE: 'resize',
  STATE_DEPRECATD: 'state',
  STATE: 'data-state',
};

const depractedTheme = {
  THEME_DEPRECATD: 'theme',
};

const depractedType = {
  TYPE: 'type',
};

const depractedVisual = {
  VISUAL_ALIGN: 'aligned',
  VISUAL_BORDER: 'border',
  VISUAL_DAYS_TO_HIDE: 'days-to-hide',
  VISUAL_HAS_LOGO: 'hasLogo',
  VISUAL_ICON: 'icon',
  VISUAL_TRANSPARENT: 'transparent',
  VISUAL_QUOTE: 'quote',
  VISUAL_TEXT_CENTER: 'text-center',
};

const AttributeNames = {
  display,
  feature,
  ...depractedFeature,
  ...depractedDisplay,
  ...depractedFeed,
  ...depractedOption,
  information,
  layout,
  ...depractedLayout,
  ...Option,
  sharing,
  social,
  ...depractedState,
  theme,
  ...depractedTheme,
  ...depractedType,
  ...depractedVisual,
  value,
} as const;

export default AttributeNames;