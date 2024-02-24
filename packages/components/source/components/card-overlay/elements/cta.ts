import { Tokens } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { CardType } from 'components/card-overlay';
import { SLOTS, ELEMENTS } from 'components/card-overlay/globals';

const { Spacing } = Tokens;

// prettier-ignore
export const CtaStyles = `
  .${ELEMENTS.CARD_OVERLAY_CONTAINER_CTA} {
    margin-top: ${Spacing.sm};
  }
`;

export const CreateCta = ({ element }: { element: CardType }) => {
  const ctaSlot = SlotDefaultStyling({ element, slotRef: SLOTS.CTA });

  if (ctaSlot) {
    ctaSlot.classList.add(ELEMENTS.CARD_OVERLAY_CONTAINER_CTA);

    return ctaSlot;
  }

  return null;
};
