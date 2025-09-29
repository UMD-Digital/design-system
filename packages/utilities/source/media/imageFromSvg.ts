/**
 * Creates an HTML image element from an SVG string by converting it to a base64 data URI.
 * This is useful for embedding SVG content as an image element rather than inline SVG.
 *
 * @param SVG - The SVG markup as a string
 * @returns An HTMLImageElement with the SVG encoded as a data URI source
 *
 * @example
 * ```typescript
 * const svgMarkup = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/></svg>';
 * const img = imageFromSvg({ SVG: svgMarkup });
 * document.body.appendChild(img);
 * // Creates an img element with src="data:image/svg+xml;base64,..."
 * ```
 */
export const imageFromSvg = ({ SVG }: { SVG: string }): HTMLImageElement => {
  const image = document.createElement('img');

  image.src = `data:image/svg+xml;base64,${btoa(SVG)}`;
  return image;
};