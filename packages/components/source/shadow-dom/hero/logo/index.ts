declare global {
  interface Window {
    UMDHeroLogoElement: typeof UMDHeroLogoElement;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles as styles, CreateShadowDom } from './display';
import { SLOTS } from '../common';

const { SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-hero-logo';
const template = MarkupCreate.Node.stylesTemplate({ styles });

export class UMDHeroLogoElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;
  _styles: HTMLTemplateElement;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._styles = template;
  }

  connectedCallback() {
    CreateShadowDom({ element: this });

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeroLogoElement = UMDHeroLogoElement;
    window.customElements.define(ELEMENT_NAME, UMDHeroLogoElement);
  }
};

export default {
  Load,
};
