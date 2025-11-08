import * as token from '@universityofmaryland/web-styles-library/token';
import { shrinkThenRemove } from '@universityofmaryland/web-utilities-library/animation';
import { close as iconClose } from '@universityofmaryland/web-icons-library/controls';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../../_types';
import { AlertTextProps } from './text';

export interface CloseButtonProps extends AlertTextProps {
  targetSelector: string;
  onBeforeClose?: () => void;
}

export const CreateCloseButton = (
  props: Pick<
    CloseButtonProps,
    'isThemeDark' | 'targetSelector' | 'onBeforeClose'
  >,
): ElementVisual => {
  const { isThemeDark = false, targetSelector, onBeforeClose } = props;

  const MEDIUM = 768;
  const button = document.createElement('button');

  const model = new ElementBuilder(button)
    .withClassName('alert-close-button')
    .withAttribute('aria-label', 'Close alert')
    .withAttribute('type', 'button')
    .withHTML(iconClose)
    .withStyles({
      element: {
        position: 'absolute',
        top: token.spacing.lg,
        right: token.spacing.lg,
        color: token.color.black,
        ...(isThemeDark && { color: token.color.white }),
        ['& rect, & path']: {
          fill: 'currentColor',
        },

        [`@container (max-width: ${MEDIUM}px)`]: {
          top: token.spacing.sm,
          right: token.spacing.sm,
        },
      },
    })
    .on('click', () => {
      if (typeof onBeforeClose === 'function') onBeforeClose();
      const wrapper = button.closest(targetSelector);
      if (wrapper instanceof HTMLElement)
        shrinkThenRemove({ container: wrapper });
    })
    .build();

  return {
    ...model,
    className: 'alert-close-button',
  };
};
