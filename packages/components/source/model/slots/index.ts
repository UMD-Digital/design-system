import { SlotNames, type SlotName } from './mapping';
import { createSlot, type BaseProps, type OptionalProps } from './create';

type SlotProps = BaseProps & Partial<OptionalProps>;

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
  subText: createSlotFactory(SlotNames.text.sub),
} as const;

// Deprecated slots (marked for removal)
/** @deprecated Use CommonSlots instead */
const deprecated = {
  body: createSlotFactory(SlotNames.deprecated.body),
  wrappingText: createSlotFactory(SlotNames.deprecated.wrappingText),
  plainText: createSlotFactory(SlotNames.deprecated.plainText),
} as const;

export default {
  actions,
  assets,
  contact,
  content,
  date,
  deprecated,
  eyebrow,
  person,
  name: SlotNames,
  headline,
  social,
  text,
} as const;

export type { SlotName };
