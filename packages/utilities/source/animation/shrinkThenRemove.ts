/**
 * Animates an element shrinking to zero height, then hides it
 *
 * Uses requestAnimationFrame to create a smooth height and padding collapse animation.
 * After animation completes, sets display:none and adds a 'closed' attribute.
 * Useful for accordion panels, dropdown menus, and dismissible notifications.
 *
 * @param container - The element to animate and hide
 *
 * @example
 * ```typescript
 * const panel = document.querySelector('.accordion-panel');
 * shrinkThenRemove({ container: panel });
 * // Panel smoothly collapses over 30 frames, then is hidden
 * ```
 *
 * @category animation
 */
export const shrinkThenRemove = ({
  container,
}: {
  container: HTMLElement;
}): void => {
  const frames = 30;
  const startingHeight = container.clientHeight;
  const startingPadding = parseInt(
    window.getComputedStyle(container).paddingBottom.split('px')[0],
  );
  const heightDiff = startingHeight / frames;
  const paddingDiff = startingPadding / frames;
  let currentFrame = 0;
  let currentHeight = startingHeight;
  let currentPadding = startingPadding;

  container.style.overflow = 'hidden';

  const shrink = () => {
    if (frames > currentFrame) {
      currentHeight = currentHeight - heightDiff;
      currentPadding = currentPadding - paddingDiff;

      container.style.height = `${currentHeight}px`;
      container.style.paddingBottom = `${currentPadding}px`;

      currentFrame++;
      window.requestAnimationFrame(shrink);
    } else {
      container.style.height = '0px';
      container.style.paddingBottom = '0px';

      setTimeout(() => {
        container.style.display = 'none';
        container.setAttribute('closed', 'true');
      }, 100);
    }
  };

  window.requestAnimationFrame(shrink);
};