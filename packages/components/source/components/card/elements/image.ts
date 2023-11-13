import { MakeSlot } from 'helpers/ui';
import { CheckForImageSlot } from '../services/helper';
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
  const isProperImage = CheckForImageSlot({ element });

  container.classList.add(IMAGE_CONTAINER);

  if (isProperImage && imageRef) {
    container.appendChild(imageRef);
  }

  return container;
};
