/**
 * Traps focus within an element for accessibility
 *
 * Prevents focus from leaving the specified element when Tab is pressed.
 * Essential for modal dialogs and other components that require focus containment per WCAG 2.1.
 *
 * @param element - The element to trap focus within
 * @param action - Callback function to execute when Escape is pressed
 * @param shadowDomContext - Optional shadow DOM context for web components
 * @returns Cleanup function to remove event listeners
 *
 * @example
 * ```typescript
 * const cleanup = trapFocus({
 *   element: modalElement,
 *   action: (event) => {
 *     // Close modal when Escape is pressed
 *     modal.close();
 *   },
 *   shadowDomContext: shadowRoot
 * });
 *
 * // Later, cleanup when modal closes
 * cleanup();
 * ```
 *
 * @category accessibility
 */
export const trapFocus = ({
  element,
  action,
  shadowDomContext,
}: {
  element: HTMLElement | Element;
  action: (event: KeyboardEvent) => void;
  shadowDomContext?: HTMLElement | null;
}): (() => void) => {
  const container = shadowDomContext || element;

  const escapeEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      action(event);
    }
  };

  const keyEvent = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      const hasElement = event
        .composedPath()
        .some((path) => path === container);

      if (!hasElement) {
        const firstElement = container?.querySelector(
          'button, a',
        ) as HTMLElement;
        if (firstElement) {
          firstElement.focus();
        }
      }
    }
  };

  window.addEventListener('keydown', escapeEvent);
  window.addEventListener('keyup', keyEvent);

  return () => {
    window.removeEventListener('keydown', escapeEvent);
    window.removeEventListener('keyup', keyEvent);
  };
};
