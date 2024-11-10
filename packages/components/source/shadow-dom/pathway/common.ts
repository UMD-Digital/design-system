import { MarkupCreate, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Slots } = WebComponents;

export const CommonPathwayData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.SlottedEyebrow({ element }),
  headline: Slots.SlottedHeadline({ element }),
  text: Slots.SlottedText({ element }),
  action: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
});
