declare global {
  interface Window {
    UMDCallToActionElement: typeof UMDCallToActionElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

export const ELEMENT_NAME = 'umd-element-call-to-action';
export type CallToActionType = UMDCallToActionElement;
export class UMDCallToActionElement extends HTMLElement {
  _shadow: ShadowRoot;
  _styleProps: null | string;
  _type = 'primary';
  _size = 'standard';
  _theme = 'light';

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._styleProps = null;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['styleProps'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name == 'style') {
      this._styleProps = newValue;
    }
  }

  connectedCallback() {
    const element = this;
    const styleAttrubutes = element.getAttribute('styleProps');

    element._size = element.getAttribute('size') || element._size;
    element._type = element.getAttribute('type') || element._type;
    element._theme = element.getAttribute('theme') || element._theme;

    if (styleAttrubutes) {
      element._styleProps = styleAttrubutes;
    }

    const container = CreateShadowDom({ element });

    if (!container) return;
    this._shadow.appendChild(container);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCallToActionElement = UMDCallToActionElement;
    window.customElements.define(ELEMENT_NAME, UMDCallToActionElement);
  }
};
