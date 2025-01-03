import { tokens } from '@universityofmaryland/web-elements-styles';
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

const { spacing } = tokens;

const ID_LAZY_LOAD_BUTTON = 'button-lazy-load';

const STYLES_LAZY_LOAD_BUTTON = `
  ${CallToAction.Styles}

  .${ID_LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${spacing.lg};
  }
`;

const CreateLazyLoadButton = ({ callback, isThemeDark }: LazyLoadCreate) => {
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

const RemoveLazyLoad = ({ container }: { container: HTMLElement }) => {
  const button = container.querySelector(
    `.${ID_LAZY_LOAD_BUTTON}`,
  ) as HTMLDivElement;

  if (button) button.remove();
};

const DisplayLazyLoad = ({
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

  const lazyLoadButton = CreateLazyLoadButton({
    callback,
    isThemeDark,
  });
  container.appendChild(lazyLoadButton);
};

export default {
  Display: DisplayLazyLoad,
  Remove: RemoveLazyLoad,
  Styles: STYLES_LAZY_LOAD_BUTTON,
};
