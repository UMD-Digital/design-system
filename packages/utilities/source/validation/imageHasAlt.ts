/**
 * Checks if an image element has alt text
 *
 * Validates that an HTMLImageElement has a non-empty alt attribute.
 * Logs an error to console if alt text is missing.
 *
 * @param image - The image element to validate
 * @returns True if image has alt text, false otherwise. Returns true if image is null/undefined.
 *
 * @example
 * ```typescript
 * const img = document.querySelector('img');
 * if (!imageHasAlt(img)) {
 *   // Handle missing alt text
 * }
 * ```
 */
export const imageHasAlt = (image: HTMLImageElement | null): boolean => {
  if (!image) return true;

  const altText = image.getAttribute('alt');
  if (!altText) {
    console.error('Image elements require alt text');
    return false;
  }

  return true;
};