import {
  animatedLinks,
  colors,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  CheckForAnimationLinkSpan,
  CheckForImageAlt,
  SlotDefaultStyling,
} from 'helpers/ui';
import { SLOTS } from '../globals';
import { CardType } from '../component';

const CARD_INTRO_CONTAINER = 'umd-card-overlay-intro-container';
const CARD_INTRO_WRAPPER = 'umd-card-overlay-intro-wrapper';
const CARD_MOBILE_IMAGE_CONTAINER = 'umd-card-overlay-mobile-image-container';
const CARD_HEADLINE_WRAPPER = 'umd-card-overlay-headline-wrapper';
const CARD_EYEBROW_WRAPPER = 'umd-card-overlay-eyebrow-wrapper';

export const IntroStyles = `
  @media (max-width: 767px) {
    .${CARD_INTRO_CONTAINER} {
      display: flex;
      margin-bottom: ${spacing.min};
    }
  }

  @media (min-width: 768px) {
    .${CARD_INTRO_CONTAINER} {
      padding-top: ${spacing.md};
    }
  }

  @media (max-width: 767px) {
    .${CARD_INTRO_WRAPPER} {
      width: 70%;
      padding-right: ${spacing.md};
      flex: 1 0;
    }
  }

  @media (max-width: 767px) {
    .${CARD_MOBILE_IMAGE_CONTAINER} {
      width: 30%;
      object-fit: cover;
      object-position: center;
    }
  }

  @media (min-width: 768px) {
    .${CARD_MOBILE_IMAGE_CONTAINER} {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .${CARD_MOBILE_IMAGE_CONTAINER} img {
     aspect-ratio: 5/4;
    }
  }

  .${CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER} * {
    color: ${colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER} *`]:
        typography['.umd-sans-smaller'],
    },
  })}

  .${CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER} a:hover,
  .${CARD_INTRO_CONTAINER} .${CARD_EYEBROW_WRAPPER} a:focus {
    text-decoration: underline;
  }

  * + .${CARD_HEADLINE_WRAPPER} {
    margin-top: ${spacing.min}
  }

  .${CARD_INTRO_CONTAINER} .${CARD_HEADLINE_WRAPPER} * {
    color: ${colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_INTRO_CONTAINER} .${CARD_HEADLINE_WRAPPER} *`]:
        typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_HEADLINE_WRAPPER} a `]:
        animatedLinks['.umd-slidein-underline-black'],
    },
  })}
`;

export const CreateIntro = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const imageContainer = document.createElement('div');

  const imageRef = element.querySelector(
    `[slot="${SLOTS.IMAGE}"]`,
  ) as HTMLImageElement;

  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: SLOTS.EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });
  const isProperImage = CheckForImageAlt({ element, slotRef: SLOTS.IMAGE });

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

  container.classList.add(CARD_INTRO_CONTAINER);
  container.appendChild(textContainer);

  if (isProperImage && imageRef) {
    const clonedImage = imageRef.cloneNode(true) as HTMLImageElement;
    imageContainer.classList.add(CARD_MOBILE_IMAGE_CONTAINER);
    imageContainer.appendChild(clonedImage);
    container.appendChild(imageContainer);
  }

  return container;
};
