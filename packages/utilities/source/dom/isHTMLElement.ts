/**
 * Type guard to check if a value is an HTMLElement
 *
 * @param value - Value to check
 * @returns True if value is an HTMLElement
 *
 * @example
 * ```typescript
 * const element = document.querySelector('.my-element');
 * if (isHTMLElement(element)) {
 *   // TypeScript knows element is HTMLElement here
 *   element.style.display = 'block';
 * }
 * ```
 */
export const isHTMLElement = (value: unknown): value is HTMLElement => {
  return value instanceof HTMLElement;
};