import {
  colors,
  spacing,
  typography,
  umdCta,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SlotDefaultStyling } from 'helpers/ui';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

const CARD_BODY_CONTAINER = 'umd-card-body-container';
const CARD_BODY_DATE_WRAPPER = 'umd-card-body-date-wrapper';
const CARD_BODY_CTA_WRAPPER = 'umd-card-body-cta-wrapper';

// prettier-ignore
const DateStyles = `
  * + .${CARD_BODY_DATE_WRAPPER} {
    margin-top: ${spacing.min}
  }
  
  .${CARD_BODY_DATE_WRAPPER} * {
    color: ${colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_BODY_DATE_WRAPPER}`]: typography['.umd-sans-min'],
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_BODY_DATE_WRAPPER} *`]: typography['.umd-sans-min'],
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_BODY_TEXT_WRAPPER} *`]: typography['.umd-sans-small'],
    },
  })}
  
  .${ELEMENTS.CARD_BODY_TEXT_WRAPPER} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }
  
  .${ELEMENTS.CARD_BODY_TEXT_WRAPPER} a:hover, 
  .${ELEMENTS.CARD_BODY_TEXT_WRAPPER} a:focus {
    text-decoration: underline;
    color: ${colors.red};
  }
`;

// prettier-ignore
const CtaStyles = `
  .${CARD_BODY_CTA_WRAPPER} {
    margin-top: ${spacing.md};
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_BODY_CTA_WRAPPER} a`]: umdCta['.umd-cta-secondary'],
    },
  })}
`;

// prettier-ignore
export const BodyStyles = `
  * + .${CARD_BODY_CONTAINER} {
    margin-top: ${spacing.min};
  }

  ${DateStyles}
  ${TextStyles}
  ${CtaStyles}
`;

export const CreateBody = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textSlot = SlotDefaultStyling({ element, slotRef: SLOTS.TEXT });
  const dateSlot = SlotDefaultStyling({ element, slotRef: SLOTS.DATE });
  const ctaSlot = SlotDefaultStyling({ element, slotRef: SLOTS.CTA });

  container.classList.add(CARD_BODY_CONTAINER);

  if (textSlot) {
    textSlot.classList.add(ELEMENTS.CARD_BODY_TEXT_WRAPPER);
    container.appendChild(textSlot);
  }

  if (dateSlot) {
    dateSlot.classList.add(CARD_BODY_DATE_WRAPPER);
    container.appendChild(dateSlot);
  }

  if (ctaSlot) {
    ctaSlot.classList.add(CARD_BODY_CTA_WRAPPER);
    container.appendChild(ctaSlot);
  }

  return container;
};
