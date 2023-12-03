import {
  typography,
  spacing,
  colors,
  animatedLinks,
  richText,
} from '@universityofmaryland/umd-web-configuration';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

const CARD_OVERLAY_EYEBROW = 'umd-overlay-card-eyebrow';
const CARD_OVERLAY_TEXT = 'umd-overlay-card-text';
const CARD_OVERLAY_DATE = 'umd-overlay-card-date';

export const ContentStyles = `
  .${ELEMENTS.CONTENT_CONTAINER} {
    position: relative;
    z-index: 9;
  }

  .${CARD_OVERLAY_EYEBROW} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-eyebrow'],
    })}
  }

  * + .${ELEMENTS.CARD_OVERLAY_HEADLINE} {
    margin-top: ${spacing.min}
  }

  .${ELEMENTS.CARD_OVERLAY_HEADLINE} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-sans-larger'],
    })}
  }

  .${ELEMENTS.CARD_OVERLAY_HEADLINE} a {
    ${ConvertJSSObjectToStyles({
      styleObj: animatedLinks['.umd-slidein-underline-white'],
    })}
  }

  * + .${CARD_OVERLAY_TEXT} {
    margin-top: ${spacing.sm}
  }

  .${CARD_OVERLAY_TEXT} {
    ${ConvertJSSObjectToStyles({
      styleObj: richText['.umd-rich-text'],
    })}
  }

  * + .${CARD_OVERLAY_DATE} {
    margin-top: ${spacing.min}
  }

  .${CARD_OVERLAY_DATE} * {
    color: ${colors.gray.mediumAA};
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-sans-min'],
    })}
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
    eyebrowSlot.classList.add(CARD_OVERLAY_EYEBROW);
    container.appendChild(eyebrowSlot);
  }

  if (headlineSlot) {
    const validatedHeadline = CheckForAnimationLinkSpan({
      element: headlineSlot,
    });
    headlineSlot.classList.add(ELEMENTS.CARD_OVERLAY_HEADLINE);
    container.appendChild(headlineSlot);
  }

  if (textSlot) {
    const textWrapper = document.createElement('div');
    textWrapper.appendChild(textSlot);
    textWrapper.classList.add(CARD_OVERLAY_TEXT);
    container.appendChild(textWrapper);
  }

  if (dateSlot) {
    dateSlot.classList.add(CARD_OVERLAY_DATE);
    container.appendChild(dateSlot);
  }

  return container;
};
