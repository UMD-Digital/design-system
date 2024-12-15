import { Tokens } from '@universityofmaryland/variables';
import { Asset, Styles } from 'utilities';
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

const { Colors, Spacing } = Tokens;

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
    color: ${Colors.white};
  }

  ${OVERWRITE_THEME_DARK_CLOSE_BUTTON} rect {
    fill: ${Colors.white};
  }
`;

const ButtonStyles = `
  .${ELEMENT_ALERT_PAGE_CLOSE_BUTTON} {
    position: absolute;
    top: ${Spacing.lg};
    right: ${Spacing.lg};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_PAGE_CLOSE_BUTTON} {
      top: ${Spacing.sm};
      right: ${Spacing.sm};
    }
  }
`;

const IconStyles = `
  .${ELEMENT_ALERT_PAGE_ICON} {
    display: block;
    fill: ${Colors.gold};
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
    padding: ${Spacing.lg};
    padding-right: ${Spacing['2xl']};
    gap: ${Spacing.lg};
    border: solid 4px ${Colors.gold};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_PAGE_CONTAINER} {
      padding-right: ${Spacing.lg};
    }
  }


  ${IconStyles}
  ${ButtonStyles}
  ${OverwriteThemeStyles}
`;

const CreateIcon = () => {
  const iconWrapper = document.createElement('div');
  let icon = Asset.icon.NOTIFICATION;

  iconWrapper.classList.add(ELEMENT_ALERT_PAGE_ICON);
  iconWrapper.innerHTML = icon;

  return iconWrapper;
};

const CreateCloseButton = ({ container }: TypeAlertButtonProps) => {
  const closeButton = document.createElement('button');

  closeButton.classList.add(ELEMENT_ALERT_PAGE_CLOSE_BUTTON);
  closeButton.innerHTML = Asset.icon.CLOSE_BUTTON;
  closeButton.setAttribute('aria-label', 'Close alert');
  closeButton.addEventListener('click', () => {
    Styles.animations.shrinkThenRemove({ container });
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
