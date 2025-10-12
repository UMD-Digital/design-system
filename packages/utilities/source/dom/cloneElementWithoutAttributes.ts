/**
 * Creates a clean copy of an element, removing all attributes except href
 *
 * Clones an element and strips all attributes except the href attribute,
 * which is preserved for links. Useful for sanitizing copied elements.
 *
 * @param element - The element to clone and clean
 * @returns The cleaned clone of the element
 *
 * @example
 * ```typescript
 * const link = document.createElement('a');
 * link.href = 'https://example.com';
 * link.className = 'styled-link';
 * link.setAttribute('data-tracking', 'click-event');
 *
 * const cleaned = cloneElementWithoutAttributes({ element: link });
 * // Result: <a href="https://example.com"></a>
 * // All attributes except href are removed
 * ```
 *
 * @category dom
 */
export const cloneElementWithoutAttributes = ({
  element,
}: {
  element: HTMLElement;
}): HTMLElement => {
  const clonedNode = element.cloneNode(true) as HTMLElement;
  const attributes = Array.from(clonedNode.attributes);

  attributes.forEach((attribute) => {
    const name = attribute.name;

    if (name !== 'href') {
      clonedNode.removeAttribute(name);
    }
  });

  return clonedNode;
};
