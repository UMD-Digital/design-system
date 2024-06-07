import { Tokens } from '@universityofmaryland/variables';
import AssetIcon from './icons';

const { Spacing } = Tokens;

const CreateGif = ({ container }: { container: HTMLDivElement | null }) => {
  if (!container) return;
  const image = container.querySelector('img');
  const isGif = image?.src.includes('.gif');

  if (!image || !isGif) return;
  const canvas = document.createElement('canvas');
  const button = document.createElement('button');
  const setButtonPlay = () => {
    button.setAttribute('aria-label', 'Pause');
    button.innerHTML = AssetIcon.PAUSE;
    canvas.style.opacity = '0';
    image.style.opacity = '1';
  };
  const setButtonPause = () => {
    button.setAttribute('aria-label', 'Play');
    button.innerHTML = AssetIcon.PLAY;
    canvas.style.opacity = '1';
    image.style.opacity = '0';
  };
  const SizeCanvas = ({ container }: { container: HTMLDivElement | null }) => {
    if (!container) return;
    const image = container.querySelector('img');
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;

    if (!container || !canvas || !image) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const width = image.width;
    const height = image.height;

    const clientWidth = Math.ceil(width);
    const clientHeight = Math.ceil(height);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.setAttribute('width', clientWidth.toString());
    canvas.setAttribute('height', clientHeight.toString());

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(image, 0, 0, clientWidth, clientHeight);
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
    canvas.classList.add('gif-canvas');
    container.appendChild(canvas);
    container.appendChild(button);
    setButtonPlay();
    SizeCanvas({ container });
  });
};

const GetResponsiveImageSize = ({
  image,
  parentNode,
  maxWindowHeight = window.innerHeight - 48,
}: {
  image: HTMLImageElement;
  parentNode: HTMLElement;
  maxWindowHeight?: number;
}) => {
  if (!image) return maxWindowHeight;

  const imgHeight = image.naturalHeight;
  const aspectRatio = image.naturalWidth / imgHeight;
  const maxElementHeight = parentNode.offsetWidth / aspectRatio;
  const maxHeight =
    maxElementHeight > maxWindowHeight ? maxWindowHeight : maxElementHeight;
  const defaultImageHeight = imgHeight > maxHeight ? maxHeight : imgHeight;

  return defaultImageHeight;
};

export default {
  CreateGif,
  GetResponsiveImageSize,
};
