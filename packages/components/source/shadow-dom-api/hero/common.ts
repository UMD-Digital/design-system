import { Slots } from 'shadow-dom-model';
import { MarkupCreate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const CommonHeroData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.SlottedEyebrow({ element }),
  headline: Slots.SlottedHeadline({ element }),
  richText: SlotWithDefaultStyling({ element, slotRef: Slots.TEXT }),
  imageRef: SlotWithDefaultStyling({ element, slotRef: Slots.IMAGE }),
  actions: Slots.SlottedActions({ element }),
});
