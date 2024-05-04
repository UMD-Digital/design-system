import { MarkupCreate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const SLOTS = {
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  ACTIONS: 'actions',
};

export const CommonPathwayData = ({
  element,
  slots,
}: {
  element: HTMLElement;
  slots: Record<string, string>;
}) => {
  const { HEADLINE, ACTIONS, EYEBROW, TEXT } = slots;

  return {
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    action: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
  };
};
