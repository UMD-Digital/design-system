import { SlotWithDefaultStyling } from './create';

export const imageAlt = ({
  element,
  slotRef,
}: {
  element: HTMLElement;
  slotRef: string;
}) => {
  const imageSlot: any = element.querySelector(
    `[slot="${slotRef}"]`,
  ) as HTMLElement;
  const isImage = imageSlot instanceof HTMLImageElement;
  let image = imageSlot;

  if (!isImage && imageSlot) {
    image = imageSlot.querySelector('img');
  }

  return ImageHasAlt({ image });
};

export const ImageHasAlt = ({ image }: { image: HTMLImageElement }) => {
  if (!image) return true;

  const altText = image.getAttribute('alt');
  if (!altText) {
    console.error('Image elements require alt text');
    return false;
  }

  return true;
};

export const ImageSlot = ({
  element,
  ImageSlot,
}: {
  element: HTMLElement;
  ImageSlot: string;
}) => {
  const isProperImage = imageAlt({ element, slotRef: ImageSlot });
  const slotImage = SlotWithDefaultStyling({ element, slotRef: ImageSlot });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};
