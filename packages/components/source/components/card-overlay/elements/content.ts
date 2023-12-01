import {
  typography,
  spacing,
  colors,
} from '@universityofmaryland/umd-web-configuration';
import { MakeSlot } from 'helpers/ui';
import { CovertObjectToStyles } from 'helpers/styles';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

const OVERLAY_CARD_HEADLINE = 'umd-overlay-card-headline';
const OVERLAY_CARD_EYEBROW = 'umd-overlay-card-eyebrow';
const OVERLAY_CARD_TEXT = 'umd-overlay-card-text';
const OVERLAY_CARD_DATE = 'umd-overlay-card-date';

export const ContentStyles = `
  .${ELEMENTS.CONTENT_CONTAINER} {
    position: relative;
    z-index: 9;
  }

  .${OVERLAY_CARD_EYEBROW} ::slotted(*) {
    ${CovertObjectToStyles({ styles: typography['.umd-eyebrow'] })}
  }

  * + .${OVERLAY_CARD_HEADLINE} {
    margin-top: ${spacing.min}
  }

  .${OVERLAY_CARD_HEADLINE}::slotted(*) {
    ${CovertObjectToStyles({ styles: typography['.umd-sans-larger'] })}
  }

  * + .${OVERLAY_CARD_TEXT} {
    margin-top: ${spacing.sm}
  }

  * + .${OVERLAY_CARD_DATE} {
    margin-top: ${spacing.min}
  }

  .${OVERLAY_CARD_DATE} ::slotted(*) {
    ${CovertObjectToStyles({ styles: typography['.umd-sans-min'] })}
    color: ${colors.gray.mediumAA};
  }
`;

export const CreateContent = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const eyebrowWrapper = document.createElement('div');
  const headlineWrapper = document.createElement('div');
  const textWrapper = document.createElement('div');
  const dateWrapper = document.createElement('div');
  const eyebrowSlot = MakeSlot({ type: SLOTS.EYEBROW });
  const headlineSlot = MakeSlot({ type: SLOTS.HEADLINE });
  const textSlot = MakeSlot({ type: SLOTS.TEXT });
  const dateSlot = MakeSlot({ type: SLOTS.DATE });

  container.classList.add(ELEMENTS.CONTENT_CONTAINER);

  eyebrowWrapper.appendChild(eyebrowSlot);
  eyebrowWrapper.classList.add(OVERLAY_CARD_EYEBROW);

  headlineWrapper.appendChild(headlineSlot);
  headlineWrapper.classList.add(OVERLAY_CARD_HEADLINE);

  textWrapper.appendChild(textSlot);
  textWrapper.classList.add(OVERLAY_CARD_TEXT);

  dateWrapper.appendChild(dateSlot);
  dateWrapper.classList.add(OVERLAY_CARD_DATE);

  container.appendChild(eyebrowWrapper);
  container.appendChild(headlineWrapper);
  container.appendChild(textWrapper);
  container.appendChild(dateWrapper);

  return container;
};
