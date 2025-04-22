import { debounce } from '../performance';
import * as AssetIcon from '../assets/icons';

export const gif = ({ container }: { container: HTMLDivElement | null }) => {
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

  window.addEventListener(
    'resize',
    debounce(() => {
      SizeCanvas({ container });
    }, 50),
  );
};

export const imageFromSvg = ({ SVG }: { SVG: string }) => {
  const image = document.createElement('img');

  image.src = `data:image/svg+xml;base64,${btoa(SVG)}`;
  return image;
};

export function svgFromString(svgString: string) {
  const div = document.createElement('div');
  div.innerHTML = svgString.trim();
  return div.firstChild;
}

export function linkWithSpan({
  url,
  title,
  label,
}: {
  url: string;
  title: string;
  label?: string;
}) {
  const link = document.createElement('a');
  const span = document.createElement('span');

  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');

  span.innerText = title;
  link.appendChild(span);

  if (label) link.setAttribute('aria-label', label);

  return link;
}
