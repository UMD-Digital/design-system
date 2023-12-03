import {
  typography,
  spacing,
  colors,
  animatedLinks,
  richText,
} from '@universityofmaryland/umd-web-configuration';
import { SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
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

  .${OVERLAY_CARD_EYEBROW} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-eyebrow'],
    })}
  }

  * + .${OVERLAY_CARD_HEADLINE} {
    margin-top: ${spacing.min}
  }

  .${OVERLAY_CARD_HEADLINE} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-sans-larger'],
    })}
  }

  .${OVERLAY_CARD_HEADLINE} a {
    ${ConvertJSSObjectToStyles({
      styleObj: animatedLinks['.umd-slidein-underline-white'],
    })}
  }

  * + .${OVERLAY_CARD_TEXT} {
    margin-top: ${spacing.sm}
  }

  .${OVERLAY_CARD_TEXT} {
    ${ConvertJSSObjectToStyles({
      styleObj: richText['.umd-rich-text'],
    })}
  }

  * + .${OVERLAY_CARD_DATE} {
    margin-top: ${spacing.min}
  }

  .${OVERLAY_CARD_DATE} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-sans-min'],
    })}
    color: ${colors.gray.mediumAA};
  }

`;

export const CreateContent = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: SLOTS.EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });
  const textSlot = SlotDefaultStyling({ element, slotRef: SLOTS.TEXT });
  const dateSlot = SlotDefaultStyling({ element, slotRef: SLOTS.DATE });

  container.classList.add(ELEMENTS.CONTENT_CONTAINER);

  if (eyebrowSlot) {
    eyebrowSlot.classList.add(OVERLAY_CARD_EYEBROW);
    container.appendChild(eyebrowSlot);
  }

  if (headlineSlot) {
    headlineSlot.classList.add(OVERLAY_CARD_HEADLINE);
    container.appendChild(headlineSlot);
  }

  if (textSlot) {
    const textWrapper = document.createElement('div');
    textWrapper.appendChild(textSlot);
    textWrapper.classList.add(OVERLAY_CARD_TEXT);
    container.appendChild(textWrapper);
  }

  if (dateSlot) {
    dateSlot.classList.add(OVERLAY_CARD_DATE);
    container.appendChild(dateSlot);
  }

  return container;
};
