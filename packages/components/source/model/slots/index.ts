import { SlotNames, type SlotName } from './mapping';
import { createSlot, type BaseProps, type OptionalProps } from './create';
import * as element from './element';

/**
 * Properties for creating slot content
 * Combines base properties with optional configuration
 */
export type SlotProps = BaseProps & Partial<OptionalProps>;

const createSlotFactory =
  (type: SlotName, config: Partial<SlotProps> = {}) =>
  (props: SlotProps) =>
    createSlot({ ...props, type, ...config });

// Defined common usage

const actions = {
  default: createSlotFactory(SlotNames.actions.default),
} as const;

const assets = {
  image: createSlotFactory(SlotNames.assets.image),
  images: createSlotFactory(SlotNames.assets.images),
  video: createSlotFactory(SlotNames.assets.video),
} as const;

const contact = {
  additional: createSlotFactory(SlotNames.contact.additional),
  address: createSlotFactory(SlotNames.contact.address),
  email: createSlotFactory(SlotNames.contact.email),
  location: createSlotFactory(SlotNames.contact.location),
  phone: createSlotFactory(SlotNames.contact.phone),
} as const;

const content = {
  default: createSlotFactory(SlotNames.content.default),
} as const;

const date = {
  default: createSlotFactory(SlotNames.date.default),
} as const;

const eyebrow = {
  default: createSlotFactory(SlotNames.eyebrows.default),
} as const;

const headline = {
  default: createSlotFactory(SlotNames.headline.default),
} as const;

const person = {
  association: createSlotFactory(SlotNames.person.association),
  name: createSlotFactory(SlotNames.person.name),
  jobTitle: createSlotFactory(SlotNames.person.jobTitle),
  pronouns: createSlotFactory(SlotNames.person.pronouns),
} as const;

const social = {
  linkedin: createSlotFactory(SlotNames.social.linkedin),
} as const;

const text = {
  caption: createSlotFactory(SlotNames.text.caption),
  default: createSlotFactory(SlotNames.text.default),
  stat: createSlotFactory(SlotNames.text.stat),
  subText: createSlotFactory(SlotNames.text.sub),
} as const;

// Deprecated slots (marked for removal)
/** @deprecated Use CommonSlots instead */
const deprecated = {
  ADDITIONAL: createSlotFactory(SlotNames.ADDITIONAL),
  body: createSlotFactory(SlotNames.deprecated.body),
  wrappingText: createSlotFactory(SlotNames.deprecated.wrappingText),
  plainText: createSlotFactory(SlotNames.deprecated.plainText),
  stat: createSlotFactory(SlotNames.deprecated.stat),
} as const;

export default {
  actions,
  assets,
  contact,
  content,
  date,
  deprecated,
  element,
  eyebrow,
  person,
  name: SlotNames,
  headline,
  social,
  text,
  ...element,
};
export type { SlotName };
