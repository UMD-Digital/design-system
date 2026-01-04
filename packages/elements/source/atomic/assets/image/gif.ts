import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import {
  pause as iconPause,
  play as iconPlay,
} from '@universityofmaryland/web-icons-library/controls';

const extractImageElement = (
  element: HTMLImageElement | HTMLAnchorElement,
): HTMLImageElement | null => {
  if (element instanceof HTMLImageElement) {
    return element;
  }

  if (element instanceof HTMLAnchorElement) {
    return element.querySelector('img');
  }

  return null;
};

const applyGifToggle = (image: HTMLImageElement, container: HTMLElement) => {
  const canvas = document.createElement('canvas');
  const button = document.createElement('button');
  const setButtonPlay = () => {
    button.setAttribute('aria-label', 'Pause');
    button.innerHTML = iconPause;
    canvas.style.opacity = '0';
    image.style.opacity = '1';
  };
  const setButtonPause = () => {
    button.setAttribute('aria-label', 'Play');
    button.innerHTML = iconPlay;
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
    canvas.style.height = `${image.clientHeight}px`;
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
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isPlaying) {
      setButtonPause();
      isPlaying = false;
    } else {
      setButtonPlay();
      isPlaying = true;
    }
  });

  image.addEventListener('load', () => {
    container.appendChild(canvas);
    container.appendChild(button);
    setButtonPlay();

    setTimeout(() => {
      sizeCanvas({ container });
    }, 100);
  });

  window.addEventListener(
    'resize',
    debounce(() => {
      sizeCanvas({ container });
    }, 50),
  );
};

export const createImageGif = ({
  element,
}: {
  element: HTMLImageElement | HTMLAnchorElement;
}) => {
  const image = extractImageElement(element);

  if (!image) {
    throw new Error('No valid image element found');
  }

  const isAnchor = element instanceof HTMLAnchorElement;
  const container = isAnchor ? element : document.createElement('div');

  const composite = new ElementBuilder(container)
    .styled(Styles.element.asset.gif.toggle)
    .withModifier((el) => {
      if (!isAnchor) {
        el.appendChild(element);
      }
      applyGifToggle(image, el);
    })
    .build();

  return composite;
};
