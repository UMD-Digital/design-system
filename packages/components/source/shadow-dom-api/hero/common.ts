import { Slots } from 'shadow-dom-model';
import { MarkupCreate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const CommonHeroData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.eyebrow.default({ element }),
  headline: Slots.headline.default({ element }),
  richText: Slots.text.default({ element }),
  imageRef: SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.assets.image,
  }),
  actions: Slots.actions.default({ element }),
});
