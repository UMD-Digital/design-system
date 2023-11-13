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

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const ElementStyles = require('./styles/component.css');
    const styles = `${ElementStyles.toString()}${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  connectedCallback() {
    const element = this;

    const container = CreateShadowDom({ element });

    console.log('called');

    this._shadow.appendChild(container);
  }
}

export const GetDefaultStyles = () => require('./styles/site.css').toString();
export const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    window.UMDCardOverlayElement = UMDCardOverlayElement;
    window.customElements.define(ELEMENT_NAME, UMDCardOverlayElement);

    return GetDefaultStyles();
  }
};
