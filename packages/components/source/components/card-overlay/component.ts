declare global {
  interface Window {
    UMDCardOverlayElement: typeof UMDCardOverlayElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

export const ELEMENT_NAME = 'umd-element-card-overlay';
export type CardType = UMDCardOverlayElement;
export class UMDCardOverlayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = 'light';

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const elementStyles = require('./styles/shadow-dom.css');
    const styles = `${elementStyles.toString()}${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  connectedCallback() {
    const element = this;
    element._theme = element.getAttribute('theme') || element._theme;

    const container = CreateShadowDom({ element });

    this._shadow.appendChild(container);
  }
}

export const GetDefaultStyles = () =>
  require('./styles/light-dom.css').toString();
export const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDCardOverlayElement = UMDCardOverlayElement;
    window.customElements.define(ELEMENT_NAME, UMDCardOverlayElement);

    return GetDefaultStyles();
  }
};
