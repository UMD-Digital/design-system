/**
 * Recursively finds a parent element with a specified attribute
 *
 * Traverses up the DOM tree from the given element until it finds a parent
 * with the specified attribute, or reaches the root.
 *
 * @param element - The starting element
 * @param attr - The attribute name to search for
 * @returns The parent element with the attribute, or the original element if not found
 *
 * @example
 * ```typescript
 * const button = document.querySelector('button');
 * const dialog = findParent({ element: button, attr: 'role' });
 * // Returns the closest ancestor with a 'role' attribute
 * ```
 *
 * @category dom
 */
export const findParent = ({
  element,
  attr,
}: {
  element: HTMLElement;
  attr: string;
}): HTMLElement => {
  const findParentElementByAttribute = (
    el: HTMLElement | null,
    attribute: string,
  ): HTMLElement | null => {
    if (!el || el.hasAttribute(attribute)) {
      return el;
    }
    return findParentElementByAttribute(el.parentElement, attribute);
  };

  const foundElement = findParentElementByAttribute(element, attr);
  return foundElement || element;
};