import { getImageFromSlot } from '../dom';
import { createStyledSlotOrClone } from '../elements';
import { imageHasAlt } from './imageHasAlt';

/**
 * Retrieves and validates an image from a slot element
 *
 * Checks if the slot contains a valid image with alt text,
 * and returns a clone of the image if valid.
 *
 * @param element - The parent element containing the slot
 * @param slotName - The name of the slot to check
 * @returns Cloned image element or null if invalid
 *
 * @example
 * ```typescript
 * const container = document.createElement('div');
 * const img = document.createElement('img');
 * img.src = 'image.jpg';
 * img.alt = 'Description';
 * img.setAttribute('slot', 'image');
 * container.appendChild(img);
 *
 * const validImage = getValidatedSlotImage({ element: container, slotName: 'image' });
 * // Returns cloned image element
 * ```
 */
export const getValidatedSlotImage = ({
  element,
  slotName,
}: {
  element: HTMLElement;
  slotName: string;
}) => {
  const imageFromSlot = getImageFromSlot({ element, slotRef: slotName });
  const isProperImage = imageHasAlt(imageFromSlot);
  const slotImage = createStyledSlotOrClone({
    element,
    slotRef: slotName,
  });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};
