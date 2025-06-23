import * as Utilities from 'utilities';
import { ElementModel } from 'model';

export default ({ image }: { image: HTMLImageElement }) => {
  const composite = ElementModel.assets.gifToggle({
    element: document.createElement('div'),
  });
  const canvas = document.createElement('canvas');
  const button = document.createElement('button');
  const setButtonPlay = () => {
    button.setAttribute('aria-label', 'Pause');
    button.innerHTML = Utilities.asset.icon.PAUSE;
    canvas.style.opacity = '0';
    image.style.opacity = '1';
  };
  const setButtonPause = () => {
    button.setAttribute('aria-label', 'Play');
    button.innerHTML = Utilities.asset.icon.PLAY;
    canvas.style.opacity = '1';
    image.style.opacity = '0';
  };
  const sizeCanvas = ({ container }: { container: HTMLElement | null }) => {
    if (!container) return;
    const image = container.querySelector('img');
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;

    if (!container || !canvas || !image) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Get container dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Set canvas display dimensions to match container
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';

    // Set canvas actual dimensions
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Calculate dimensions to maintain aspect ratio while covering
    const imgRatio = image.naturalWidth / image.naturalHeight;
    const containerRatio = containerWidth / containerHeight;

    let drawWidth,
      drawHeight,
      offsetX = 0,
      offsetY = 0;

    if (imgRatio > containerRatio) {
      // Image is wider than container relative to height
      drawHeight = containerHeight;
      drawWidth = image.naturalWidth * (containerHeight / image.naturalHeight);
      offsetX = (containerWidth - drawWidth) / 2;
    } else {
      // Image is taller than container relative to width
      drawWidth = containerWidth;
      drawHeight = image.naturalHeight * (containerWidth / image.naturalWidth);
      offsetY = (containerHeight - drawHeight) / 2;
    }

    // Clear the canvas and draw the image with cover behavior
    ctx.clearRect(0, 0, containerWidth, containerHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };
  let isPlaying = true;

  button.setAttribute('type', 'button');
  button.addEventListener('click', () => {
    if (isPlaying) {
      setButtonPause();
      isPlaying = false;
    } else {
      setButtonPlay();
      isPlaying = true;
    }
  });

  image.addEventListener('load', () => {
    composite.element.appendChild(image);
    composite.element.appendChild(canvas);
    composite.element.appendChild(button);
    setButtonPlay();
    sizeCanvas({ container: composite.element });
  });

  window.addEventListener(
    'resize',
    Utilities.performance.debounce(() => {
      sizeCanvas({ container: composite.element });
    }, 50),
  );

  return composite;
};
