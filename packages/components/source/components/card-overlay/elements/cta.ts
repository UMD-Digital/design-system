import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { MakeSlot } from 'helpers/ui';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

export const CtaStyles = `
  .${ELEMENTS.CARD_OVERLAY_CONTAINER_CTA} {
    position: absolute;
    bottom: ${spacing.md};
    left: ${spacing.md};
  }
`;

export const CreateCta = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const ctaSlot = MakeSlot({ type: SLOTS.CTA });

  container.classList.add(ELEMENTS.CARD_OVERLAY_CONTAINER_CTA);

  container.appendChild(ctaSlot);

  return container;
};