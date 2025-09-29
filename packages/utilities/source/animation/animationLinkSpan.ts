/**
 * Wraps link content in a span element for animation purposes
 *
 * Checks if a link's content is already wrapped in a span, and if not, wraps it.
 * Skips slot content to avoid interfering with web component content distribution.
 * This is useful for CSS animations that target the span within links.
 *
 * @param element - The element containing the link, or the link itself
 *
 * @example
 * ```typescript
 * const link = document.createElement('a');
 * link.href = '#';
 * link.textContent = 'Click me';
 *
 * animationLinkSpan({ element: link });
 * // Result: <a href="#"><span>Click me</span></a>
 * ```
 */
export const animationLinkSpan = ({
  element,
}: {
  element: HTMLElement | HTMLAnchorElement;
}): void => {
  const isSlotContent =
    element.querySelector('slot') || element instanceof HTMLSlotElement;
  const link =
    element instanceof HTMLAnchorElement ? element : element.querySelector('a');

  if (isSlotContent) return;
  if (!link) return;

  const isLinkSpan = link.querySelector('span');

  if (!isLinkSpan) {
    const span = document.createElement('span');
    span.innerHTML = link.innerHTML;
    link.innerHTML = '';
    link.appendChild(span);
  }
};