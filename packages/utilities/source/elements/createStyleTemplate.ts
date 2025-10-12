/**
 * Creates a template element containing a style tag
 *
 * Utility for creating HTML template elements with embedded CSS styles,
 * commonly used for injecting styles into Shadow DOM.
 *
 * @param styles - CSS string to inject into the style tag
 * @returns HTMLTemplateElement containing the styles
 *
 * @example
 * ```typescript
 * const template = createStyleTemplate(`
 *   .container {
 *     display: flex;
 *     gap: 1rem;
 *   }
 * `);
 * shadowRoot.appendChild(template.content.cloneNode(true));
 * ```
 *
 * @category elements
 */
export const createStyleTemplate = (styles: string): HTMLTemplateElement => {
  const template = document.createElement('template');
  template.innerHTML = `<style>${styles}</style>`;
  return template;
};