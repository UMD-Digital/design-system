type SlotName = string;

// Slot Names

const actions = {
  default: 'actions',
};

const assets = {
  image: 'image',
  images: 'images',
  video: 'video',
  featured: 'featured',
};

const date = {
  default: 'date',
};

const contact = {
  additional: 'additional-contact',
  address: 'address',
  email: 'email',
  location: 'location',
  phone: 'phone',
};

const content = {
  default: 'content',
};

const deprecated = {
  body: 'body',
  plainText: 'plain-text',
  stat: 'stat',
  wrappingText: 'wrapping-text',
};

const eyebrows = {
  default: 'eyebrow',
};

const headline = {
  default: 'headline',
};

const person = {
  association: 'association',
  jobTitle: 'job-title',
  name: 'name',
  pronouns: 'pronouns',
};

const text = {
  caption: 'caption',
  default: 'text',
  stat: 'stat',
  stats: 'stats',
  sub: 'sub-text',
};

const social = {
  linkedin: 'linkedin',
};

const NEEDS_CLEANUP = {
  ADDITIONAL: 'additional',
  ATTRIBUTION_SUB_TEXT: 'attribution-sub-text',
  ATTRIBUTION: 'attribution',
  BLOCKS: 'blocks',
  BREADCRUMB_COPY: 'breadcrumb-copy',
  BREADCRUMB: 'breadcrumb',
  CARDS: 'cards',
  CHILDREN_SLIDES: 'children-slides',

  CTA_ICON: 'cta-icon',
  DATE_END_ISO: 'end-date-iso',
  DATE_START_ISO: 'start-date-iso',
  DESCRIPTION: 'description',
  EVENT_LIST: 'event-list',
  HEADLINES: 'headlines',
  HIGHLIGHT_ATTRIBUTION: 'highlight-attribution',
  HIGHLIGHT: 'highlight',
  IMAGES: 'images',
  PATHS: 'paths',

  PRIMARY_SLIDE_CONTENT: 'primary-slide-content',
  PRIMARY_SLIDE_LINKS: 'primary-slide-links',
  PRIMARY_SLIDE_SECONDARY_LINKS: 'primary-slide-secondary-links',
  QUOTE: 'quote',

  STATIC_COLUMN: 'static-column',
  STATS: 'stats',
  STICKY_COLUMN: 'sticky-column',
  TABS: 'tabs',
  TEXTS: 'texts',
};

const SlotNames = {
  actions,
  assets,
  content,
  contact,
  eyebrows,
  date,
  deprecated,
  headline,
  text,
  social,
  person,
  ...NEEDS_CLEANUP,
} as const;

export { SlotNames, type SlotName };
