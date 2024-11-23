import { Slots } from 'shadow-dom-model';
import { MarkupCreate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const CommonPathwayData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.defined.eyebrow({ element }),
  headline: Slots.defined.headline({ element }),
  text: Slots.defined.text({ element }),
  action: SlotWithDefaultStyling({ element, slotRef: Slots.name.ACTIONS }),
});
