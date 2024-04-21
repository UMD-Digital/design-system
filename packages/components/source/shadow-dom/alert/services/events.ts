export const EventClose = ({ element }: { element: HTMLElement }) => {
  const frames = 30;
  const startingHeight = element.clientHeight;
  const startingPadding = parseInt(
    window.getComputedStyle(element).paddingBottom.split('px')[0],
  );
  const heightDiff = startingHeight / frames;
  const paddingDiff = startingPadding / frames;
  let currentFrame = 0;
  let currentHeight = startingHeight;
  let currentPadding = startingPadding;

  element.style.overflow = 'hidden';

  const shrink = () => {
    if (frames > currentFrame) {
      currentHeight = currentHeight - heightDiff;
      currentPadding = currentPadding - paddingDiff;

      element.style.height = `${currentHeight}px`;
      element.style.paddingBottom = `${currentPadding}px`;

      currentFrame++;
      window.requestAnimationFrame(shrink);
    } else {
      element.style.height = '0px';
      element.style.paddingBottom = '0px';

      setTimeout(() => {
        element.style.display = 'none';
        element.setAttribute('closed', 'true');
      }, 100);
    }
  };

  window.requestAnimationFrame(shrink);
};
