import { spacing } from '@universityofmaryland/umd-web-configuration';
import { CheckForImageAlt } from 'helpers/ui';
import { SLOTS } from '../globals';
import { CardType } from '../component';

const IMAGE_CONTAINER = 'umd-card-image-container';

export const ImageStyles = `
  @media (max-width: 767px) {
    .${IMAGE_CONTAINER} {
      display: none;
    }
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
    const clonedImage = imageRef.cloneNode(true) as HTMLImageElement;
    container.appendChild(clonedImage);

    return container;
  }

  return null;
};
