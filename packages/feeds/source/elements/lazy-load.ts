import * as Styles from '@universityofmaryland/web-styles-library';
import { Atomic, Utilities } from '@universityofmaryland/web-elements-library';

const { actions } = Atomic;

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

const { token } = Styles;
const outlineActionStyles = Styles.element.action.outline.normal;

const ID_LAZY_LOAD_BUTTON = 'button-lazy-load';

const STYLES_LAZY_LOAD_BUTTON = `
  .${ID_LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${token.spacing.lg};
  }

  ${Utilities.styles.getStyleStringFromJssObject(outlineActionStyles)}
`;

const create = ({ callback, isThemeDark }: LazyLoadCreate) => {
  const container = document.createElement('div');
  const button = document.createElement('button');
  const ctaButton = actions.outline({
    element: button,
    isThemeDark,
  });

  button.innerHTML = 'Load more';
  button.addEventListener('click', callback);

  container.classList.add(ID_LAZY_LOAD_BUTTON);
  container.appendChild(ctaButton.element);

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
