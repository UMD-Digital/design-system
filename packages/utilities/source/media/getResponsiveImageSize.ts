/**
 * Calculates the optimal responsive image size based on container dimensions and viewport constraints.
 * Takes into account the image's natural dimensions, parent container width, and maximum viewport height
 * to determine the best display size that maintains aspect ratio while fitting within constraints.
 *
 * @param image - The HTMLImageElement to calculate size for
 * @param parentNode - The parent container element
 * @param maxWindowHeight - Maximum height constraint, defaults to window.innerHeight - 48
 * @returns The calculated optimal image height in pixels
 *
 * @example
 * ```typescript
 * const img = document.querySelector('img');
 * const container = document.querySelector('.image-container');
 *
 * const optimalHeight = getResponsiveImageSize({
 *   image: img,
 *   parentNode: container,
 *   maxWindowHeight: 800
 * });
 *
 * img.style.height = `${optimalHeight}px`;
 * // Sets the image to an optimal height that fits within constraints
 * ```
 *
 * @category media
 */
export const getResponsiveImageSize = ({
  image,
  parentNode,
  maxWindowHeight = window.innerHeight - 48,
}: {
  image: HTMLImageElement;
  parentNode: HTMLElement;
  maxWindowHeight?: number;
}): number => {
  if (!image) return maxWindowHeight;

  const imgHeight = image.naturalHeight;
  const aspectRatio = image.naturalWidth / imgHeight;
  const maxElementHeight = parentNode.offsetWidth / aspectRatio;
  const maxHeight =
    maxElementHeight > maxWindowHeight ? maxWindowHeight : maxElementHeight;
  const defaultImageHeight = imgHeight > maxHeight ? maxHeight : imgHeight;

  return defaultImageHeight;
};