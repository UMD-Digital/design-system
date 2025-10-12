/**
 * Wraps text nodes within links or buttons in span elements
 *
 * Finds text nodes that are direct children of links or buttons and wraps them
 * in span elements. This is useful for styling or animation purposes.
 *
 * @param element - The element containing the link or button, or the link/button itself
 * @returns The target element (link or button), or undefined if not found
 *
 * @example
 * ```typescript
 * const button = document.createElement('button');
 * button.innerHTML = 'Click me';
 * wrapTextNodeInSpan(button);
 * // Result: <button><span>Click me</span></button>
 * ```
 *
 * @category dom
 */
export const wrapTextNodeInSpan = (
  element: HTMLElement | HTMLAnchorElement | HTMLButtonElement,
): HTMLElement | HTMLAnchorElement | HTMLButtonElement | undefined => {
  const target =
    element instanceof HTMLElement && !('href' in element || 'type' in element)
      ? (element.querySelector('a, button') as HTMLElement | HTMLAnchorElement | HTMLButtonElement | null)
      : element;

  if (!target) return;

  const textNodes = Array.from(target.childNodes).filter(
    (node) => node.nodeType === Node.TEXT_NODE,
  );

  textNodes.forEach((node) => {
    const span = document.createElement('span');
    span.textContent = node.textContent?.trim() || '';
    node.replaceWith(span);
  });

  return target;
};