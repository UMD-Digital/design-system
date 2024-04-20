import { Tokens } from '@universityofmaryland/variables';
import { CallToAction } from 'elements';

export type TypeLazyLoad = {
  container: HTMLElement;
  isLazyLoad: boolean;
  totalEntries: number | null;
  offset: number;
  lazyLoadCallback: { callback: (args: any) => void };
};

const { Spacing } = Tokens;

const ID_LAZY_LOAD_BUTTON = 'umd-feeds-events-lazy-load-button';

const STYLES_LAZY_LOAD_BUTTON = `
  ${CallToAction.Styles}

  .${ID_LAZY_LOAD_BUTTON} {
    display: flex;
    justify-content: center;
    margin-top: ${Spacing.lg};
  }
`;

const CreateLazyLoadButton = ({
  callback,
}: {
  callback: (args: any) => void;
}) => {
  const container = document.createElement('div');
  const button = document.createElement('button');
  const ctaButton = CallToAction.CreateElement({
    cta: button,
    type: 'outline',
  });

  button.innerHTML = 'Load More';
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
  lazyLoadCallback,
}: TypeLazyLoad) => {
  if (!isLazyLoad) return;
  if (!totalEntries) return;
  if (!offset) return;
  if (!lazyLoadCallback) return;
  if (offset >= totalEntries) return;

  const lazyLoadButton = CreateLazyLoadButton(lazyLoadCallback);
  container.appendChild(lazyLoadButton);
};

export default {
  Display: DisplayLazyLoad,
  Remove: RemoveLazyLoad,
  Styles: STYLES_LAZY_LOAD_BUTTON,
};
