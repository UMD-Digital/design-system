import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { MakeSlot } from 'helpers/ui';
import { SetLocalString } from '../services/helper';
import { CLOSE_BUTTON_ICON, NOTIFICATION_ICON } from 'assets/icons';
import { BREAKPOINTS, ELEMENTS } from '../globals';
import { EventClose } from '../services/events';

export const ELEMENT_NAME = 'umd-element-alert';

const CONTAINER_CLASS = 'umd-element-alert-container';
const TITLE_CLASS = 'umd-element-alert-title-wrapper';
const BODY_CLASS = 'umd-element-alert-body-wrapper';
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
  :host .${CLOSE_BUTTON_CLASS} {
    position: absolute !important;
    top: ${spacing.lg};
    right: ${spacing.lg};
  }
  
  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
    :host .${CLOSE_BUTTON_CLASS} {
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

const BodyStyles = `
  .${BODY_CLASS} {
    font-weight: 500;
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
    container: umd-alert / inline-size; 
  }

  :host * {
    box-sizing: border-box;
  }
  
  :host button {
    background-color: transparent !important;
    border: none !important;
    cursor: pointer;
  }
  
  :host .${CONTAINER_CLASS} {
    display: flex;
    position: relative !important;
    padding: ${spacing.lg};
    padding-right: ${spacing['2xl']};
    gap: ${spacing.lg};
  }
  
  @container umd-alert (max-width: 260px) {
    :host .${CONTAINER_CLASS} {
      display: none
    }
  }
  
  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
    :host .${CONTAINER_CLASS} {
      padding-right: ${spacing.lg};
    }
  }

  :host slot[name="title"] {
    margin-bottom: ${spacing.sm};
    display: block;
  }

  ${IconStyles}
  ${ButtonStyles}
  ${BodyStyles}
  ${AlertStyles}
  ${NotificationStyles}
  ${EmergencyStyles}
`;

export const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const iconWrapper = document.createElement('div');
  const titleWrapper = document.createElement('div');
  const bodyWrapper = document.createElement('div');
  const closeButton = document.createElement('button');
  const titleSlot = MakeSlot({ type: 'title' });
  const bodySlot = MakeSlot({ type: 'body' });

  container.classList.add(CONTAINER_CLASS);

  closeButton.classList.add(CLOSE_BUTTON_CLASS);
  closeButton.innerHTML = CLOSE_BUTTON_ICON;
  closeButton.setAttribute('aria-label', 'Close alert');
  closeButton.addEventListener('click', () => {
    EventClose({ element });
    SetLocalString();
  });

  iconWrapper.classList.add(ELEMENTS.ICON_CLASS);
  iconWrapper.innerHTML = NOTIFICATION_ICON;

  titleWrapper.classList.add(TITLE_CLASS);
  titleWrapper.appendChild(titleSlot);

  bodyWrapper.classList.add(BODY_CLASS);
  bodyWrapper.appendChild(bodySlot);

  wrapper.appendChild(titleWrapper);
  wrapper.appendChild(bodyWrapper);

  container.appendChild(iconWrapper);
  container.appendChild(wrapper);
  container.appendChild(closeButton);

  return container;
};
