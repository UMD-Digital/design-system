import * as Styles from '@universityofmaryland/web-styles-library';
import { Model } from '@universityofmaryland/web-elements-library';

type LazyLoadCreate = {
  callback: (args: any) => void;
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  totalEntries: number | null;
  offset: number;
};

const create = ({
  callback,
  isThemeDark,
  isLazyLoad,
  totalEntries,
  offset,
}: LazyLoadCreate) => {
  if (!isLazyLoad) return;
  if (!totalEntries) return;
  if (!offset) return;
  if (!callback) return;
  if (offset >= totalEntries) return;

  const composite = Model.ElementModel.layout.alignedCenter({
    element: document.createElement('div'),
    isThemeDark,
    elementStyles: {
      element: {
        marginTop: `${Styles.token.spacing.lg}`,
      },
    },
  });

  const ctaButton = Model.ElementModel.actions.outline({
    element: document.createElement('button'),
    isThemeDark,
  });

  ctaButton.element.innerHTML = 'Load more';
  ctaButton.element.addEventListener('click', callback);

  composite.element.appendChild(ctaButton.element);
  composite.styles += ctaButton.styles;

  return composite;
};

const remove = ({ container }: { container: HTMLElement }) => {
  const button = container.querySelector(
    `.${Styles.layout.alignment.block.center.className}`,
  ) as HTMLDivElement;

  if (button) button.remove();
};

export default {
  remove,
  create,
};
