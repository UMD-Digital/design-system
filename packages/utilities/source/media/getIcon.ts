/**
 * Retrieves and optionally colors an icon (SVG or IMG) from within a container element.
 * Searches for SVG or IMG elements and applies color styling if specified on the SVG.
 *
 * @param element - The container element to search for icons within
 * @returns The found SVG or IMG element, or null if none found
 *
 * @example
 * ```typescript
 * // HTML: <div id="container"><svg color="#ff0000"><path/></svg></div>
 * const container = document.getElementById('container');
 * const icon = getIcon({ element: container });
 *
 * if (icon) {
 *   document.body.appendChild(icon);
 *   // The SVG's path will be colored red based on the color attribute
 * }
 * ```
 *
 * @example
 * ```typescript
 * // HTML: <div id="container"><img src="icon.png" /></div>
 * const container = document.getElementById('container');
 * const icon = getIcon({ element: container });
 * // Returns the img element
 * ```
 */
export const getIcon = ({
  element,
}: {
  element: HTMLElement;
}): SVGElement | HTMLImageElement | null => {
  const svgIcon = element.querySelector(`svg`);
  const imgIcon = element.querySelector(`img`);

  if (svgIcon) {
    const colorSet = svgIcon.getAttribute('color');

    if (colorSet) {
      const path = svgIcon.querySelector('path');
      if (path) path.style.fill = colorSet;
    }

    return svgIcon;
  }

  if (imgIcon) return imgIcon;
  return null;
};