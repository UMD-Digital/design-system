import { PLAY_ICON, PAUSE_ICON } from 'assets/icons';
import { SizeCanvas } from './events';
import { ELEMENTS } from '../globals';
import { UMDCardOverlayElement } from '../index';

const { CARD_OVERLAY_IMAGE_CONTAINER } = ELEMENTS;

export const GifFunctionality = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  const shadowDom = element.shadowRoot as ShadowRoot;
  const image = shadowDom.querySelector('img');
  const isGif = image?.src.includes('.gif');

  if (!image || !isGif) return;

  const container = shadowDom.querySelector(
    `.${CARD_OVERLAY_IMAGE_CONTAINER}`,
  ) as HTMLDivElement;
  const canvas = document.createElement('canvas');
  const button = document.createElement('button');
  const setButtonPlay = () => {
    button.setAttribute('aria-label', 'Pause');
    button.innerHTML = PAUSE_ICON;
    canvas.style.opacity = '0';
    image.style.opacity = '1';
  };
  const setButtonPause = () => {
    button.setAttribute('aria-label', 'Play');
    button.innerHTML = PLAY_ICON;
    canvas.style.opacity = '1';
    image.style.opacity = '0';
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
    SizeCanvas({ element });
  });
};
