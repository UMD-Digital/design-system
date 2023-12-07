import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import { BREAKPOINTS, SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

// prettier-ignore
export const ImageStyles = `
  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${ELEMENTS.IMAGE_CONTAINER} {
      width: 30%;
      order: 2;
    }
  }

  .${ELEMENTS.IMAGE_CONTAINER} a {
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  .${ELEMENTS.IMAGE_CONTAINER} a img {
    object-fit: cover;
    object-position: 50% 50%;
    transform: scale(1);
    transition: transform 0.5s;
    width: 100%;
  }

  .${ELEMENTS.IMAGE_CONTAINER} a:hover img,
  .${ELEMENTS.IMAGE_CONTAINER} a:focus img {
    transform: scale(1.025);
  }
`;

export const CreateImage = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const isProperImage = CheckForImageAlt({ element, slotRef: SLOTS.IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: SLOTS.IMAGE });

  container.classList.add(ELEMENTS.IMAGE_CONTAINER);

  if (isProperImage && slotImage) {
    const clonedImage = slotImage.cloneNode(true) as HTMLImageElement;
    container.appendChild(clonedImage);

    return container;
  }

  return null;
};
