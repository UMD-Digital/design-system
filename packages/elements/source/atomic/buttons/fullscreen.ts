import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { fullscreen as iconFullscreen } from '@universityofmaryland/web-icons-library/controls';

const create = ({
  callback,
  index,
}: {
  callback: (arg: number) => void;
  index: number;
}) =>
  (() => {
    return new ElementBuilder('button')
      .withAttribute('data-index', index.toString())
      .withAttribute('aria-label', 'View Full Screen')
      .withHTML(`Full Screen <span></span>${iconFullscreen}`)
      .on('click', () => callback(index))
      .styled(Styles.element.action.button.fullScreen)
      .build();
  })();

export const fullscreen = {
  create,
};
