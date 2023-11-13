declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

export const ELEMENT_NAME = 'umd-element-card';
export type CardType = UMDCardElement;
export class UMDCardElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = 'light';
  _aligned = 'false';
  _border = 'false';

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const ElementStyles = require('./styles/component.css');
    const styles = `${ElementStyles.toString()}${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme', 'aligned', 'border'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  connectedCallback() {
    const element = this;
    element._theme = element.getAttribute('theme') || element._theme;
    element._aligned = element.getAttribute('aligned') || element._aligned;
    element._border = element.getAttribute('border') || element._border;

    const container = CreateShadowDom({ element });

    this._shadow.appendChild(container);
  }
}

export const GetDefaultStyles = () => require('./styles/site.css').toString();
export const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDCardElement = UMDCardElement;
    window.customElements.define(ELEMENT_NAME, UMDCardElement);

    return GetDefaultStyles();
  }
};
