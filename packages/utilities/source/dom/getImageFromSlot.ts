/**
 * Retrieves an image element from a named slot in a Shadow DOM component
 *
 * Searches for an element with the specified slot name and returns the image,
 * whether the slotted element itself is an image or contains an image child.
 * Returns null if no image is found.
 *
 * @param element - The parent element containing the slot
 * @param slotRef - The slot name to search for
 * @returns The HTMLImageElement if found, null otherwise
 *
 * @example
 * ```typescript
 * // HTML: <my-component><img slot="hero" src="hero.jpg" /></my-component>
 * const component = document.querySelector('my-component');
 * const heroImage = getImageFromSlot({
 *   element: component,
 *   slotRef: 'hero'
 * });
 * // Returns the img element
 *
 * // Also works with nested images
 * // HTML: <my-component><div slot="hero"><img src="hero.jpg" /></div></my-component>
 * const nestedImage = getImageFromSlot({
 *   element: component,
 *   slotRef: 'hero'
 * });
 * // Returns the img element inside the div
 * ```
 *
 * @category dom
 */
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
