// Options

const AnimationAttributes = {
  ANIMATION_STATE: 'data-animation',
};

const DisplayAttributes = {
  DISPLAY_SIZE: 'size',
  DISPLAY_TYPE: 'display-type',
  DISPLAY: 'display',
};

const FeedAttributes = {
  FEED_CATEGORIES: 'categories',
  FEED_COLUMN_COUNT: 'show-count',
  FEED_LAZY_LOAD: 'lazyload',
  FEED_NOT_ENTRIES: 'not',
  FEED_ROW_COUNT: 'row-count',
  FEED_TOKEN: 'token',
  FEED_UNION: 'union',
};

const OptionAttributes = {
  OPTIONAL_FULLSCREEN: 'option-full-screen',
  OPTIONAL_HAS_LINE: 'has-line',
  OPTIONAL_HAS_SEPARATOR: 'include-separator',
  OPTIONAL_SHOW_TIME: 'show-time',
  OPTIONAL_STICKY_FIRST: 'isStickyFirst',
};

const InformationAttributes = {
  INFORMATION_TITLE: 'data-title',
  INFORMATION_URL: 'data-url',
};

const LayoutAttributes = {
  LAYOUT_FIXED: 'fixed',
  LAYOUT_IMAGE_POSITION: 'image-position',
  LAYOUT_IMAGE_SCALED: 'image-scaled',
  LAYOUT_STICKY_TOP: 'position-top',
};

const StateAttributes = {
  RESIZE: 'resize',
  STATE_DEPRECATD: 'state',
  STATE: 'data-state',
};

const ThemeAttributes = {
  THEME_DEPRECATD: 'theme',
  THEME: 'data-theme',
};

const TypeAttributes = {
  TYPE: 'type',
};

const SharingAttributes = {
  SHARING_EMAIL: 'data-email',
  SHARING_PRINT: 'data-print',
};

const SocialAttributes = {
  SOCIAL_FACEBOOK: 'data-facebook',
  SOCIAL_TWITTER: 'data-twitter',
};

const VisualAttributes = {
  VISUAL_ALIGN: 'aligned',
  VISUAL_BORDER: 'border',
  VISUAL_DAYS_TO_HIDE: 'days-to-hide',
  VISUAL_DISPLAY: 'display',
  VISUAL_HAS_LOGO: 'hasLogo',
  VISUAL_ICON: 'icon',
  VISUAL_TRANSPARENT: 'transparent',
  VISUAL_QUOTE: 'quote',
};

const AttributeNames = {
  ...AnimationAttributes,
  ...DisplayAttributes,
  ...FeedAttributes,
  ...InformationAttributes,
  ...LayoutAttributes,
  ...OptionAttributes,
  ...SharingAttributes,
  ...SocialAttributes,
  ...StateAttributes,
  ...ThemeAttributes,
  ...TypeAttributes,
  ...VisualAttributes,
} as const;

export default AttributeNames;
