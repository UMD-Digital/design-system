import {
  CLOSE_BUTTON_ICON,
  NOTIFICATION_ICON,
  EXCLAMATION_ICON,
} from 'assets/icons';

export const ELEMENT_ALERT_NAME = 'umd-element-alert';

const CONTAINER_CLASS = 'umd-element-alert-container';
const ICON_CLASS = 'umd-element-alert-icon';
const CLOSE_BUTTON_CLASS = 'umd-element-alert-close-button';
const ALERT_LOCAL_STORAGE_KEY = 'umd-alert-closed-time';

const COLORS = {
  yellow: '#ffd200',
  blue: '#2f7eda',
  red: '#e21833',
};
const BREAKPOINTS = {
  small: 500,
  medium: 700,
};

const template = document.createElement('template');

template.innerHTML = `
<style>
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
    padding: 32px;
    padding-right: 64px;
    gap: 32px;
  }

  @container umd-alert (max-width: 260px) {
    :host .${CONTAINER_CLASS} {
      display: none
    }
  }

  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
    :host .${CONTAINER_CLASS} {
      padding-right: 32px;
    }
  }

  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
    :host .${ICON_CLASS} {
      position: absolute;
      top: -20px;
    }
  }

  :host .${CLOSE_BUTTON_CLASS} {
    position: absolute !important;
    top: 32px;
    right: 32px;
  }

  @container umd-alert (max-width: ${BREAKPOINTS.small}px) {
    :host .${CLOSE_BUTTON_CLASS} {
      top: 16px;
      right: 16px;
    }
  }

  .${CONTAINER_CLASS}[data-icon="true"] .${ICON_CLASS} {
    display: block;
  }

  .${CONTAINER_CLASS}[data-icon="false"] .${ICON_CLASS} {
    display: none;
  }

  .${CONTAINER_CLASS}[data-type="alert"] {
    border: solid 4px ${COLORS.yellow} !important;
  }
  
  .${CONTAINER_CLASS}[data-type="alert"] .${ICON_CLASS} svg circle {
    fill: ${COLORS.yellow} !important;
  }

  .${CONTAINER_CLASS}[data-type="notification"] {
    border: solid 4px ${COLORS.blue} !important;
  }

  .${CONTAINER_CLASS}[data-type="notification"] .${ICON_CLASS} svg circle {
    fill: ${COLORS.blue} !important;
  }

  .${CONTAINER_CLASS}[data-type="emergency"]  {
    border: solid 4px ${COLORS.red} !important;
  }

  .${CONTAINER_CLASS}[data-type="emergency"] .${ICON_CLASS} svg circle  {
    fill: ${COLORS.red} !important;
  }
</style>`;

const CreateSlot = ({ type }: { type: string }) => {
  const slot = document.createElement('slot');
  slot.setAttribute('name', type);
  return slot;
};

const GetLocalString = () => {
  const string = localStorage.getItem(ALERT_LOCAL_STORAGE_KEY);
  if (string) return parseInt(string, 10);
  return null;
};
const SetLocalString = () => {
  const currentTime = new Date().getTime();
  localStorage.setItem(ALERT_LOCAL_STORAGE_KEY, currentTime.toString());
};

const CreateShadowDom = ({
  titleSlot,
  bodySlot,
  element,
}: {
  titleSlot: HTMLSlotElement;
  bodySlot: HTMLSlotElement;
  element: HTMLElement;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const iconWrapper = document.createElement('div');
  const closeButton = document.createElement('button');

  container.classList.add(CONTAINER_CLASS);

  closeButton.classList.add(CLOSE_BUTTON_CLASS);
  closeButton.innerHTML = CLOSE_BUTTON_ICON;
  closeButton.addEventListener('click', () => {
    EventClose({ element });
    SetLocalString();
  });

  iconWrapper.classList.add(ICON_CLASS);
  iconWrapper.innerHTML = NOTIFICATION_ICON;

  wrapper.appendChild(titleSlot);
  wrapper.appendChild(bodySlot);

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
    const type = this.getAttribute('type');
    const days = this.getAttribute('days');
    const isShowIcon = this.getAttribute('icon');
    const element = this;
    const titleSlot = CreateSlot({ type: 'title' });
    const bodySlot = CreateSlot({ type: 'body' });
    const domContent = CreateShadowDom({ titleSlot, bodySlot, element });
    const lastClosedTime = GetLocalString();

    if (!type || !days) {
      throw new Error('Alert element must have a type and days attribute');
    }

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
    this._container.setAttribute('data-icon', isShowIcon || 'true');
    this._shadow.appendChild(domContent);
  }
}

if (!window.customElements.get(ELEMENT_ALERT_NAME)) {
  window.UMDAlertElement = UMDAlertElement;
  window.customElements.define(ELEMENT_ALERT_NAME, UMDAlertElement);
}
