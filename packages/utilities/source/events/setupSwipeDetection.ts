/**
 * Creates touch swipe event detection for mobile interactions
 *
 * Sets up touch event listeners to detect horizontal swipes with configurable
 * threshold and timing constraints. Useful for mobile carousels, image galleries, etc.
 *
 * @param container - The element to attach swipe detection to
 * @param callback - Function called with swipe direction (true = right, false = left)
 *
 * @example
 * ```typescript
 * const carousel = document.querySelector('.carousel');
 * setupSwipeDetection({
 *   container: carousel,
 *   callback: (swipedRight) => {
 *     if (swipedRight) {
 *       // Swipe right - go to previous slide
 *       showPreviousSlide();
 *     } else {
 *       // Swipe left - go to next slide
 *       showNextSlide();
 *     }
 *   }
 * });
 * ```
 */
export const setupSwipeDetection = ({
  container,
  callback,
}: {
  container: HTMLElement;
  callback: (swipedRight: boolean) => void;
}): void => {
  const threshold = 20; // Minimum distance in pixels to trigger swipe
  const allowedTime = 100; // Minimum time in ms for swipe detection
  let startX = 0;
  let dist = 0;
  let elapsedTime = 0;
  let startTime = 0;

  container.addEventListener(
    'touchstart',
    (event) => {
      const touchObject = event.changedTouches[0];

      dist = 0;
      startX = touchObject.pageX;
      startTime = new Date().getTime();
    },
    { passive: false },
  );

  container.addEventListener(
    'touchend',
    (event) => {
      const touchObject = event.changedTouches[0];

      dist = touchObject.pageX - startX;
      elapsedTime = new Date().getTime() - startTime;

      // Only trigger if swipe took longer than allowedTime and exceeded threshold
      if (elapsedTime > allowedTime && Math.abs(dist) >= threshold) {
        callback(dist > 0); // Positive dist = swiped right
      }
    },
    { passive: false },
  );
};
