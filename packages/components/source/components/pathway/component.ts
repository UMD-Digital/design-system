declare global {
  interface Window {
    UMDPathwayElement: typeof UMDPathwayElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

export const ELEMENT_NAME = 'umd-element-pathway';
export type ELEMENT_TYPE = UMDPathwayElement;
export class UMDPathwayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _isImageFirst: boolean;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._isImageFirst = true;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['isImageFirst'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  connectedCallback() {
    const isImageFirst = this.getAttribute('isImageFirst');

    if (isImageFirst === 'false') this._isImageFirst = false;

    const container = CreateShadowDom({ element: this });
    this._shadow.appendChild(container);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPathwayElement = UMDPathwayElement;
    window.customElements.define(ELEMENT_NAME, UMDPathwayElement);
  }
};
