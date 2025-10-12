/**
 * Extracts and prepares an icon element (SVG or IMG) from a container
 *
 * Searches for SVG or IMG elements within a container and applies custom
 * color if specified. Returns null if no icon is found.
 *
 * @param element - The container element to search
 * @returns The icon element (SVG or IMG) or null if not found
 *
 * @example
 * ```typescript
 * const container = document.createElement('div');
 * const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
 * svg.setAttribute('color', '#ff0000');
 * container.appendChild(svg);
 *
 * const icon = extractIconElement({ element: container });
 * // Returns the SVG element with color applied
 * ```
 *
 * @category dom
 */
export const extractIconElement = ({ element }: { element: HTMLElement }) => {
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
