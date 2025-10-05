import { getImageFromSlot } from '../dom';
import { createSlotWithStyleOverwrite } from '../elements';
import { imageHasAlt } from './imageHasAlt';

export const slotImage = ({
  element,
  slotName,
}: {
  element: HTMLElement;
  slotName: string;
}) => {
  const imageFromSlot = getImageFromSlot({ element, slotRef: slotName });
  const isProperImage = imageHasAlt(imageFromSlot);
  const slotImage = createSlotWithStyleOverwrite({
    element,
    slotRef: slotName,
  });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};
