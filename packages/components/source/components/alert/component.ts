import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import { MakeTemplate, MakeSlot } from 'helpers/ui';
import {
  CLOSE_BUTTON_ICON,
  NOTIFICATION_ICON,
  EXCLAMATION_ICON,
} from 'assets/icons';

export const ELEMENT_NAME = 'umd-element-alert';

const CONTAINER_CLASS = 'umd-element-alert-container';
const ICON_CLASS = 'umd-element-alert-icon';
const TITLE_CLASS = 'umd-element-alert-title-wrapper';
const BODY_CLASS = 'umd-element-alert-body-wrapper';
const CLOSE_BUTTON_CLASS = 'umd-element-alert-close-button';
const ALERT_LOCAL_STORAGE_KEY = 'umd-alert-closed-time';

const BREAKPOINTS = {
  small: 500,
  medium: 700,
};

const AlertStyles = `
  .${CONTAINER_CLASS}[data-type="alert"] {
    border: solid 4px ${colors.gold} !important;
  }
  
  .${CONTAINER_CLASS}[data-type="alert"] .${ICON_CLASS} svg circle {
    fill: ${colors.gold} !important;
  }
`;

const NotificationStyles = `
  .${CONTAINER_CLASS}[data-type="notification"] {
    border: solid 4px #2f7eda !important;
  }
  
  .${CONTAINER_CLASS}[data-type="notification"] .${ICON_CLASS} svg circle {
    fill: #2f7eda !important;
  }
`;

const EmergencyStyles = `
  .${CONTAINER_CLASS}[data-type="emergency"]  {
    border: solid 4px ${colors.red} !important;
  }
  
  .${CONTAINER_CLASS}[data-type="emergency"] .${ICON_CLASS} svg circle  {
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
  .${CONTAINER_CLASS}[data-icon="true"] .${ICON_CLASS} {
    display: block;
  }
  
  .${CONTAINER_CLASS}[data-icon="false"] .${ICON_CLASS} {
    display: none;
  }

  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
    :host .${ICON_CLASS} {
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

const ComponentStyles = `
  :host {
    display: block !important;
    container: umd-alert / inline-size; 
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

export const GetDefaultStyles = () => require('./default.css').toString();

const GetLocalString = () => {
  const string = localStorage.getItem(ALERT_LOCAL_STORAGE_KEY);
  if (string) return parseInt(string, 10);
  return null;
};

const SetLocalString = () => {
  const currentTime = new Date().getTime();
  localStorage.setItem(ALERT_LOCAL_STORAGE_KEY, currentTime.toString());
};

const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
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
  closeButton.addEventListener('click', () => {
    EventClose({ element });
    SetLocalString();
  });

  iconWrapper.classList.add(ICON_CLASS);
  iconWrapper.innerHTML = NOTIFICATION_ICON;

  titleWrapper.classList.add('umd-sans-large');
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

const EventClose = ({ element }: { element: HTMLElement }) => {
  const frames = 30;
  const startingHeight = element.clientHeight;
  const startingPadding = parseInt(
    window.getComputedStyle(element).paddingBottom.split('px')[0],
  );
  const heightDiff = startingHeight / frames;
  const paddingDiff = startingPadding / frames;
  let currentFrame = 0;
  let currentHeight = startingHeight;
  let currentPadding = startingPadding;

  element.style.overflow = 'hidden';

  const shrink = () => {
    if (frames > currentFrame) {
      currentHeight = currentHeight - heightDiff;
      currentPadding = currentPadding - paddingDiff;

      element.style.height = `${currentHeight}px`;
      element.style.paddingBottom = `${currentPadding}px`;

      currentFrame++;
      window.requestAnimationFrame(shrink);
    } else {
      element.style.height = '0px';
      element.style.paddingBottom = '0px';

      setTimeout(() => {
        element.style.display = 'none';
        element.setAttribute('closed', 'true');
      }, 100);
    }
  };

  window.requestAnimationFrame(shrink);
};

export class UMDAlertElement extends HTMLElement {
  _shadow: ShadowRoot;
  _container: HTMLDivElement | null = null;
  _defaultTime = 30;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const ElementStyles = require('./index.css');
    const styles = `${ElementStyles.toString()}${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['type', 'days', 'icon'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'type' && newValue) {
      const icon = this._container?.querySelector(`.${ICON_CLASS}`);
      this._container?.setAttribute('data-type', newValue);

      if (!icon) return;
      if (newValue === 'notification') {
        icon.innerHTML = NOTIFICATION_ICON;
      } else {
        icon.innerHTML = EXCLAMATION_ICON;
      }
    }

    if (name === 'days' && newValue) {
      this._defaultTime = parseInt(newValue);
    }

    if (name === 'icon' && newValue === 'false') {
      this._container?.setAttribute('data-icon', 'false');
    }

    if (name === 'icon' && newValue === 'true') {
      this._container?.setAttribute('data-icon', 'true');
    }
  }

  connectedCallback() {
    const element = this;
    const type = this.getAttribute('type') || 'alert';
    const days = this.getAttribute('days') || '10';
    const isShowIcon = this.getAttribute('icon') || 'true';
    const lastClosedTime = GetLocalString();
    const domContent = CreateShadowDom({ element });

    if (lastClosedTime) {
      const daysUntilAlertDisplay = parseInt(days) || this._defaultTime;
      const currentTime = new Date().getTime();
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const caculatedDate = lastClosedTime ?? currentTime - lastClosedTime;
      const futureDate = daysUntilAlertDisplay * millisecondsPerDay;
      const isPastTime = caculatedDate < futureDate;

      if (isPastTime) {
        this.style.display = 'none';
      }
    }

    this._container = domContent;
    this._container.setAttribute('data-type', type);
    this._container.setAttribute('data-icon', isShowIcon);
    this._shadow.appendChild(domContent);
  }
}
