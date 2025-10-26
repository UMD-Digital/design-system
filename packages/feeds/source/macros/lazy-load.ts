import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type ElementModel } from '../_types';

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
}: LazyLoadCreate): ElementModel | undefined => {
  if (!isLazyLoad) return;
  if (!totalEntries) return;
  if (!offset) return;
  if (!callback) return;
  if (offset >= totalEntries) return;

  const button = document.createElement('button');
  button.innerHTML = 'Load more';
  button.addEventListener('click', callback);

  const ctaButton = new ElementBuilder(button)
    .styled(Styles.element.action.outline.normal)
    .withThemeDark(isThemeDark)
    .build();

  return new ElementBuilder()
    .styled(Styles.layout.alignment.block.center)
    .withThemeDark(isThemeDark)
    .withChild(ctaButton)
    .withStyles({
      element: {
        marginTop: `${Styles.token.spacing.lg}`,
      },
    })
    .build();
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
