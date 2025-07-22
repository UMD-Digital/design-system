/**
 * Attribute name constants organized by category.
 *
 * Single-value attributes use a 'default' property for consistency:
 * - display.default = 'data-display'
 * - theme.default = 'data-theme'
 *
 * Multi-value attributes use descriptive property names:
 * - visual.size = 'data-visual-size'
 * - layout.HIDDEN = 'data-layout-hidden'
 */

const decoration = {
  line: 'data-decoration-line',
};

const display = {
  default: 'data-display',
};

const feature = {
  animation: 'data-animation',
  lazyLoad: 'data-lazy-load',
};

const feed = {
  type: 'data-feed-type',
};

const information = {
  admissions: 'data-admissions',
  alertUrl: 'data-alert-url',
  events: 'data-events',
  filterIds: 'data-filter-group-ids',
  removeIds: 'data-remove-entry-ids',
  gift: 'data-gift',
  news: 'data-news',
  schools: 'data-schools',
  search: 'data-search',
  searchType: 'data-search-type',
  title: 'data-title',
  token: 'data-token',
  url: 'data-url',
};

const layout = {
  alertOff: 'data-alert-off',
  alignment: 'data-layout-alignment',
  columnCount: 'data-layout-column-count',
  fixed: 'data-layout-fixed',
  height: 'data-layout-height',
  hidden: 'data-layout-hidden',
  imageScaled: 'data-layout-image-scaled',
  imagePosition: 'data-layout-image-position',
  interior: 'data-layout-interior',
  lock: 'data-layout-lock',
  position: 'data-layout-position',
  reverse: 'data-layout-reverse',
  rowCount: 'data-layout-row-count',
  spaceHorizontal: 'data-layout-space-horizontal',
  text: 'data-layout-text',
};

const sharing = {
  email: 'data-email',
  print: 'data-print',
};

const social = {
  facebook: 'data-facebook',
  twitter: 'data-twitter',
};

const theme = {
  default: 'data-theme',
};

const visual = {
  imageAligned: 'data-visual-image-aligned',
  icon: 'data-visual-icon',
  icon_seal: 'data-visual-icon-seal',
  hidden_days: 'data-days-to-hide',
  open: 'data-visual-open',
  play: 'data-visual-play',
  size: 'data-visual-size',
  time: 'data-visual-time',
  transparent: 'data-visual-transparent',
};

// Deprecated

const deprecated = {
  feature: {
    FULLSCREEN: 'option-full-screen',
    SHOW_TIME: 'show-time',
  },
  display: {
    DISPLAY_SIZE: 'size',
    DISPLAY_TYPE: 'display-type',
    DISPLAY: 'display',
  },
  feed: {
    FEED_CATEGORIES: 'categories',
    FEED_COLUMN_COUNT: 'show-count',
    FEED_LAZY_LOAD: 'lazyload',
    FEED_NOT_ENTRIES: 'not',
    FEED_ROW_COUNT: 'row-count',
    FEED_TOKEN: 'token',
    FEED_UNION: 'union',
  },
  option: {
    OPTIONAL_HAS_LINE: 'has-line',
    OPTIONAL_HAS_SEPARATOR: 'include-separator',
    OPTIONAL_STICKY_FIRST: 'isStickyFirst',
  },
  layout: {
    DEFAULT: 'layout',
    LAYOUT_FIXED: 'fixed',
    LAYOUT_ALIGNMENT: 'alignment',
    LAYOUT_IMAGE_POSITION: 'image-position',
    LAYOUT_IMAGE_SCALED: 'image-scaled',
    LAYOUT_STICKY_TOP: 'position-top',
  },
  state: {
    RESIZE: 'resize',
    STATE_DEPRECATD: 'state',
    STATE: 'data-state',
  },
  theme: {
    THEME_DEPRECATD: 'theme',
  },
  type: {
    TYPE: 'type',
  },
  visual: {
    VISUAL_ALIGN: 'aligned',
    VISUAL_BORDER: 'border',
    VISUAL_DAYS_TO_HIDE: 'days-to-hide',
    VISUAL_HAS_LOGO: 'hasLogo',
    VISUAL_ICON: 'icon',
    VISUAL_TRANSPARENT: 'transparent',
    VISUAL_QUOTE: 'quote',
    VISUAL_TEXT_CENTER: 'text-center',
    VISUAL_STYLE_PROPS: 'styleProps',
  },
};

const AttributeNames = {
  decoration,
  display,
  feature,
  feed,
  information,
  layout,
  sharing,
  social,
  theme,
  visual,
  deprecated,
} as const;

export default AttributeNames;
