/**
 * Creates a text container element with optional nested text element
 *
 * Creates a wrapper element (div by default) optionally containing a nested text element
 * (paragraph by default). Useful for creating structured text blocks like summaries,
 * descriptions, or content blocks.
 *
 * @param text - The text content to display
 * @param containerTag - HTML tag for the outer container (default: 'div')
 * @param textTag - HTML tag for the inner text element, or null for no wrapper (default: 'p')
 * @param allowHTML - If true, uses innerHTML instead of textContent (use with caution)
 * @returns Container element with text content, or null if text is empty
 *
 * @example
 * ```typescript
 * // Default: div containing paragraph
 * const summary = createTextContainer({
 *   text: 'This is a summary of the article content.'
 * });
 * // Result: <div><p>This is a summary...</p></div>
 *
 * // Direct text without nested element
 * const directText = createTextContainer({
 *   text: 'Direct text content',
 *   textTag: null
 * });
 * // Result: <div>Direct text content</div>
 *
 * // Custom container and text tags
 * const article = createTextContainer({
 *   text: 'Article content',
 *   containerTag: 'article',
 *   textTag: 'div'
 * });
 * // Result: <article><div>Article content</div></article>
 *
 * // With HTML content (use carefully)
 * const richText = createTextContainer({
 *   text: '<strong>Bold</strong> text',
 *   allowHTML: true
 * });
 * ```
 *
 * @category elements
 */
export const createTextContainer = ({
  text,
  containerTag = 'div',
  textTag = 'p',
  allowHTML = false,
}: {
  text: string;
  containerTag?: keyof HTMLElementTagNameMap;
  textTag?: keyof HTMLElementTagNameMap | null;
  allowHTML?: boolean;
}): HTMLElement | null => {
  if (!text) {
    return null;
  }

  const container = document.createElement(containerTag);

  if (textTag === null) {
    // Add text directly to container
    if (allowHTML) {
      container.innerHTML = text;
    } else {
      container.textContent = text;
    }
  } else {
    // Create nested text element
    const textElement = document.createElement(textTag);

    if (allowHTML) {
      textElement.innerHTML = text;
    } else {
      textElement.textContent = text;
    }

    container.appendChild(textElement);
  }

  return container;
};
