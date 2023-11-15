import { MakeSlot } from 'helpers/ui';
import { CheckForImageAlt } from 'helpers/ui';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

export const ImageStyles = `
  .${ELEMENTS.CARD_OVERLAY_IMAGE_CONTAINER} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  .${ELEMENTS.CARD_OVERLAY_IMAGE_CONTAINER} img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1);
    transition: transform 0.5s ease-in-out;
  }
`;

export const CreateImage = ({ element }: { element: CardType }) => {
  const imageRef = element.querySelector(
    `[slot="${SLOTS.IMAGE}"]`,
  ) as HTMLImageElement;
  const container = document.createElement('div');
  const isProperImage = CheckForImageAlt({ element, slotRef: SLOTS.IMAGE });

  container.classList.add(ELEMENTS.CARD_OVERLAY_IMAGE_CONTAINER);

  if (isProperImage && imageRef) {
    const image = imageRef.cloneNode(true) as HTMLImageElement;
    container.appendChild(image);
  }

  return container;
};
