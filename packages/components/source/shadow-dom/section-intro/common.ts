import { MarkupCreate, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Slots } = WebComponents;

export const CommonIntroData = ({
  element,
  theme,
}: {
  element: HTMLElement;
  theme?: string | null;
}) => ({
  headline: SlotWithDefaultStyling({ element, slotRef: Slots.HEADLINE }),
  actions: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
  theme,
});
