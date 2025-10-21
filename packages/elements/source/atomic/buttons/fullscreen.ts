import { fullscreen as iconFullscreen } from '@universityofmaryland/web-icons-library/controls';
import ElementBuilder from '@universityofmaryland/web-builder-library';

const create = ({
  callback,
  index,
}: {
  callback: (arg: number) => void;
  index: number;
}) =>
  (() => {
    const button = document.createElement('button');
    button.setAttribute('data-index', index.toString());
    button.addEventListener('click', () => {
      callback(index);
    });
    button.setAttribute('aria-label', 'View Full Screen');
    button.innerHTML = `Full Screen <span></span>${iconFullscreen}`;

    return ElementBuilder.styled.buttons.fullScreen({
      element: button,
    });
  })();

export default {
  create,
};
