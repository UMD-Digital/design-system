export const getResponsiveImageSize = ({
  image,
  parentNode,
  maxWindowHeight = window.innerHeight - 48,
}: {
  image: HTMLImageElement;
  parentNode: HTMLElement;
  maxWindowHeight?: number;
}) => {
  if (!image) return maxWindowHeight;

  const imgHeight = image.naturalHeight;
  const aspectRatio = image.naturalWidth / imgHeight;
  const maxElementHeight = parentNode.offsetWidth / aspectRatio;
  const maxHeight =
    maxElementHeight > maxWindowHeight ? maxWindowHeight : maxElementHeight;
  const defaultImageHeight = imgHeight > maxHeight ? maxHeight : imgHeight;

  return defaultImageHeight;
};
