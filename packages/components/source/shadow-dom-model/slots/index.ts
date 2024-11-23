import { MarkupCreate } from 'utilities';

type SlotProps = {
  element: HTMLElement;
  isDefaultStyling?: boolean;
};

type LightDomElementProps = {
  type: string;
};

type SlotOptionProps = SlotProps & LightDomElementProps;

const { Node, SlotWithDefaultStyling } = MarkupCreate;

const name = {
  ACTIONS: 'actions',
  ADDITIONAL_CONTACT: 'additional-contact',
  ADDITIONAL: 'additional',
  ADDRESS: 'address',
  ASSOCIATION: 'association',
  ATTRIBUTION_SUB_TEXT: 'attribution-sub-text',
  ATTRIBUTION: 'attribution',
  BLOCKS: 'blocks',
  BODY: 'body',
  BREADCRUMB_COPY: 'breadcrumb-copy',
  BREADCRUMB: 'breadcrumb',
  CAPTION: 'caption',
  CARDS: 'cards',
  CHILDREN_SLIDES: 'children-slides',
  CONTENT: 'content',
  CTA_ICON: 'cta-icon',
  DATE_END_ISO: 'end-date-iso',
  DATE_START_ISO: 'start-date-iso',
  DATE: 'date',
  DESCRIPTION: 'description',
  EMAIL: 'email',
  EVENT_LIST: 'event-list',
  EYEBROW: 'eyebrow',
  HEADLINE: 'headline',
  HEADLINES: 'headlines',
  HIGHLIGHT_ATTRIBUTION: 'highlight-attribution',
  HIGHLIGHT: 'highlight',
  IMAGE: 'image',
  IMAGES: 'images',
  JOB_TITLE: 'job-title',
  LINKEDIN: 'linkedin',
  LOCATION: 'location',
  NAME: 'name',
  PATHS: 'paths',
  PHONE: 'phone',
  PRIMARY_SLIDE_CONTENT: 'primary-slide-content',
  PRIMARY_SLIDE_LINKS: 'primary-slide-links',
  PRIMARY_SLIDE_SECONDARY_LINKS: 'primary-slide-secondary-links',
  PRONOUNS: 'pronouns',
  QUOTE: 'quote',
  STAT: 'stat',
  STATIC_COLUMN: 'static-column',
  STATS: 'stats',
  STICKY_COLUMN: 'sticky-column',
  SUB_TEXT: 'sub-text',
  TABS: 'tabs',
  TEXT: 'text',
  TEXTS: 'texts',
  VIDEO: 'video',
  WRAPPING_TEXT: 'wrapping-text',
};

const SlotOptions = ({
  element,
  type,
  isDefaultStyling = true,
}: SlotOptionProps) => {
  if (isDefaultStyling) {
    return SlotWithDefaultStyling({ element, slotRef: type });
  }

  return Node.slot({ type });
};

const headline = (props: SlotProps) =>
  SlotOptions({ ...props, type: name.HEADLINE });

const eyebrow = (props: SlotProps) =>
  SlotOptions({ ...props, type: name.EYEBROW });

const date = (props: SlotProps) => SlotOptions({ ...props, type: name.DATE });

const text = (props: SlotProps) => SlotOptions({ ...props, type: name.TEXT });

const body = (props: SlotProps) => SlotOptions({ ...props, type: name.BODY });

const actions = (props: SlotProps) =>
  SlotOptions({ ...props, type: name.ACTIONS });

const defined = {
  headline,
  eyebrow,
  body,
  date,
  text,
  actions,
};

export default {
  name,
  defined,
  SlotOptions,
};
