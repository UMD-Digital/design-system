import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import {
  pause as iconPause,
  play as iconPlay,
} from '@universityofmaryland/web-icons-library/controls';

/**
 * GIF loading state interface
 */
interface GifState {
  isLoaded: boolean;
  isPlaying: boolean;
  originalSrc: string;
}

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

/**
 * Renders the first frame of the GIF to the canvas
 */
const renderFirstFrame = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  container: HTMLElement,
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  canvas.width = containerWidth;
  canvas.height = containerHeight;

  // Calculate dimensions to maintain aspect ratio while covering
  const imgRatio = image.naturalWidth / image.naturalHeight;
  const containerRatio = containerWidth / containerHeight;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > containerRatio) {
    drawHeight = containerHeight;
    drawWidth = image.naturalWidth * (containerHeight / image.naturalHeight);
    offsetX = (containerWidth - drawWidth) / 2;
  } else {
    drawWidth = containerWidth;
    drawHeight = image.naturalHeight * (containerWidth / image.naturalWidth);
    offsetY = (containerHeight - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, containerWidth, containerHeight);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
};

/**
 * Sets up the IntersectionObserver for lazy loading the GIF
 */
const setupLazyLoading = (
  container: HTMLElement,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  button: HTMLButtonElement,
  state: GifState,
  onLoad: () => void,
) => {
  // Handle non-browser environments
  if (typeof IntersectionObserver === 'undefined') {
    // Load immediately if IntersectionObserver is not available
    state.isLoaded = true;
    button.style.display = 'flex';
    onLoad();
    return null;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !state.isLoaded) {
          state.isLoaded = true;

          // Restore the original src to load the animated GIF
          image.src = state.originalSrc;

          // Show the button once loaded
          image.addEventListener(
            'load',
            () => {
              button.style.display = 'flex';
              onLoad();
            },
            { once: true },
          );

          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '50px', // Start loading slightly before visible
    },
  );

  observer.observe(container);

  return observer;
};

const applyGifToggle = (
  image: HTMLImageElement,
  container: HTMLElement,
  state: GifState,
) => {
  const canvas = document.createElement('canvas');
  const button = document.createElement('button');

  const setButtonPlay = () => {
    button.setAttribute('aria-label', 'Pause');
    button.innerHTML = iconPause;
    canvas.style.opacity = '0';
    image.style.opacity = '1';
    state.isPlaying = true;
  };

  const setButtonPause = () => {
    button.setAttribute('aria-label', 'Play');
    button.innerHTML = iconPlay;
    canvas.style.opacity = '1';
    image.style.opacity = '0';
    state.isPlaying = false;
  };

  const sizeCanvas = () => {
    if (!container) return;
    const img = container.querySelector('img');
    const canvasEl = container.querySelector('canvas') as HTMLCanvasElement;

    if (!canvasEl || !img) return;

    // Set canvas display dimensions to match container
    canvasEl.style.width = '100%';
    canvasEl.style.height = `${img.clientHeight}px`;
    canvasEl.style.position = 'absolute';
    canvasEl.style.top = '0';
    canvasEl.style.left = '0';

    if (state.isLoaded && img.complete && img.naturalWidth > 0) {
      renderFirstFrame(img, canvasEl, container);
    }
  };

  // Initialize button but hide until GIF is loaded
  button.setAttribute('type', 'button');
  button.style.display = 'none';

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (state.isPlaying) {
      setButtonPause();
    } else {
      setButtonPlay();
    }
  });

  // Add canvas immediately for placeholder
  container.appendChild(canvas);
  container.appendChild(button);

  // Initially hide the animated image (show canvas placeholder)
  image.style.opacity = '0';
  image.style.transition = 'opacity 0.2s ease-in-out';
  canvas.style.opacity = '1';
  canvas.style.transition = 'opacity 0.2s ease-in-out';

  // Handle initial image load for first frame capture
  const captureFirstFrame = () => {
    sizeCanvas();
    renderFirstFrame(image, canvas, container);
  };

  // If image is already loaded (from cache), capture first frame immediately
  if (image.complete && image.naturalWidth > 0) {
    captureFirstFrame();
  } else {
    image.addEventListener('load', captureFirstFrame, { once: true });
  }

  // Set up lazy loading observer
  setupLazyLoading(container, image, canvas, button, state, () => {
    // Once loaded, render the first frame properly and set to play
    sizeCanvas();
    setButtonPlay();
  });

  // Handle resize
  window.addEventListener(
    'resize',
    debounce(() => {
      sizeCanvas();
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

  // Store original src and create state
  const state: GifState = {
    isLoaded: false,
    isPlaying: false,
    originalSrc: image.src,
  };

  const isAnchor = element instanceof HTMLAnchorElement;
  const container = isAnchor ? element : document.createElement('div');

  const composite = new ElementBuilder(container)
    .styled(Styles.element.asset.gif.toggle)
    .withModifier((el) => {
      if (!isAnchor) {
        el.appendChild(element);
      }
      applyGifToggle(image, el, state);
    })
    .build();

  return composite;
};
