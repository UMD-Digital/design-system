import { tokens } from '@universityofmaryland/web-elements-styles';
import * as Utility from 'utilities';
import AlertText, { TypeAlertTextProps } from './elements/text';

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

const { colors, spacing } = tokens;

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
    color: ${colors.white};
  }

  ${OVERWRITE_THEME_DARK_CLOSE_BUTTON} rect {
    fill: ${colors.white};
  }
`;

const ButtonStyles = `
  .${ELEMENT_ALERT_PAGE_CLOSE_BUTTON} {
    position: absolute;
    top: ${spacing.lg};
    right: ${spacing.lg};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_PAGE_CLOSE_BUTTON} {
      top: ${spacing.sm};
      right: ${spacing.sm};
    }
  }
`;

const IconStyles = `
  .${ELEMENT_ALERT_PAGE_ICON} {
    display: block;
    fill: ${colors.gold};
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
    padding: ${spacing.lg};
    padding-right: ${spacing['2xl']};
    gap: ${spacing.lg};
    border: solid 4px ${colors.gold};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_PAGE_CONTAINER} {
      padding-right: ${spacing.lg};
    }
  }


  ${IconStyles}
  ${ButtonStyles}
  ${OverwriteThemeStyles}
`;

const CreateIcon = () => {
  const iconWrapper = document.createElement('div');
  let icon = Utility.asset.icon.NOTIFICATION;

  iconWrapper.classList.add(ELEMENT_ALERT_PAGE_ICON);
  iconWrapper.innerHTML = icon;

  return iconWrapper;
};

const CreateCloseButton = ({ container }: TypeAlertButtonProps) => {
  const closeButton = document.createElement('button');

  closeButton.classList.add(ELEMENT_ALERT_PAGE_CLOSE_BUTTON);
  closeButton.innerHTML = Utility.asset.icon.CLOSE_BUTTON;
  closeButton.setAttribute('aria-label', 'Close alert');
  closeButton.addEventListener('click', () => {
    Utility.styles.animations.shrinkThenRemove({ container });
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

export default CreateAlertPageElement;
