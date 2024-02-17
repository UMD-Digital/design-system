import { Tokens, umdCta } from '@universityofmaryland/variables';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CardType } from 'components/card-overlay/component';
import { SLOTS, ELEMENTS } from 'components/card-overlay/globals';

const { spacing } = Tokens;

// prettier-ignore
export const CtaStyles = `
  .${ELEMENTS.CARD_OVERLAY_CONTAINER_CTA} {
    margin-top: ${spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_OVERLAY_CONTAINER_CTA} a`]:
        umdCta['.umd-cta-secondary'],
    },
  })}
`;

export const CreateCta = ({ element }: { element: CardType }) => {
  const ctaSlot = SlotDefaultStyling({ element, slotRef: SLOTS.CTA });

  if (ctaSlot) {
    ctaSlot.classList.add(ELEMENTS.CARD_OVERLAY_CONTAINER_CTA);

    return ctaSlot;
  }

  return null;
};
