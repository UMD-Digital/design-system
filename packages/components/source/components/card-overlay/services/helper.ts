import Freezeframe from 'freezeframe';
import { UMDCardOverlayElement } from '../index';

export const GifFunctionality = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  const shadowDom = element.shadowRoot as ShadowRoot;
  const image = shadowDom.querySelector('img');
  const isGif = image?.src.includes('.gif');

  if (!image || !isGif) return;

  const gif = new Freezeframe(image, {
    trigger: false,
  });
};

// button.addEventListener('click', () => {
//   if (paused) {
//     imageObj.start();
//     button.innerHTML = 'Pause';
//     paused = false;
//   } else {
//     imageObj.stop();
//     button.innerHTML = 'Play';
//     paused = true;
//   }
// });
