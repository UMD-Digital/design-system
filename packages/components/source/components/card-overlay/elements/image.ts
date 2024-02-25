import { CheckForImageAlt } from 'helpers/ui';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../index';

const { IMAGE } = SLOTS;
const { CARD_OVERLAY_IMAGE_CONTAINER } = ELEMENTS;

// prettier-ignore
export const ImageStyles = `
  .${CARD_OVERLAY_IMAGE_CONTAINER} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  .${CARD_OVERLAY_IMAGE_CONTAINER} img {
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
    `[slot="${IMAGE}"]`,
  ) as HTMLImageElement;
  const container = document.createElement('div');
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });

  container.classList.add(CARD_OVERLAY_IMAGE_CONTAINER);

  if (isProperImage && imageRef) {
    const image = imageRef.cloneNode(true) as HTMLImageElement;
    container.appendChild(image);
  }

  return container;
};
