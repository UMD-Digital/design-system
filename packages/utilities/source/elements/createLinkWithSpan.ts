/**
 * Creates an external link with text wrapped in a span element
 *
 * Creates an anchor element with security attributes (target="_blank" and rel="noopener noreferrer")
 * and wraps the link text in a span element for styling purposes.
 *
 * @param url - The href URL for the link
 * @param title - The text content for the link
 * @param label - Optional aria-label for accessibility
 * @returns HTMLAnchorElement with span-wrapped text
 *
 * @example
 * ```typescript
 * const link = createLinkWithSpan(
 *   'https://example.com',
 *   'Visit Example',
 *   'Opens in a new window'
 * );
 * document.body.appendChild(link);
 * ```
 */
export const createLinkWithSpan = (
  url: string,
  title: string,
  label?: string
): HTMLAnchorElement => {
  const link = document.createElement('a');
  const span = document.createElement('span');

  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');

  span.textContent = title;
  link.appendChild(span);

  if (label !== undefined) {
    link.setAttribute('aria-label', label);
  }

  return link;
};