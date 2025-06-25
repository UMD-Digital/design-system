import { Slots } from 'model';
import { Markup } from 'utilities';

const { SlotWithDefaultStyling } = Markup.create;

export const CommonHeroData = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.eyebrow.default({ element }),
  headline: Slots.headline.default({ element }),
  richText: Slots.text.default({ element }),
  text: Slots.text.default({ element }),
  imageRef: SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.assets.image,
  }),
  actions: Slots.actions.default({ element }),
});
