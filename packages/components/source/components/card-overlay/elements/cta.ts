import { Tokens } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { CardType } from 'components/card-overlay';
import { SLOTS, ELEMENTS } from 'components/card-overlay/globals';

const { Spacing } = Tokens;

const { CTA } = SLOTS;
const { CARD_OVERLAY_CONTAINER_CTA } = ELEMENTS;

// prettier-ignore
export const CtaStyles = `
  .${CARD_OVERLAY_CONTAINER_CTA} {
    margin-top: ${Spacing.sm};
  }
`;

export const CreateCta = ({ element }: { element: CardType }) => {
  const ctaSlot = SlotDefaultStyling({ element, slotRef: CTA });

  if (ctaSlot) {
    ctaSlot.classList.add(CARD_OVERLAY_CONTAINER_CTA);

    return ctaSlot;
  }

  return null;
};
