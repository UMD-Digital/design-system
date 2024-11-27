type SlotName = (typeof SlotNames)[keyof typeof SlotNames];

// Slot Names

const TEXT_LOCKUPS = {
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  ACTIONS: 'actions',
};

const DEPRECATED = {
  BODY: 'body',
  WRAPPING_TEXT: 'wrapping-text',
};

const PERSON = {
  NAME: 'name',
  JOB_TITLE: 'job-title',
  PRONOUNS: 'pronouns',
  LOCATION: 'location',
  EMAIL: 'email',
  PHONE: 'phone',
  ADDRESS: 'address',
  LINKEDIN: 'linkedin',
};

const NEEDS_CLEANUP = {
  DESCRIPTION: 'description',
  SUB_TEXT: 'sub-text',
  QUOTE: 'quote',
  CTA_ICON: 'cta-icon',
  IMAGE: 'image',
  IMAGES: 'images',
  VIDEO: 'video',
  DATE: 'date',
  DATE_START_ISO: 'start-date-iso',
  DATE_END_ISO: 'end-date-iso',
  BREADCRUMB: 'breadcrumb',
  BREADCRUMB_COPY: 'breadcrumb-copy',
  TABS: 'tabs',
  BLOCKS: 'blocks',
  CARDS: 'cards',
  CONTENT: 'content',
  STATIC_COLUMN: 'static-column',
  STICKY_COLUMN: 'sticky-column',
  ATTRIBUTION: 'attribution',
  ATTRIBUTION_SUB_TEXT: 'attribution-sub-text',
  HIGHLIGHT_ATTRIBUTION: 'highlight-attribution',
  ADDITIONAL: 'additional',
  ADDITIONAL_CONTACT: 'additional-contact',
  ASSOCIATION: 'association',
  CAPTION: 'caption',
  EVENT_LIST: 'event-list',
  HEADLINES: 'headlines',
  HIGHLIGHT: 'highlight',
  PATHS: 'paths',
  PRIMARY_SLIDE_CONTENT: 'primary-slide-content',
  PRIMARY_SLIDE_LINKS: 'primary-slide-links',
  PRIMARY_SLIDE_SECONDARY_LINKS: 'primary-slide-secondary-links',
  CHILDREN_SLIDES: 'children-slides',
  STAT: 'stat',
  STATS: 'stats',
  TEXTS: 'texts',
};

const SlotNames = {
  ...DEPRECATED,
  ...TEXT_LOCKUPS,
  ...PERSON,
  ...NEEDS_CLEANUP,
} as const;

export { SlotNames, type SlotName };
