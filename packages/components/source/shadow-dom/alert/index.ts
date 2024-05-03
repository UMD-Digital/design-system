declare global {
  interface Window {
    UMDAlertElement: typeof UMDAlertElement;
  }
}

import { AssetIcon, MarkupCreate } from 'utilities';
import { GetLocalString } from './services/helper';
import { ComponentStyles, CreateShadowDom } from './elements';
import { ELEMENTS, VARIABLES } from './globals';

const { ICON_CLASS } = ELEMENTS;
const { ELEMENT_NAME, ATTRIBUTE_DAYS, ATTRIBUTE_ICON } = VARIABLES;

export class UMDAlertElement extends HTMLElement {
  _shadow: ShadowRoot;
  _container: HTMLDivElement | null = null;
  _defaultTime = 30;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_DAYS, ATTRIBUTE_ICON];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
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
