import { Tokens, Layout } from '@universityofmaryland/variables';
import { AssetIcon, Storage, Styles } from 'utilities';
import AlertText, {
  CONSTANTS as TEXT_CONSTANTS,
  TypeAlertTextProps,
} from './elements/text';

type TypeShouldShowProps = {
  daysToHide?: string;
};

type TypeAlertProps = TypeShouldShowProps &
  TypeAlertTextProps & {
    isShowIcon?: boolean;
  };

type TypeAlertButtonProps = {
  container: HTMLElement;
};

const { Colors, Spacing, MaxWidth } = Tokens;
const { LockMax } = Layout;
const { convertJSSObjectToStyles } = Styles;

const MEDUM = 500;
const DEFAULT_HIDE_TIME = 30;
const ALERT_LOCAL_STORAGE_KEY = 'umd-alert-site-time';

const ELEMENT_NAME = 'umd-element-alert-site';
const ELEMENT_ALERT_SITE_DECLARATION = 'alert-site-declaration';
const ELEMENT_ALERT_SITE_CONTAINER = 'alert-site-container';
const ELEMENT_ALERT_SITE_LOCK = 'alert-site-lock';
const ELEMENT_ALERT_SITE_CLOSE_BUTTON = 'alert-site-close-button';

const OVERWRITE_TEXT_WRAPPER = `.${ELEMENT_ALERT_SITE_CONTAINER} .${TEXT_CONSTANTS.className.text}`;
const OVERWRITE_TEXT_BODY = `.${ELEMENT_ALERT_SITE_CONTAINER} .${TEXT_CONSTANTS.className.wrapper}`;

const OverwriteText = `
  ${OVERWRITE_TEXT_WRAPPER} {
    max-width: ${MaxWidth.large};
  }

  ${OVERWRITE_TEXT_BODY},
  ${OVERWRITE_TEXT_BODY} * {
    color: ${Colors.black};
    max-width: ${MaxWidth.large};
  }
`;

const ButtonStyles = `
  .${ELEMENT_ALERT_SITE_CLOSE_BUTTON} {
    position: absolute;
    top: ${Spacing.lg};
    right: ${Spacing.lg};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_SITE_CLOSE_BUTTON} {
      top: ${Spacing.sm};
      right: ${Spacing.sm};
    }
  }
`;

const LockStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_SITE_LOCK}`]: LockMax,
    },
  })}

  .${ELEMENT_ALERT_SITE_LOCK} {
    width: 100%;
  }
`;

const STYLES_ALERT_SITE_ELEMENT = `
  .${ELEMENT_ALERT_SITE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_ALERT_SITE_CONTAINER} {
    display: flex;
    position: relative;
    padding: ${Spacing.lg} 0;
    gap: ${Spacing.lg};
    background-color: ${Colors.gold};
    border-left: 4px solid ${Colors.red};
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDUM}px) {
    .${ELEMENT_ALERT_SITE_CONTAINER} {
      border-left: 8px solid ${Colors.red};
      padding-right: ${Spacing['2xl']};
    }
  }


  ${ButtonStyles}
  ${LockStyles}
  ${OverwriteText}
`;

const CreateCloseButton = ({ container }: TypeAlertButtonProps) => {
  const closeButton = document.createElement('button');

  closeButton.classList.add(ELEMENT_ALERT_SITE_CLOSE_BUTTON);
  closeButton.innerHTML = AssetIcon.CLOSE_BUTTON;
  closeButton.setAttribute('aria-label', 'Close alert');
  closeButton.addEventListener('click', () => {
    Styles.animations.shrinkThenRemove({ container });
    Storage.local.set({ key: ALERT_LOCAL_STORAGE_KEY });
  });

  return closeButton;
};

const ShouldShow = ({ daysToHide }: TypeShouldShowProps) => {
  const now = new Date().getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const lastClosedTime = Storage.local.get({
    key: ALERT_LOCAL_STORAGE_KEY,
  });

  if (!lastClosedTime) return false;

  const daysUntilAlertDisplay = daysToHide
    ? parseInt(daysToHide)
    : DEFAULT_HIDE_TIME;
  const futureTimeStamp =
    lastClosedTime + millisecondsPerDay * daysUntilAlertDisplay;
  const futureTime = new Date(futureTimeStamp).getTime();

  return futureTime > now;
};

export const CreateAlertSiteElement = (props: TypeAlertProps) =>
  (() => {
    const elementContainer = document.createElement('div');
    const container = document.createElement('div');
    const lock = document.createElement('div');
    const textWrapper = AlertText(props);
    const shouldHide = ShouldShow(props);
    let styles = STYLES_ALERT_SITE_ELEMENT;

    if (shouldHide) container.style.display = 'none';

    lock.classList.add(ELEMENT_ALERT_SITE_LOCK);
    lock.appendChild(textWrapper.element);

    styles += textWrapper.styles;

    container.classList.add(ELEMENT_ALERT_SITE_CONTAINER);
    container.appendChild(lock);
    container.appendChild(CreateCloseButton({ container: elementContainer }));

    elementContainer.appendChild(container);
    elementContainer.classList.add(ELEMENT_ALERT_SITE_DECLARATION);

    return {
      element: elementContainer,
      styles,
    };
  })();

export default CreateAlertSiteElement;
