import { spacing, umdCta } from '@universityofmaryland/umd-web-configuration';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

export const CtaStyles = `
  .${ELEMENTS.CARD_OVERLAY_CONTAINER_CTA} {
    margin-top: ${spacing.md};
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
