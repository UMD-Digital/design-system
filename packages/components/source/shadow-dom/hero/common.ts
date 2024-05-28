import { MarkupCreate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const SLOTS = {
  IMAGE: 'image',
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  ACTIONS: 'actions',
};

export const CommonHeroData = ({
  element,
  slots,
}: {
  element: HTMLElement;
  slots: Record<string, string>;
}) => {
  const { HEADLINE, ACTIONS, EYEBROW, TEXT, IMAGE } = slots;

  return {
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    richText: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    imageRef: SlotWithDefaultStyling({ element, slotRef: IMAGE }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
  };
};
