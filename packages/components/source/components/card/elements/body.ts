import {
  colors,
  spacing,
  typography,
  umdCta,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { MakeSlot, SlotDefaultStyling } from 'helpers/ui';
import { SLOTS } from '../globals';
import { CardType } from '../component';

const CARD_BODY_CONTAINER = 'umd-card-body-container';
const CARD_BODY_TEXT_WRAPPER = 'umd-card-body-text-wrapper';
const CARD_BODY_DATE_WRAPPER = 'umd-card-body-date-wrapper';
const CARD_BODY_CTA_WRAPPER = 'umd-card-body-cta-wrapper';

export const BodyStyles = `
  * + .${CARD_BODY_CONTAINER} {
    margin-top: ${spacing.min};
  }

  * + .${CARD_BODY_DATE_WRAPPER} {
    margin-top: ${spacing.min}
  }

  .${CARD_BODY_DATE_WRAPPER} * {
    color: ${colors.gray.mediumAA};
    ${ConvertJSSObjectToStyles({ styleObj: typography['.umd-sans-min'] })}
  }

  .${CARD_BODY_CTA_WRAPPER} {
    margin-top: ${spacing.min};
  }

  .${CARD_BODY_CTA_WRAPPER} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-interactive-sans-small'],
    })}
  }
`;

export const CreateBody = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textSlot = SlotDefaultStyling({ element, slotRef: SLOTS.TEXT });
  const dateSlot = SlotDefaultStyling({ element, slotRef: SLOTS.DATE });
  const ctaSlot = MakeSlot({ type: SLOTS.CTA });

  container.classList.add(CARD_BODY_CONTAINER);

  if (textSlot) {
    textSlot.classList.add(CARD_BODY_TEXT_WRAPPER);
    container.appendChild(textSlot);
  }

  if (dateSlot) {
    dateSlot.classList.add(CARD_BODY_DATE_WRAPPER);
    container.appendChild(dateSlot);
  }

  if (ctaSlot) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.appendChild(ctaSlot);
    ctaWrapper.classList.add(CARD_BODY_CTA_WRAPPER);
    container.appendChild(ctaWrapper);
  }

  return container;
};
