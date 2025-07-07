/**
 * Asset-related style utilities
 * Functions for calculating responsive sizes and dimensions
 */

/**
 * Calculate responsive image size based on container and viewport constraints
 */
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