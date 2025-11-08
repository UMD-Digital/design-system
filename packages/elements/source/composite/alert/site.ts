import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import {
  getLocalStorageInt,
  setLocalStorageTimestamp,
} from '@universityofmaryland/web-utilities-library/storage';
import { CreateAlertText as AlertText, AlertTextProps } from './elements/text';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../_types';
import { BREAKPOINTS } from './globals';
import { CreateCloseButton } from './elements/closeButton';

export interface AlertSiteProps extends AlertTextProps {
  daysToHide?: string;
}

const { MEDIUM } = BREAKPOINTS;
const DEFAULT_HIDE_TIME = 30;
const ALERT_LOCAL_STORAGE_KEY = 'umd-alert-site-time';

const shouldShow = (props: Pick<AlertSiteProps, 'daysToHide'>) => {
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

const createLock = (
  props: Pick<AlertSiteProps, 'headline' | 'text' | 'actions' | 'isThemeDark'>,
): ElementVisual => {
  const textModel = AlertText(props);

  const model = new ElementBuilder()
    .styled(layout.space.horizontal.larger)
    .withChild(textModel)
    .withStyles({
      element: {
        width: '100%',
      },
      subElement: {
        color: token.color.black,
        maxWidth: token.spacing.maxWidth.large,
      },
    })
    .build();

  const className = layout.space.horizontal.larger.className;
  const classNameString = Array.isArray(className)
    ? className.join(' ')
    : className || 'alert-site-lock';

  return {
    ...model,
    className: classNameString,
  };
};

const createCloseButton = () =>
  CreateCloseButton({
    targetSelector: '.alert-site-declaration',
    onBeforeClose: () =>
      setLocalStorageTimestamp({ key: ALERT_LOCAL_STORAGE_KEY }),
  });

const createContainer = (
  props: Pick<
    AlertSiteProps,
    'daysToHide' | 'isThemeDark' | 'headline' | 'text' | 'actions'
  >,
) => {
  const lockElement = createLock(props);
  const closeButtonElement = createCloseButton();
  const children = [lockElement, closeButtonElement].filter(
    Boolean,
  ) as ElementVisual[];

  const model = new ElementBuilder()
    .withClassName('alert-site-container')
    .withChildren(...children)
    .withStyles({
      element: {
        display: 'flex',
        position: 'relative',
        padding: `${token.spacing.lg} 0`,
        gap: token.spacing.lg,
        backgroundColor: token.color.gold,
        borderLeft: `4px solid ${token.color.red}`,

        [`@container (min-width: ${MEDIUM}px)`]: {
          borderLeft: `8px solid ${token.color.red}`,
          paddingRight: token.spacing['2xl'],
        },
      },
    })
    .build();

  return {
    ...model,
    className: 'alert-site-container',
  };
};

const createWrapper = (container: ElementVisual): ElementVisual => {
  const model = new ElementBuilder()
    .withClassName('alert-site-declaration')
    .withChild(container)
    .withStyles({
      element: {
        containerType: 'inline-size',
      },
    })
    .build();

  return {
    ...model,
    className: 'alert-site-declaration',
  };
};

export default (props: AlertSiteProps) => {
  const containerModel = createContainer(props);
  const declarationModel = createWrapper(containerModel);

  if (shouldShow(props)) {
    (declarationModel.element as HTMLElement).style.display = 'none';
  }

  return declarationModel;
};
