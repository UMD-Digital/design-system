declare global {
  interface Window {
    UMDAlertElement: typeof UMDAlertElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { GetLocalString } from './services/helper';
import { NOTIFICATION_ICON, EXCLAMATION_ICON } from 'assets/icons';
import { ComponentStyles, CreateShadowDom } from './elements';
import { ELEMENTS, VARIABLES, REFERENCES } from './globals';

const { ICON_CLASS } = ELEMENTS;
const {
  ELEMENT_NAME,
  ATTRIBUTE_TYPE,
  ATTRIBUTE_DAYS,
  ATTRIBUTE_ICON,
  TYPE_ALERT,
  TYPE_NOTIFICATION,
} = VARIABLES;

export class UMDAlertElement extends HTMLElement {
  _shadow: ShadowRoot;
  _container: HTMLDivElement | null = null;
  _defaultTime = 30;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_TYPE, ATTRIBUTE_DAYS, ATTRIBUTE_ICON];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === ATTRIBUTE_TYPE && newValue) {
      const icon = this._container?.querySelector(`.${ICON_CLASS}`);
      this._container?.setAttribute(ATTRIBUTE_TYPE, newValue);

      if (!icon) return;
      if (newValue === TYPE_NOTIFICATION) {
        icon.innerHTML = NOTIFICATION_ICON;
      } else {
        icon.innerHTML = EXCLAMATION_ICON;
      }
    }

    if (name === ATTRIBUTE_DAYS && newValue) {
      this._defaultTime = parseInt(newValue);
    }

    if (name === ATTRIBUTE_ICON && newValue === 'false') {
      this._container?.setAttribute(ATTRIBUTE_ICON, 'false');
    }

    if (name === ATTRIBUTE_ICON && newValue === 'true') {
      this._container?.setAttribute(ATTRIBUTE_ICON, 'true');
    }
  }

  connectedCallback() {
    const element = this;
    const type = this.getAttribute(ATTRIBUTE_TYPE) || TYPE_ALERT;
    const days = this.getAttribute(ATTRIBUTE_DAYS) || '10';
    const isShowIcon = this.getAttribute(ATTRIBUTE_ICON) || 'true';
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
    this._container.setAttribute(ATTRIBUTE_TYPE, type);
    this._container.setAttribute(ATTRIBUTE_ICON, isShowIcon);
    this._shadow.appendChild(domContent);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDAlertElement = UMDAlertElement;
    window.customElements.define(ELEMENT_NAME, UMDAlertElement);
  }
};
