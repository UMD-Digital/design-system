import * as Utility from 'utilities';
import { ElementModel } from 'model';

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
    button.innerHTML = `Full Screen <span></span>${Utility.asset.icon.FULL_SCREEN}`;

    return ElementModel.buttons.fullScreen({
      element: button,
    });
  })();

export default {
  create,
};
