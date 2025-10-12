/**
 * Truncates HTML text content to a specified length while preserving HTML structure.
 * This is an HTML-aware truncation function that walks the DOM tree and preserves
 * element boundaries while truncating text nodes.
 *
 * @param text - The HTML string to truncate
 * @param maxTextSize - The maximum number of characters to keep
 * @returns The truncated HTML string with ellipsis appended if text was truncated
 *
 * @example
 * ```typescript
 * const html = '<p>This is a <strong>long</strong> text that needs truncation</p>';
 * const result = truncateText({ text: html, maxTextSize: 20 });
 * // result: '<p>This is a <strong>long</strong> te ...</p>'
 * ```
 *
 * @category string
 */
export const truncateText = ({
  text,
  maxTextSize,
}: {
  text: string;
  maxTextSize: number;
}): string => {
  const wrapper = document.createElement('div');
  const cleanedText = text
    .replace(/[\n\r\t]+/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();

  wrapper.innerHTML = cleanedText;

  let textContent = wrapper.textContent || wrapper.innerText || '';
  let orginalString = textContent;
  textContent = textContent.slice(0, maxTextSize);

  const walkAndReplace = (node: any) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let newText = textContent.slice(0, node.nodeValue.length);
      textContent = textContent.slice(node.nodeValue.length);

      node.nodeValue = `${newText}`;
    } else {
      node.childNodes.forEach(walkAndReplace);
    }
  };

  walkAndReplace(wrapper);

  if (orginalString.length > maxTextSize) {
    const lastChild = wrapper.children[
      wrapper.children.length - 1
    ] as HTMLElement;

    if (lastChild) {
      lastChild.innerHTML = lastChild.innerHTML + ' ...';
    } else {
      wrapper.innerHTML += ' ...';
    }
  }

  return wrapper.innerHTML;
};