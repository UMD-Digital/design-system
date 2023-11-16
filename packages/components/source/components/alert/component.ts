declare global {
  interface Window {
    UMDAlertElement: typeof UMDAlertElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { GetLocalString } from './services/helper';
import { NOTIFICATION_ICON, EXCLAMATION_ICON } from 'assets/icons';
import { ComponentStyles, CreateShadowDom } from './elements';
import { ELEMENTS } from './globals';

export const ELEMENT_NAME = 'umd-element-alert';
export type AlertType = UMDAlertElement;
export class UMDAlertElement extends HTMLElement {
  _shadow: ShadowRoot;
  _container: HTMLDivElement | null = null;
  _defaultTime = 30;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const elementStyles = require('./styles/shadow-dom.css');
    const styles = `${elementStyles.toString()}${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['type', 'days', 'icon'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'type' && newValue) {
      const icon = this._container?.querySelector(`.${ELEMENTS.ICON_CLASS}`);
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

export const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    const GetDefaultStyles = () => require('./styles/light-dom.css').toString();

    window.UMDAlertElement = UMDAlertElement;
    window.customElements.define(ELEMENT_NAME, UMDAlertElement);

    return GetDefaultStyles();
  }
};
