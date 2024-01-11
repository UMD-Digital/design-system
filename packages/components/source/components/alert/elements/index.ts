import { colors, spacing } from '@universityofmaryland/variables';
import { CLOSE_BUTTON_ICON, NOTIFICATION_ICON } from 'assets/icons';
import { Reset } from 'helpers/styles';
import { BREAKPOINTS, ELEMENTS } from '../globals';
import { AlertType } from '../component';
import { SetLocalString } from '../services/helper';
import { EventClose } from '../services/events';
import { CreateHeadline, headlineStyles } from './headline';
import { CreateBody, bodyStyles } from './body';
import { CreateCta, ctaStyles } from './cta';

export const ELEMENT_NAME = 'umd-element-alert';

const CONTAINER_CLASS = 'umd-element-alert-container';
const CLOSE_BUTTON_CLASS = 'umd-element-alert-close-button';

const AlertStyles = `
  .${CONTAINER_CLASS}[data-type="alert"] {
    border: solid 4px ${colors.gold} !important;
  }

  .${CONTAINER_CLASS}[data-type="alert"] .${ELEMENTS.ICON_CLASS} svg circle {
    fill: ${colors.gold} !important;
  }
`;

const NotificationStyles = `
  .${CONTAINER_CLASS}[data-type="notification"] {
    border: solid 4px #2f7eda !important;
  }

  .${CONTAINER_CLASS}[data-type="notification"] .${ELEMENTS.ICON_CLASS} svg circle {
    fill: #2f7eda !important;
  }
`;

const EmergencyStyles = `
  .${CONTAINER_CLASS}[data-type="emergency"]  {
    border: solid 4px ${colors.red} !important;
  }

  .${CONTAINER_CLASS}[data-type="emergency"] .${ELEMENTS.ICON_CLASS} svg circle  {
    fill: ${colors.red} !important;
  }
`;

const ButtonStyles = `
  .${CLOSE_BUTTON_CLASS} {
    position: absolute !important;
    top: ${spacing.lg};
    right: ${spacing.lg};
  }

  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
    .${CLOSE_BUTTON_CLASS} {
      top: ${spacing.sm};
      right: ${spacing.sm};
    }
  }
`;

const IconStyles = `
  .${CONTAINER_CLASS}[data-icon="true"] .${ELEMENTS.ICON_CLASS} {
    display: block;
  }

  .${CONTAINER_CLASS}[data-icon="false"] .${ELEMENTS.ICON_CLASS} {
    display: none;
  }

  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
    :host .${ELEMENTS.ICON_CLASS} {
      position: absolute;
      top: -20px;
    }
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
    container: umd-alert / inline-size;
  }

  ${Reset}

  :host .${CONTAINER_CLASS} {
    display: flex;
    position: relative !important;
    padding: ${spacing.lg};
    padding-right: ${spacing['2xl']};
    gap: ${spacing.lg};
  }

  @container umd-alert (max-width: 260px) {
  .${CONTAINER_CLASS} {
      display: none
    }
  }

  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
  .${CONTAINER_CLASS} {
      padding-right: ${spacing.lg};
    }
  }

  slot[name="title"] {
    margin-bottom: ${spacing.sm};
    display: block;
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

const CreateIcon = () => {
  const iconWrapper = document.createElement('div');

  iconWrapper.classList.add(ELEMENTS.ICON_CLASS);
  iconWrapper.innerHTML = NOTIFICATION_ICON;

  return iconWrapper;
};

const CreateCloseButton = ({ element }: { element: AlertType }) => {
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

export const CreateShadowDom = ({ element }: { element: AlertType }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const headline = CreateHeadline({ element });
  const body = CreateBody({ element });
  const cta = CreateCta({ element });

  container.classList.add(CONTAINER_CLASS);

  if (headline) wrapper.appendChild(headline);
  if (body) wrapper.appendChild(body);
  if (cta) wrapper.appendChild(cta);

  container.appendChild(CreateIcon());
  container.appendChild(wrapper);
  container.appendChild(CreateCloseButton({ element }));

  return container;
};
