declare global {
  interface Window {
    UMDCardOverlayElement: typeof UMDCardOverlayElement;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles, CreateShadowDom } from './elements';
import { SLOTS, VARIABLES } from './globals';

const { SlotOberserver, Node } = MarkupCreate;

const { THEME_LIGHT, ELEMENT_NAME } = VARIABLES;

export class UMDCardOverlayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme: string;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._theme = this.getAttribute('theme') || THEME_LIGHT;

    const styles = `${ComponentStyles}`;
    const template = Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const shadowDom = this._shadow;

    shadowDom.appendChild(CreateShadowDom({ element }));

    SlotOberserver({
      element,
      shadowDom,
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
  }
};
