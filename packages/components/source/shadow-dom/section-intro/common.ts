import { MarkupCreate } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

export const SLOTS = {
  HEADLINE: 'headline',
  ACTIONS: 'actions',
};

export const CommonIntroData = ({
  element,
  slots,
  theme,
}: {
  element: HTMLElement;
  slots: Record<string, string>;
  theme?: string | null;
}) => {
  const { HEADLINE, ACTIONS } = slots;

  return {
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    theme,
  };
};
