import { SlotWithDefaultStyling } from './create';

const ImageHasAlt = ({ image }: { image: HTMLImageElement }) => {
  if (!image) return true;

  const altText = image.getAttribute('alt');
  if (!altText) {
    console.error('Image elements require alt text');
    return false;
  }

  return true;
};

const ImageAlt = ({
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

const ImageSlot = ({
  element,
  ImageSlot,
}: {
  element: HTMLElement;
  ImageSlot: string;
}) => {
  const isProperImage = ImageAlt({ element, slotRef: ImageSlot });
  const slotImage = SlotWithDefaultStyling({ element, slotRef: ImageSlot });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

export default {
  ImageHasAlt,
  ImageAlt,
  ImageSlot,
};
