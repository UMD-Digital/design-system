import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { MakeSlot, CheckForImageAlt } from 'helpers/ui';
import { SLOTS } from '../globals';
import { CardType } from '../component';

const CARD_OVERLAY_HEADLINE_CONTAINER = 'umd-card-overlay-headline-container';
const CARD_OVERLAY_HEADLINE_WRAPPER = 'umd-card-overlay-headline-wrapper';
const CARD_OVERLAY_MOBILE_IMAGE_CONTAINER =
  'umd-card-overlay-mobile-image-container';

export const HeadlineStyles = `
  @media (max-width: 767px) {
    .${CARD_OVERLAY_HEADLINE_CONTAINER} {
      display: flex;
      margin-bottom: ${spacing.min};
    }
  }

  @media (max-width: 767px) {
    .${CARD_OVERLAY_HEADLINE_WRAPPER} {
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
`;

export const CreateHeadline = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const imageContainer = document.createElement('div');
  const imageRef = element.querySelector(
    `[slot="${SLOTS.IMAGE}"]`,
  ) as HTMLImageElement;
  const headlineSlot = MakeSlot({ type: SLOTS.HEADLINE });
  const isProperImage = CheckForImageAlt({ element, slotRef: SLOTS.IMAGE });

  container.classList.add(CARD_OVERLAY_HEADLINE_CONTAINER);

  textContainer.classList.add(CARD_OVERLAY_HEADLINE_WRAPPER);
  textContainer.appendChild(headlineSlot);
  container.appendChild(textContainer);

  if (isProperImage && imageRef) {
    const clonedImage = imageRef.cloneNode(true) as HTMLImageElement;
    imageContainer.classList.add(CARD_OVERLAY_MOBILE_IMAGE_CONTAINER);
    imageContainer.appendChild(clonedImage);
    container.appendChild(imageContainer);
  }

  return container;
};
