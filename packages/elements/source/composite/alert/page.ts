import * as token from '@universityofmaryland/web-styles-library/token';
import { shrinkThenRemove } from '@universityofmaryland/web-utilities-library/animation';
import { CLOSE_BUTTON } from '@universityofmaryland/web-icons-library/ui-controls';
import { NOTIFICATION } from '@universityofmaryland/web-icons-library/alerts';
import {
  CreateAlertText as AlertText,
  TypeAlertTextProps,
} from './elements/text';

type TypeShouldShowProps = {
  daysToHide?: string;
};

type TypeAlertProps = TypeShouldShowProps &
  TypeAlertTextProps & {
    isThemeLight?: boolean;
    isThemeDark?: boolean;
    isShowIcon?: boolean;
  };

type TypeAlertButtonProps = {
  container: HTMLElement;
};

const MEDUM = 500;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-element-alert-page';
const ELEMENT_ALERT_PAGE_DECLARATION = 'alert-page-declaration';
const ELEMENT_ALERT_PAGE_CONTAINER = 'alert-page-container';
const ELEMENT_ALERT_PAGE_CLOSE_BUTTON = 'alert-page-close-button';
const ELEMENT_ALERT_PAGE_ICON = 'alert-page-icon';

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_ALERT_PAGE_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_CLOSE_BUTTON = `${OVERWRITE_THEME_DARK_CONTAINER} .${ELEMENT_ALERT_PAGE_CLOSE_BUTTON}`;

const OverwriteThemeStyles = `
  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_DARK_CLOSE_BUTTON} rect {
    fill: ${token.color.white};
  }
`;

const ButtonStyles = `
  .${ELEMENT_ALERT_PAGE_CLOSE_BUTTON} {
    position: absolute;
    top: ${token.spacing.lg};
    right: ${token.spacing.lg};
  }

  .${ELEMENT_ALERT_PAGE_CLOSE_BUTTON} rect {
    fill: ${token.color.black};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_PAGE_CLOSE_BUTTON} {
      top: ${token.spacing.sm};
      right: ${token.spacing.sm};
    }
  }
`;

const IconStyles = `
  .${ELEMENT_ALERT_PAGE_ICON} {
    display: block;
    fill: ${token.color.gold};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_PAGE_ICON} {
      position: absolute;
      top: -20px;
    }
  }
`;

const STYLES_ALERT_PAGE_ELEMENT = `
  .${ELEMENT_ALERT_PAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_ALERT_PAGE_CONTAINER} {
    display: flex;
    position: relative;
    padding: ${token.spacing.lg};
    padding-right: ${token.spacing['2xl']};
    gap: ${token.spacing.lg};
    border: solid 4px ${token.color.gold};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_PAGE_CONTAINER} {
      padding-right: ${token.spacing.lg};
    }
  }

  ${IconStyles}
  ${ButtonStyles}
  ${OverwriteThemeStyles}
`;

const CreateIcon = () => {
  const iconWrapper = document.createElement('div');
  let icon = NOTIFICATION;

  iconWrapper.classList.add(ELEMENT_ALERT_PAGE_ICON);
  iconWrapper.innerHTML = icon;

  return iconWrapper;
};

const CreateCloseButton = ({ container }: TypeAlertButtonProps) => {
  const closeButton = document.createElement('button');

  closeButton.classList.add(ELEMENT_ALERT_PAGE_CLOSE_BUTTON);
  closeButton.innerHTML = CLOSE_BUTTON;
  closeButton.setAttribute('aria-label', 'Close alert');
  closeButton.addEventListener('click', () => {
    shrinkThenRemove({ container });
  });

  return closeButton;
};

export const CreateAlertPageElement = (props: TypeAlertProps) =>
  (() => {
    const { isShowIcon = true, isThemeDark, isThemeLight } = props;
    const elementContainer = document.createElement('div');
    const container = document.createElement('div');
    const textWrapper = AlertText(props);
    let styles = STYLES_ALERT_PAGE_ELEMENT;

    container.classList.add(ELEMENT_ALERT_PAGE_CONTAINER);
    if (isShowIcon) container.appendChild(CreateIcon());
    if (isThemeLight) container.setAttribute(ATTRIBUTE_THEME, 'light');
    if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, 'dark');

    container.appendChild(textWrapper.element);
    styles += textWrapper.styles;

    container.appendChild(CreateCloseButton({ container: elementContainer }));

    elementContainer.appendChild(container);
    elementContainer.classList.add(ELEMENT_ALERT_PAGE_DECLARATION);

    return {
      element: elementContainer,
      styles,
    };
  })();
