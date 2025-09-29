/**
 * Converts an SVG string into a DOM node that can be inserted into the document.
 * Parses the SVG markup and returns the first child element.
 *
 * @param svgString - The SVG markup as a string
 * @returns The first child node from the parsed SVG, typically an SVGElement
 *
 * @example
 * ```typescript
 * const svgMarkup = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/></svg>';
 * const svgElement = svgFromString(svgMarkup);
 * document.body.appendChild(svgElement);
 * // Inserts the SVG element directly into the DOM
 * ```
 */
export function svgFromString(svgString: string): ChildNode | null {
  const div = document.createElement('div');
  div.innerHTML = svgString.trim();
  return div.firstChild;
}