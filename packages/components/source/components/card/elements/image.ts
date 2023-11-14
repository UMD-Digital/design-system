import { MakeSlot } from 'helpers/ui';
import { CheckForImageAlt } from 'helpers/ui';
import { SLOTS } from '../globals';
import { CardType } from '../component';

const IMAGE_CONTAINER = 'umd-card-image-container';

export const ImageStyles = `
  .${IMAGE_CONTAINER} {

  }
`;

export const CreateImage = ({ element }: { element: CardType }) => {
  const imageRef = element.querySelector(
    `[slot="${SLOTS.IMAGE}"]`,
  ) as HTMLImageElement;
  const container = document.createElement('div');

  const isProperImage = CheckForImageAlt({ element, slotRef: SLOTS.IMAGE });

  container.classList.add(IMAGE_CONTAINER);

  if (isProperImage && imageRef) {
    container.appendChild(imageRef);
  }

  return container;
};
