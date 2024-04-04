import { Tokens } from '@universityofmaryland/variables';
import {
  CLOSE_BUTTON_ICON,
  NOTIFICATION_ICON,
  EXCLAMATION_ICON,
} from 'utilities/assets/icons';
import { Styles } from 'utilities';
import { SetLocalString } from '../services/helper';
import { EventClose } from '../services/events';
import { CreateHeadline, headlineStyles } from './headline';
import { CreateBody, bodyStyles } from './body';
import { CreateCta, ctaStyles } from './cta';
import { BREAKPOINTS, ELEMENTS, VARIABLES, REFERENCES } from '../globals';
import { UMDAlertElement } from '../index';

const { Colors, Spacing } = Tokens;

const { SMALL } = BREAKPOINTS;
const { ICON_CLASS } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
const {
  IS_TYPE_ALERT,
  IS_TYPE_NOTIFICATION,
  IS_TYPE_EMEMERGENCY,
  IS_WITH_ICON,
  IS_WITHOUT_ICON,
} = REFERENCES;

const CONTAINER_CLASS = 'umd-element-alert-container';
const CLOSE_BUTTON_CLASS = 'umd-element-alert-close-button';

const AlertStyles = `
  .${CONTAINER_CLASS}${IS_TYPE_ALERT} {
    border: solid 4px ${Colors.gold};
  }

  .${CONTAINER_CLASS}${IS_TYPE_ALERT} .${ICON_CLASS} svg circle {
    fill: ${Colors.gold};
  }
`;

const NotificationStyles = `
  .${CONTAINER_CLASS}${IS_TYPE_NOTIFICATION} {
    border: solid 4px ${Colors.blue};
  }

  .${CONTAINER_CLASS}${IS_TYPE_NOTIFICATION} .${ICON_CLASS} svg circle {
    fill: ${Colors.blue};
  }
`;

const EmergencyStyles = `
  .${CONTAINER_CLASS}${IS_TYPE_EMEMERGENCY} {
    border: solid 4px ${Colors.red};
  }

  .${CONTAINER_CLASS}${IS_TYPE_EMEMERGENCY} .${ICON_CLASS} svg circle {
    fill: ${Colors.red};
  }
`;

const ButtonStyles = `
  .${CLOSE_BUTTON_CLASS} {
    position: absolute;
    top: ${Spacing.lg};
    right: ${Spacing.lg};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL}px) {
    .${CLOSE_BUTTON_CLASS} {
      top: ${Spacing.sm};
      right: ${Spacing.sm};
    }
  }
`;

const IconStyles = `
  .${CONTAINER_CLASS}${IS_WITH_ICON} .${ICON_CLASS} {
    display: block;
  }

  .${CONTAINER_CLASS}${IS_WITHOUT_ICON} .${ICON_CLASS} {
    display: none;
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL}px) {
    .${ICON_CLASS} {
      position: absolute;
      top: -20px;
    }
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}

  :host .${CONTAINER_CLASS} {
    container: ${ELEMENT_NAME} / inline-size;
    display: flex;
    position: relative;
    padding: ${Spacing.lg};
    padding-right: ${Spacing['2xl']};
    gap: ${Spacing.lg};
  }

  @container ${ELEMENT_NAME} (max-width: 260px) {
    .${CONTAINER_CLASS} {
      display: none
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL}px) {
    .${CONTAINER_CLASS} {
      padding-right: ${Spacing.lg};
    }
  }

  ${IconStyles}
  ${ButtonStyles}
  ${headlineStyles}
  ${bodyStyles}
  ${ctaStyles}
  ${AlertStyles}
  ${NotificationStyles}
  ${EmergencyStyles}
`;

const CreateIcon = ({ element }: { element: UMDAlertElement }) => {
  const type = element.getAttribute('type');
  const iconWrapper = document.createElement('div');
  let icon = NOTIFICATION_ICON;

  if (type && type === 'emergency') {
    icon = EXCLAMATION_ICON;
  }

  iconWrapper.classList.add(ICON_CLASS);
  iconWrapper.innerHTML = icon;

  return iconWrapper;
};

const CreateCloseButton = ({ element }: { element: UMDAlertElement }) => {
  const closeButton = document.createElement('button');

  closeButton.classList.add(CLOSE_BUTTON_CLASS);
  closeButton.innerHTML = CLOSE_BUTTON_ICON;
  closeButton.setAttribute('aria-label', 'Close alert');
  closeButton.addEventListener('click', () => {
    EventClose({ element });
    SetLocalString();
  });

  return closeButton;
};

export const CreateShadowDom = ({ element }: { element: UMDAlertElement }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const headline = CreateHeadline({ element });
  const body = CreateBody({ element });
  const cta = CreateCta({ element });

  container.classList.add(CONTAINER_CLASS);

  if (headline) wrapper.appendChild(headline);
  if (body) wrapper.appendChild(body);
  if (cta) wrapper.appendChild(cta);

  container.appendChild(CreateIcon({ element }));
  container.appendChild(wrapper);
  container.appendChild(CreateCloseButton({ element }));

  return container;
};
