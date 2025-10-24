import * as token from '@universityofmaryland/web-styles-library/token';
import { shrinkThenRemove } from '@universityofmaryland/web-utilities-library/animation';
import { close as iconClose } from '@universityofmaryland/web-icons-library/controls';
import ElementBuilder from '@universityofmaryland/web-builder-library';

export interface CloseButtonProps {
  isThemeDark?: boolean;
  targetSelector: string;
  onBeforeClose?: () => void;
}

export const CreateCloseButton = (
  props: Pick<
    CloseButtonProps,
    'isThemeDark' | 'targetSelector' | 'onBeforeClose'
  >,
) => {
  const { isThemeDark = false, targetSelector, onBeforeClose } = props;

  const MEDIUM = 768;
  const button = document.createElement('button');
  button.setAttribute('aria-label', 'Close alert');
  button.type = 'button';
  button.innerHTML = iconClose;

  const model = ElementBuilder.create.element({
    className: 'alert-close-button',
    element: button,
    elementStyles: {
      element: {
        position: 'absolute',
        top: token.spacing.lg,
        right: token.spacing.lg,

        ['& rect']: {
          fill: isThemeDark ? token.color.white : token.color.black,
        },

        ['& path']: {
          fill: isThemeDark ? token.color.white : token.color.black,
        },

        [`@container (max-width: ${MEDIUM}px)`]: {
          top: token.spacing.sm,
          right: token.spacing.sm,
        },
      },
    },
  });

  model.element.addEventListener('click', () => {
    if (typeof onBeforeClose === 'function') onBeforeClose();
    const wrapper = model.element.closest(targetSelector);
    if (wrapper instanceof HTMLElement)
      shrinkThenRemove({ container: wrapper });
  });

  return model;
};
