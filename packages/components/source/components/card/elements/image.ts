import { CheckForImageAlt } from 'helpers/ui';
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
`;

export const CreateImage = ({
  element,
  slotImage,
}: {
  element: CardType;
  slotImage: HTMLSlotElement;
}) => {
  const container = document.createElement('div');
  const isProperImage = CheckForImageAlt({ element, slotRef: SLOTS.IMAGE });

  container.classList.add(ELEMENTS.IMAGE_CONTAINER);

  if (isProperImage && slotImage) {
    const clonedImage = slotImage.cloneNode(true) as HTMLImageElement;
    container.appendChild(clonedImage);

    return container;
  }

  return null;
};
