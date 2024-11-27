import { SlotNames, type SlotName } from './names';
import { createSlot, type BaseProps, type OptionalProps } from './factory';

type SlotProps = BaseProps & Partial<OptionalProps>;

const createSlotFactory =
  (type: SlotName, config: Partial<SlotProps> = {}) =>
  (props: SlotProps) =>
    createSlot({ ...props, type, ...config });

// Defined common usage

const CommonSlots = {
  actions: createSlotFactory(SlotNames.ACTIONS),
  caption: createSlotFactory(SlotNames.CAPTION),
  date: createSlotFactory(SlotNames.DATE),
  image: createSlotFactory(SlotNames.IMAGE),
  eyebrow: createSlotFactory(SlotNames.EYEBROW),
  headline: createSlotFactory(SlotNames.HEADLINE),
  text: createSlotFactory(SlotNames.TEXT),
} as const;

// Deprecated slots (marked for removal)
/** @deprecated Use CommonSlots instead */
const LegacySlots = {
  body: createSlotFactory(SlotNames.BODY),
  wrappingText: createSlotFactory(SlotNames.WRAPPING_TEXT),
} as const;

export default {
  name: SlotNames,
  defined: { ...CommonSlots, ...LegacySlots },
} as const;

export type { SlotName };
