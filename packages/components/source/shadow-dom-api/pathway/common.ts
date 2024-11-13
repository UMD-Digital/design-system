import { Slots } from 'shadow-dom-model';
import { MarkupCreate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const CommonPathwayData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.SlottedEyebrow({ element }),
  headline: Slots.SlottedHeadline({ element }),
  text: Slots.SlottedText({ element }),
  action: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
});
