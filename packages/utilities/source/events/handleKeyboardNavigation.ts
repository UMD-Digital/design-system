/**
 * Sets up keyboard event handlers for accessibility focus management
 *
 * Handles Escape, Tab, and Arrow key events for managing focus within/outside an element.
 * Particularly useful for modal dialogs, dropdown menus, and other interactive components.
 *
 * @param element - The element to manage focus for
 * @param action - Callback function to execute when focus leaves the element
 * @param shadowDomContext - Optional shadow DOM context for web components
 * @returns Cleanup function to remove event listeners
 *
 * @example
 * ```typescript
 * const cleanup = handleKeyboardNavigation({
 *   element: dialogElement,
 *   action: (event) => {
 *     // Close dialog when focus leaves
 *     dialog.close();
 *   },
 *   shadowDomContext: shadowRoot
 * });
 *
 * // Later, cleanup when component unmounts
 * cleanup();
 * ```
 *
 * @category events
 */
export const handleKeyboardNavigation = ({
  element,
  action,
  shadowDomContext,
}: {
  element: HTMLElement | Element;
  action: (event: KeyboardEvent) => void;
  shadowDomContext?: HTMLElement | null;
}): (() => void) => {
  const escapeEvent = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      action(event);
    }
  };

  const keyEvent = (event: KeyboardEvent) => {
    const currentElement = event.composedPath()[0] as HTMLElement;

    if (event.key === 'Tab') {
      if (!element) return;

      const hasElement = element.contains(currentElement);
      const hasShadowDomContext = shadowDomContext?.contains(currentElement);
      const isCurrentElement = currentElement === element;

      if (!hasElement && !hasShadowDomContext && !isCurrentElement) {
        action(event);
      }
    }

    if (event.key === 'ArrowDown') {
      const nextElement = currentElement.nextElementSibling as HTMLElement;

      if (element && !element.contains(nextElement)) {
        action(event);
      } else if (nextElement) {
        nextElement.focus();
      }
    }

    if (event.key === 'ArrowUp') {
      const previousElement =
        currentElement.previousElementSibling as HTMLElement;

      if (element && !element.contains(previousElement)) {
        action(event);
      } else if (previousElement) {
        previousElement.focus();
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
