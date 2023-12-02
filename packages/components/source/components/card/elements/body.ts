import {
  colors,
  spacing,
  typography,
  umdCta,
} from '@universityofmaryland/umd-web-configuration';
import { CovertObjectToStyles } from 'helpers/styles';
import { MakeSlot } from 'helpers/ui';
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

  .${CARD_BODY_DATE_WRAPPER} ::slotted(*) {
    ${CovertObjectToStyles({ styles: typography['.umd-sans-min'] })}
    color: ${colors.gray.mediumAA};
  }

  .${CARD_BODY_CTA_WRAPPER} {
    margin-top: ${spacing.min};
  }

  .${CARD_BODY_CTA_WRAPPER} ::slotted(*) {
    ${CovertObjectToStyles({
      styles: typography['.umd-interactive-sans-small'],
    })}
    margin-top: 0;
    margin-bottom: 0;
    transition: 'background 0.5s, border 0.5s, color 0.5s',
    textAlign: 'center',
  }
`;

export const CreateBody = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');

  const textSlot = MakeSlot({ type: SLOTS.TEXT });
  const dateSlot = MakeSlot({ type: SLOTS.DATE });
  const ctaSlot = MakeSlot({ type: SLOTS.CTA });

  container.classList.add(CARD_BODY_CONTAINER);

  if (textSlot) {
    const textWrapper = document.createElement('div');
    textWrapper.appendChild(textSlot);
    textWrapper.classList.add(CARD_BODY_TEXT_WRAPPER);
    container.appendChild(textWrapper);
  }

  if (dateSlot) {
    const dateWrapper = document.createElement('div');
    dateWrapper.appendChild(dateSlot);
    dateWrapper.classList.add(CARD_BODY_DATE_WRAPPER);
    container.appendChild(dateWrapper);
  }

  if (ctaSlot) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.appendChild(ctaSlot);
    ctaWrapper.classList.add(CARD_BODY_CTA_WRAPPER);
    container.appendChild(ctaWrapper);
  }

  return container;
};
