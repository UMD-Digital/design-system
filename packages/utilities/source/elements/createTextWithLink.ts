/**
 * Creates a text element containing a link (useful for headlines, titles, etc.)
 *
 * Creates a container element (paragraph by default) with an anchor link inside.
 * The link opens in a new tab with security attributes by default.
 *
 * @param text - The link text content
 * @param url - The href URL for the link
 * @param containerTag - HTML tag for the container element (default: 'p')
 * @param openInNewTab - Whether to open link in new tab with security attributes (default: true)
 * @param ariaLabel - Optional aria-label for the link
 * @param allowHTML - If true, uses innerHTML instead of textContent for link text (use with caution)
 * @returns Container element with link inside, or null if required params are missing
 *
 * @example
 * ```typescript
 * // Basic headline with link (paragraph wrapper)
 * const headline = createTextWithLink({
 *   text: 'Read the full story',
 *   url: 'https://example.com/article'
 * });
 *
 * // Heading with link
 * const headingLink = createTextWithLink({
 *   text: 'Article Title',
 *   url: '/articles/123',
 *   containerTag: 'h2',
 *   openInNewTab: false
 * });
 *
 * // With accessibility label
 * const accessibleLink = createTextWithLink({
 *   text: 'Learn more',
 *   url: '/about',
 *   ariaLabel: 'Learn more about our mission and values'
 * });
 * ```
 *
 * @category elements
 */
export const createTextWithLink = ({
  text,
  url,
  containerTag = 'p',
  openInNewTab = true,
  ariaLabel,
  allowHTML = false,
}: {
  text: string;
  url: string;
  containerTag?: keyof HTMLElementTagNameMap;
  openInNewTab?: boolean;
  ariaLabel?: string;
  allowHTML?: boolean;
}): HTMLElement | null => {
  if (!text || !url) {
    return null;
  }

  const container = document.createElement(containerTag);
  const link = document.createElement('a');

  link.setAttribute('href', url);

  if (openInNewTab) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }

  if (ariaLabel) {
    link.setAttribute('aria-label', ariaLabel);
  }

  if (allowHTML) {
    link.innerHTML = text;
  } else {
    link.textContent = text;
  }

  container.appendChild(link);

  return container;
};
