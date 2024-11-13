const DisplayNames = {
  DISPLAY_SIZE: 'size',
  DISPLAY_TYPE: 'display-type',
  DISPLAY: 'display',
};

const FeedNames = {
  FEED_CATEGORIES: 'categories',
  FEED_COLUMN_COUNT: 'show-count',
  FEED_LAZY_LOAD: 'lazyload',
  FEED_NOT_ENTRIES: 'not',
  FEED_ROW_COUNT: 'row-count',
  FEED_TOKEN: 'token',
  FEED_UNION: 'union',
};

const OptionNames = {
  OPTIONAL_FULLSCREEN: 'option-full-screen',
  OPTIONAL_HAS_LINE: 'has-line',
  OPTIONAL_HAS_SEPARATOR: 'include-separator',
  OPTIONAL_SHOW_TIME: 'show-time',
  OPTIONAL_STICKY_FIRST: 'isStickyFirst',
};

const InformationNames = {
  INFORMATION_TITLE: 'data-title',
  INFORMATION_URL: 'data-url',
};

const LayoutNames = {
  LAYOUT_FIXED: 'fixed',
  LAYOUT_IMAGE_POSITION: 'image-position',
  LAYOUT_IMAGE_SCALED: 'image-scaled',
  LAYOUT_STICKY_TOP: 'position-top',
};

const StateNames = {
  RESIZE: 'resize',
  STATE: 'state',
};

const ThemeNames = {
  THEME: 'theme',
};

const TypeNames = {
  TYPE_QUOTE: 'quote',
  TYPE: 'type',
};

const SharingNames = {
  SHARING_EMAIL: 'data-email',
  SHARING_PRINT: 'data-print',
};

const SocialNames = {
  SOCIAL_FACEBOOK: 'data-facebook',
  SOCIAL_TWITTER: 'data-twitter',
};

const VisualNames = {
  VISUAL_ALIGN: 'aligned',
  VISUAL_BORDER: 'border',
  VISUAL_DAYS_TO_HIDE: 'days-to-hide',
  VISUAL_DISPLAY: 'display',
  VISUAL_HAS_LOGO: 'hasLogo',
  VISUAL_ICON: 'icon',
  VISUAL_TRANSPARENT: 'transparent',
};

export default {
  ...DisplayNames,
  ...FeedNames,
  ...InformationNames,
  ...LayoutNames,
  ...OptionNames,
  ...SharingNames,
  ...SocialNames,
  ...StateNames,
  ...ThemeNames,
  ...TypeNames,
  ...VisualNames,
};
