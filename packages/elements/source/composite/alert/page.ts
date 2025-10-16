import * as token from '@universityofmaryland/web-styles-library/token';
import { shrinkThenRemove } from '@universityofmaryland/web-utilities-library/animation';
import { close as iconClose } from '@universityofmaryland/web-icons-library/controls';
import { warning as iconWarning } from '@universityofmaryland/web-icons-library/indicators';
import { CreateAlertText as AlertText, TypeAlertText } from './elements/text';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';
import { BREAKPOINTS } from './globals';
export interface AlertPageType extends TypeAlertText {
  daysToHide?: string;
  isThemeLight?: boolean;
  isShowIcon?: boolean;
}

const { MEDIUM } = BREAKPOINTS;

const ELEMENT_NAME = 'umd-element-alert-page';

const STYLES_ALERT_PAGE_ELEMENT = `
  .alert-page-container[theme="dark"] * {
    color: ${token.color.white};
  }

  .alert-page-container[theme="dark"] .alert-page-close-button rect {
    fill: ${token.color.white};
  }
`;

const createIcon = () => {
  let icon = iconWarning;
  const iconWrapper = ElementModel.createDiv({
    className: 'alert-page-icon',
    elementStyles: {
      element: {
        display: 'block',
        fill: token.color.gold,

        [`@container ${ELEMENT_NAME} (max-width: ${MEDIUM}px)`]: {
          position: 'absolute',
          top: '-20px',
        },
      },
    },
  });

  iconWrapper.element.innerHTML = icon;
  return iconWrapper;
};

const createCloseButton = ({
  isThemeDark = false,
}: {
  isThemeDark?: boolean;
}) => {
  const button = document.createElement('button');
  button.setAttribute('aria-label', 'Close alert');
  button.type = 'button';
  button.innerHTML = iconClose;

  const model = ElementModel.create({
    className: 'alert-page-close-button',
    element: button,
    elementStyles: {
      element: {
        position: 'absolute',
        top: token.spacing.lg,
        right: token.spacing.lg,

        ['& rect']: {
          fill: token.color.black,
          ...(isThemeDark && { fill: token.color.white }),
        },

        [`@container ${ELEMENT_NAME} (max-width: ${MEDIUM}px)`]: {
          top: token.spacing.sm,
          right: token.spacing.sm,
        },
      },
    },
  });

  model.element.addEventListener('click', () => {
    const alertWrapper = model.element.closest('.alert-page-declaration');
    if (alertWrapper instanceof HTMLElement) {
      shrinkThenRemove({ container: alertWrapper });
    }
  });

  return model;
};

export const CreateAlertPageElement = (
  props: AlertPageType,
): ElementVisual & { events: { onMount: () => void } } =>
  (() => {
    const { isShowIcon = true, isThemeDark, isThemeLight } = props;

    const textModel = AlertText(props);
    const iconModel = isShowIcon ? createIcon() : null;

    const closeButtonModel = createCloseButton({ isThemeDark: !!isThemeDark });

    const containerModel = ElementModel.createDiv({
      className: 'alert-page-container',
      children: [iconModel, textModel, closeButtonModel].filter(
        Boolean,
      ) as any[],
      elementStyles: {
        element: {
          display: 'flex',
          position: 'relative',
          padding: token.spacing.lg,
          paddingRight: token.spacing['2xl'],
          gap: token.spacing.lg,
          border: `solid 4px ${token.color.gold}`,

          [`@container ${ELEMENT_NAME} (max-width: ${MEDIUM}px)`]: {
            paddingRight: token.spacing.lg,
          },
        },
      },
      isThemeDark: isThemeDark || false,
    });

    const declarationModel = ElementModel.createDiv({
      className: 'alert-page-declaration',
      children: [containerModel],
      elementStyles: {
        element: {
          container: `${ELEMENT_NAME} / inline-size`,
        },
      },
    });

    let styles = STYLES_ALERT_PAGE_ELEMENT;
    styles += textModel.styles || '';
    if (iconModel) styles += iconModel.styles || '';
    styles += closeButtonModel.styles || '';
    styles += containerModel.styles || '';
    styles += declarationModel.styles || '';

    return {
      className: declarationModel.className,
      element: declarationModel.element,
      styles,
    } as ElementVisual & { events: { onMount: () => void } };
  })();
