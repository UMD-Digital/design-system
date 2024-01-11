import {
  typography,
  spacing,
  colors,
  animatedLinks,
} from '@universityofmaryland/variables';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CardType } from 'components/card-overlay/component';
import { SLOTS, ELEMENTS, VARIABLES } from 'components/card-overlay/globals';

const TEXT_CHARACTER_LIMIT = 140;

const CARD_OVERLAY_EYEBROW = 'umd-overlay-card-eyebrow';
const CARD_OVERLAY_DATE = 'umd-overlay-card-date';

// prettier-ignore
const eyebrowStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_EYEBROW}`]: typography['.umd-eyebrow'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_EYEBROW} *`]: typography['.umd-eyebrow'],
    },
  })}
`;

// prettier-ignore
const headlineStyles = `
  * + .${ELEMENTS.CARD_OVERLAY_HEADLINE} {
    margin-top: ${spacing.min}
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_OVERLAY_HEADLINE}`]: typography['.umd-sans-larger'],
    },
  })}

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
`;

// prettier-ignore
const textStyles = `
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
`;

// prettier-ignore
const dateStyles = `
  * + .${CARD_OVERLAY_DATE} {
    margin-top: ${spacing.min}
  }

  .${CARD_OVERLAY_DATE} * {
    color: ${colors.gray.mediumAA};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_DATE}`]: typography['.umd-sans-min'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_DATE} *`]: typography['.umd-sans-min'],
    },
  })}
`

// prettier-ignore
export const ContentStyles = `
  .${ELEMENTS.CONTENT_CONTAINER} {
    position: relative;
    z-index: 9;
  }

  ${eyebrowStyles}
  ${headlineStyles}
  ${textStyles}
  ${dateStyles}
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
    const hasImage = element.hasAttribute(VARIABLES.ATTR_IMAGE);
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
