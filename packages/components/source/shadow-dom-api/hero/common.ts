import { Slots } from 'shadow-dom-model';
import { MarkupCreate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const CommonHeroData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.defined.eyebrow({ element }),
  headline: Slots.defined.headline({ element }),
  richText: SlotWithDefaultStyling({ element, slotRef: Slots.name.TEXT }),
  imageRef: SlotWithDefaultStyling({ element, slotRef: Slots.name.IMAGE }),
  actions: Slots.defined.actions({ element }),
});
