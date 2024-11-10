import { MarkupCreate, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Slots } = WebComponents;

export const CommonHeroData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.SlottedEyebrow({ element }),
  headline: Slots.SlottedHeadline({ element }),
  richText: SlotWithDefaultStyling({ element, slotRef: Slots.TEXT }),
  imageRef: SlotWithDefaultStyling({ element, slotRef: Slots.IMAGE }),
  actions: Slots.SlottedActions({ element }),
});
