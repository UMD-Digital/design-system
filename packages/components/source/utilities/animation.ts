const ShrinkThenRemove = ({ container }: { container: HTMLElement }) => {
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

export default {
  ShrinkThenRemove,
};
