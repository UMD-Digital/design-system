import * as token from '@universityofmaryland/web-styles-library/token';
import { shrinkThenRemove } from '@universityofmaryland/web-utilities-library/animation';
import {
  getLocalStorageInt,
  setLocalStorageTimestamp,
} from '@universityofmaryland/web-utilities-library/storage';
import { close as iconClose } from '@universityofmaryland/web-icons-library/controls';
import { CreateAlertText as AlertText, TypeAlertText } from './elements/text';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';
import { BREAKPOINTS } from './globals';

export interface AlertSiteType extends TypeAlertText {
  daysToHide?: string;
}

export const TEXT_CONSTANTS = {
  className: {
    wrapper: 'wrapper',
    text: 'text',
    actions: 'actions',
  },
};

const { MEDIUM } = BREAKPOINTS;
const DEFAULT_HIDE_TIME = 30;
const ALERT_LOCAL_STORAGE_KEY = 'umd-alert-site-time';

const ELEMENT_NAME = 'umd-element-alert-site';

const OVERWRITE_TEXT_WRAPPER = `.alert-site-container .${TEXT_CONSTANTS.className.text}`;
const OVERWRITE_TEXT_BODY = `.alert-site-container .${TEXT_CONSTANTS.className.wrapper}`;

const OverwriteText = `
  ${OVERWRITE_TEXT_WRAPPER} {
    max-width: ${token.spacing.maxWidth.large};
  }

  ${OVERWRITE_TEXT_BODY},
  ${OVERWRITE_TEXT_BODY} * {
    color: ${token.color.black};
    max-width: ${token.spacing.maxWidth.large};
  }
`;

const STYLES_ALERT_SITE_ELEMENT = `
  .alert-site-declaration {
    container: ${ELEMENT_NAME} / inline-size;
  }


  ${OverwriteText}
`;

const CreateCloseButton = () => {
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

        ['& rect']: { fill: token.color.black },
        ['& path']: { fill: token.color.black },

        [`@container ${ELEMENT_NAME} (max-width: ${MEDIUM}px)`]: {
          top: token.spacing.sm,
          right: token.spacing.sm,
        },
      },
    },
  });

  model.element.addEventListener('click', () => {
    setLocalStorageTimestamp({ key: ALERT_LOCAL_STORAGE_KEY });

    const alertWrapper = model.element.closest('.alert-page-declaration');
    if (alertWrapper instanceof HTMLElement) {
      shrinkThenRemove({ container: alertWrapper });
    }
  });

  return model;
};

const shouldShow = (props: Pick<AlertSiteType, 'daysToHide'>) => {
  const { daysToHide } = props;

  const now = new Date().getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const lastClosedTime = getLocalStorageInt({
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

export const CreateAlertSiteElement = (
  props: Pick<AlertSiteType, 'daysToHide' | 'isThemeDark'>,
): ElementVisual =>
  (() => {
    const textModel = AlertText(props);
    const closeButtonModel = CreateCloseButton();

    const lockModel = ElementModel.createDiv({
      className: 'alert-site-lock',
      children: [textModel],
      elementStyles: {
        element: {
          width: '100%',
          paddingLeft: token.spacing.md,
          paddingRight: token.spacing.md,

          [`@container ${ELEMENT_NAME} (min-width: 768px)`]: {
            paddingLeft: token.spacing['2xl'],
            paddingRight: token.spacing['2xl'],
          },

          [`@container ${ELEMENT_NAME} (min-width: 1200px)`]: {
            paddingLeft: token.spacing['4xl'],
            paddingRight: token.spacing['4xl'],
          },
        },
      },
    });

    const containerModel = ElementModel.createDiv({
      className: 'alert-site-container',
      children: [lockModel, closeButtonModel],
      elementStyles: {
        element: {
          display: 'flex',
          position: 'relative',
          padding: `${token.spacing.lg} 0`,
          gap: token.spacing.lg,
          backgroundColor: token.color.gold,
          borderLeft: `4px solid ${token.color.red}`,

          [`@container ${ELEMENT_NAME} (min-width: ${MEDIUM}px)`]: {
            borderLeft: `8px solid ${token.color.red}`,
            paddingRight: token.spacing['2xl'],
          },
        },
      },
    });

    const declarationModel = ElementModel.createDiv({
      className: 'alert-site-declaration',
      children: [containerModel],
      elementStyles: {
        element: {
          container: `${ELEMENT_NAME} / inline-size`,
        },
      },
    });

    let styles = STYLES_ALERT_SITE_ELEMENT;
    styles += textModel.styles;
    styles += lockModel.styles;
    styles += closeButtonModel.styles;
    styles += containerModel.styles;
    styles += declarationModel.styles;

    if (shouldShow(props)) {
      (declarationModel.element as HTMLElement).style.display = 'none';
    }

    return {
      className: declarationModel.className,
      element: declarationModel.element,
      styles,
    } as ElementVisual;
  })();
