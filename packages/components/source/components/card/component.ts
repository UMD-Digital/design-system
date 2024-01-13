declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { MakeTemplate, SlotOberserver } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { SLOTS } from './globals';

export const ELEMENT_NAME = 'umd-element-card';
export type CardType = UMDCardElement;
export class UMDCardElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = 'light';
  _aligned = false;
  _border = false;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme', 'aligned', 'border'];
  }

  connectedCallback() {
    const element = this;
    const alignmentAttr = element.getAttribute('aligned');
    const borderAttr = element.getAttribute('border');

    element._theme = element.getAttribute('theme') || element._theme;
    element._aligned = alignmentAttr === 'true';
    element._border = borderAttr === 'true';

    const container = CreateShadowDom({ element });
    this._shadow.appendChild(container);

    SlotOberserver({
      element,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCardElement = UMDCardElement;
    window.customElements.define(ELEMENT_NAME, UMDCardElement);
  }

  return '';
};
