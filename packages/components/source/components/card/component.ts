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
