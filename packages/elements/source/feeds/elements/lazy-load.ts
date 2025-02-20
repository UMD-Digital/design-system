import { token } from '@universityofmaryland/web-styles-library';
import { CallToAction } from 'composite';

type LazyLoadCreate = {
  callback: (args: any) => void;
  isThemeDark?: boolean;
};

export type TypeLazyLoad = LazyLoadCreate & {
  container: HTMLElement;
  isLazyLoad: boolean;
  totalEntries: number | null;
  offset: number;
};

const ID_LAZY_LOAD_BUTTON = 'button-lazy-load';

const STYLES_LAZY_LOAD_BUTTON = `
  ${CallToAction.Styles}

  .${ID_LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${token.spacing.lg};
  }
`;

const create = ({ callback, isThemeDark }: LazyLoadCreate) => {
  const container = document.createElement('div');
  const button = document.createElement('button');
  const ctaButton = CallToAction.CreateElement({
    cta: button,
    type: 'outline',
    isThemeDark,
  });

  button.innerHTML = 'Load more';
  button.addEventListener('click', callback);

  container.classList.add(ID_LAZY_LOAD_BUTTON);
  container.appendChild(ctaButton);

  return container;
};

const remove = ({ container }: { container: HTMLElement }) => {
  const button = container.querySelector(
    `.${ID_LAZY_LOAD_BUTTON}`,
  ) as HTMLDivElement;

  if (button) button.remove();
};

const display = ({
  container,
  isLazyLoad,
  totalEntries,
  offset,
  isThemeDark,
  callback,
}: TypeLazyLoad) => {
  if (!isLazyLoad) return;
  if (!totalEntries) return;
  if (!offset) return;
  if (!callback) return;
  if (offset >= totalEntries) return;

  const lazyLoadButton = create({
    callback,
    isThemeDark,
  });
  container.appendChild(lazyLoadButton);
};

export default {
  display,
  remove,
  styles: STYLES_LAZY_LOAD_BUTTON,
};
