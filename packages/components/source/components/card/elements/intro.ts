import {
  colors,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { MakeSlot, CheckForImageAlt } from 'helpers/ui';
import { SLOTS } from '../globals';
import { CardType } from '../component';

const CARD_OVERLAY_INTRO_CONTAINER = 'umd-card-overlay-intro-container';
const CARD_OVERLAY_INTRO_WRAPPER = 'umd-card-overlay-intro-wrapper';
const CARD_OVERLAY_MOBILE_IMAGE_CONTAINER =
  'umd-card-overlay-mobile-image-container';

const CARD_OVERLAY_HEADLINE_WRAPPER = 'umd-card-overlay-headline-wrapper';
const CARD_OVERLAY_EYEBROW_WRAPPER = 'umd-card-overlay-eyebrow-wrapper';

export const IntroStyles = `
  @media (max-width: 767px) {
    .${CARD_OVERLAY_INTRO_CONTAINER} {
      display: flex;
      margin-bottom: ${spacing.min};
    }
  }

  @media (max-width: 767px) {
    .${CARD_OVERLAY_INTRO_WRAPPER} {
      width: 70%;
      padding-right: ${spacing.md};
      flex: 1 0;
      align-self: flex-end;
    }
  }

  @media (max-width: 767px) {
    .${CARD_OVERLAY_MOBILE_IMAGE_CONTAINER} {
      width: 30%;
      object-fit: cover;
      object-position: center;
    }
  }

  @media (min-width: 768px) {
    .${CARD_OVERLAY_MOBILE_IMAGE_CONTAINER} {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .${CARD_OVERLAY_MOBILE_IMAGE_CONTAINER} img {
     aspect-ratio: 5/4;
    }
  }

  .${CARD_OVERLAY_EYEBROW_WRAPPER} ::slotted(*) {
    ${ConvertJSSObjectToStyles({ styleObj: typography['.umd-sans-smaller'] })}
    color: ${colors.black};
  }

  * + .${CARD_OVERLAY_HEADLINE_WRAPPER} {
    margin-top: ${spacing.min}
  }

  .${CARD_OVERLAY_HEADLINE_WRAPPER} ::slotted(*) {
    ${ConvertJSSObjectToStyles({ styleObj: typography['.umd-sans-large'] })}
    color: ${colors.black};
  }
`;

export const CreateIntro = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const imageContainer = document.createElement('div');

  const imageRef = element.querySelector(
    `[slot="${SLOTS.IMAGE}"]`,
  ) as HTMLImageElement;
  const eyebrowSlot = MakeSlot({ type: SLOTS.EYEBROW });
  const headlineSlot = MakeSlot({ type: SLOTS.HEADLINE });
  const isProperImage = CheckForImageAlt({ element, slotRef: SLOTS.IMAGE });

  textContainer.classList.add(CARD_OVERLAY_INTRO_WRAPPER);

  if (eyebrowSlot) {
    const eyebrowWrapper = document.createElement('div');
    eyebrowWrapper.appendChild(eyebrowSlot);
    eyebrowWrapper.classList.add(CARD_OVERLAY_EYEBROW_WRAPPER);
    textContainer.appendChild(eyebrowWrapper);
  }

  if (headlineSlot) {
    const headlineWrapper = document.createElement('div');
    headlineWrapper.appendChild(headlineSlot);
    headlineWrapper.classList.add(CARD_OVERLAY_HEADLINE_WRAPPER);
    textContainer.appendChild(headlineWrapper);
  }

  container.classList.add(CARD_OVERLAY_INTRO_CONTAINER);
  container.appendChild(textContainer);

  if (isProperImage && imageRef) {
    const clonedImage = imageRef.cloneNode(true) as HTMLImageElement;
    imageContainer.classList.add(CARD_OVERLAY_MOBILE_IMAGE_CONTAINER);
    imageContainer.appendChild(clonedImage);
    container.appendChild(imageContainer);
  }

  return container;
};
