declare global {
  interface Window {
    UMDCardOverlayElement: typeof UMDCardOverlayElement;
  }
}

import { MakeTemplate, SlotOberserver } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { ELEMENTS, SLOTS } from './globals';

export const ELEMENT_NAME = 'umd-element-card-overlay';
export type CardType = UMDCardOverlayElement;
export class UMDCardOverlayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = 'light';

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme'];
  }

  connectedCallback() {
    const element = this;
    element._theme = element.getAttribute('theme') || element._theme;

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
    window.UMDCardOverlayElement = UMDCardOverlayElement;
    window.customElements.define(ELEMENT_NAME, UMDCardOverlayElement);

    return require('./styles/light-dom.css').toString();
  }

  return '';
};
