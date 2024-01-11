import {
  animatedLinks,
  colors,
  spacing,
  typography,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { SLOTS, ELEMENTS, BREAKPOINTS } from '../globals';
import { CardType } from '../component';

const CARD_INTRO_WRAPPER = 'umd-card-overlay-intro-wrapper';
const CARD_HEADLINE_WRAPPER = 'umd-card-overlay-headline-wrapper';
const CARD_EYEBROW_WRAPPER = 'umd-card-overlay-eyebrow-wrapper';

// prettier-ignore
const eyebrowStyles = `
  .${ELEMENTS.CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER} * {
    color: ${colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER}`]:
        typography['.umd-sans-smaller'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER} *`]:
        typography['.umd-sans-smaller'],
    },
  })}

  .${ELEMENTS.CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER} a:hover,
  .${ELEMENTS.CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER} a:focus {
    text-decoration: underline;
  }
`;

// prettier-ignore
const headlineStyles = `
  * + .${CARD_HEADLINE_WRAPPER} {
    margin-top: ${spacing.min}
  }

  .${ELEMENTS.CARD_INTRO_CONTAINER} .${CARD_HEADLINE_WRAPPER} * {
    color: ${colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_INTRO_CONTAINER} .${CARD_HEADLINE_WRAPPER}`]:
        typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CARD_INTRO_CONTAINER} .${CARD_HEADLINE_WRAPPER} *`]:
        typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_HEADLINE_WRAPPER} a`]:
        animatedLinks['.umd-slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
export const IntroStyles = `
  @media (max-width: ${BREAKPOINTS.TABLET - 1}px) {
    .${ELEMENTS.CARD_INTRO_CONTAINER} {
      display: flex;
      margin-bottom: ${spacing.min};
    }
  }

  @media (min-width: ${BREAKPOINTS.TABLET}px) {
    .${ELEMENTS.CARD_INTRO_CONTAINER} {
      padding-top: ${spacing.md};
    }
  }

  @media (max-width: ${BREAKPOINTS.TABLET - 1}px) {
    .${CARD_INTRO_WRAPPER} {
      width: 70%;
      padding-right: ${spacing.md};
      flex: 1 0;
    }
  }

  ${eyebrowStyles}
  ${headlineStyles}
`;

export const CreateIntro = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: SLOTS.EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });

  textContainer.classList.add(CARD_INTRO_WRAPPER);

  if (eyebrowSlot) {
    eyebrowSlot.classList.add(CARD_EYEBROW_WRAPPER);
    textContainer.appendChild(eyebrowSlot);
  }

  if (headlineSlot) {
    CheckForAnimationLinkSpan({ element: headlineSlot });
    headlineSlot.classList.add(CARD_HEADLINE_WRAPPER);
    textContainer.appendChild(headlineSlot);
  }

  container.classList.add(ELEMENTS.CARD_INTRO_CONTAINER);
  container.appendChild(textContainer);

  return container;
};
