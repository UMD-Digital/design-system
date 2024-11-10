import { MarkupCreate, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Slots } = WebComponents;

export const CommonHeroData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: SlotWithDefaultStyling({ element, slotRef: Slots.EYEBROW }),
  headline: SlotWithDefaultStyling({ element, slotRef: Slots.HEADLINE }),
  richText: SlotWithDefaultStyling({ element, slotRef: Slots.TEXT }),
  imageRef: SlotWithDefaultStyling({ element, slotRef: Slots.IMAGE }),
  actions: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
});
