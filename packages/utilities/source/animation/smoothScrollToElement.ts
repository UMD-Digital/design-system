/**
 * Smoothly scrolls to an element with optional offset and focus management
 *
 * Creates an animated scroll to bring the target element into view.
 * After scrolling completes, focuses the element (or its first focusable child).
 * Uses requestAnimationFrame for smooth 60fps animation.
 *
 * @param element - The element to scroll to
 * @param spread - Offset from top in pixels (default: 30)
 * @param frames - Number of animation frames for scroll duration (default: 60)
 *
 * @example
 * ```typescript
 * const section = document.querySelector('#contact');
 * smoothScrollToElement({
 *   element: section,
 *   spread: 50,  // 50px from top
 *   frames: 45   // Slightly faster scroll
 * });
 * ```
 *
 * @category animation
 */
export const smoothScrollToElement = ({
  element,
  spread = 30,
  frames = 60,
}: {
  element: HTMLElement;
  spread?: number;
  frames?: number;
}): void => {
  if (!element) return;

  const documentBody =
    document.documentElement.scrollTop || document.body.scrollTop;
  const elm = document.body;
  let from = 0;
  const to = element.getBoundingClientRect();
  const toPosition =
    documentBody === 0 ? to.top - from - spread : to.top - spread;
  const currentPosition = window.pageYOffset;
  const jump = (toPosition - from) / frames;
  from = currentPosition;
  let remainingFrames = frames;

  function scroll() {
    if (remainingFrames > 0) {
      const position = from + jump;

      from = position;
      elm.scrollTop = from;
      document.documentElement.scrollTop = from;

      remainingFrames--;
      window.requestAnimationFrame(scroll);
    } else {
      // After scrolling, focus the element or its first focusable child
      const focusableElements = Array.from(
        element.querySelectorAll('a, button'),
      ) as Array<HTMLElement>;

      element.focus({ preventScroll: true });

      if (focusableElements.length > 0) {
        focusableElements[0].focus({ preventScroll: true });
      }
    }
  }

  window.requestAnimationFrame(scroll);
};
