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

const TEXT_CHARACTER_LIMIT = 140;

const CARD_OVERLAY_EYEBROW = 'umd-overlay-card-eyebrow';
const CARD_OVERLAY_DATE = 'umd-overlay-card-date';

export const ContentStyles = `
  .${ELEMENTS.CONTENT_CONTAINER} {
    position: relative;
    z-index: 9;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_EYEBROW} *`]: typography['.umd-eyebrow'],
    },
  })}

  * + .${ELEMENTS.CARD_OVERLAY_HEADLINE} {
    margin-top: ${spacing.min}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_OVERLAY_HEADLINE} *`]: typography['.umd-sans-larger'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_OVERLAY_HEADLINE} a`]:
        animatedLinks['.umd-slidein-underline-white'],
    },
  })}

  * + .${ELEMENTS.CARD_OVERLAY_TEXT} {
    margin-top: ${spacing.sm}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_OVERLAY_TEXT} *`]: typography['.umd-sans-small'],
    },
  })}

  .${ELEMENTS.CARD_OVERLAY_TEXT} a {
    text-decoration: underline;
    transition: color 0.3s ease-in-out;
  }

  .${ELEMENTS.CARD_OVERLAY_TEXT} a:hover, 
  .${ELEMENTS.CARD_OVERLAY_TEXT} a:focus {
    text-decoration: underline;
    color: ${colors.red};
  }

  * + .${CARD_OVERLAY_DATE} {
    margin-top: ${spacing.min}
  }

  .${CARD_OVERLAY_DATE} * {
    color: ${colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_DATE} *`]: typography['.umd-sans-min'],
    },
  })}
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
    CheckForAnimationLinkSpan({ element: headlineSlot });
    headlineSlot.classList.add(ELEMENTS.CARD_OVERLAY_HEADLINE);
    container.appendChild(headlineSlot);
  }

  if (textSlot) {
    const hasImage = element.hasAttribute('data-image');
    const hasLongText = textSlot.innerHTML.length > TEXT_CHARACTER_LIMIT;

    if (hasImage && hasLongText) {
      let modifiedText = textSlot.innerHTML.substring(0, TEXT_CHARACTER_LIMIT);
      modifiedText += '...';
      textSlot.innerHTML = modifiedText;
    }

    textSlot.classList.add(ELEMENTS.CARD_OVERLAY_TEXT);
    container.appendChild(textSlot);
  }

  if (dateSlot) {
    dateSlot.classList.add(CARD_OVERLAY_DATE);
    container.appendChild(dateSlot);
  }

  return container;
};
