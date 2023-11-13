declare global {
  interface Window {
    UMDExampleElement: typeof UMDExampleElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

export const ELEMENT_NAME = 'umd-element-example';
export type ExampleType = UMDExampleElement;
export class UMDExampleElement extends HTMLElement {
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
    const container = CreateShadowDom({ element: this });

    this._shadow.appendChild(container);
  }
}

export const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    const GetDefaultStyles = () => require('./styles/site.css').toString();

    window.UMDExampleElement = UMDExampleElement;
    window.customElements.define(ELEMENT_NAME, UMDExampleElement);

    return GetDefaultStyles();
  }
};
