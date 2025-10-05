export const getImageFromSlot = ({
  element,
  slotRef,
}: {
  element: HTMLElement;
  slotRef: string;
}): HTMLImageElement | null => {
  const imageSlot: any = element.querySelector(
    `[slot="${slotRef}"]`,
  ) as HTMLElement;
  const isImage = imageSlot instanceof HTMLImageElement;
  let image = imageSlot;

  if (isImage) {
    return image;
  }

  if (!isImage && imageSlot) {
    image = imageSlot.querySelector('img');
    return image;
  }

  return null;
};
