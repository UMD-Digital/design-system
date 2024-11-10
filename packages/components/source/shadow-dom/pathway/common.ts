import { MarkupCreate, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Slots } = WebComponents;

export const CommonPathwayData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: SlotWithDefaultStyling({ element, slotRef: Slots.EYEBROW }),
  headline: SlotWithDefaultStyling({ element, slotRef: Slots.HEADLINE }),
  text: SlotWithDefaultStyling({ element, slotRef: Slots.TEXT }),
  action: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
});
