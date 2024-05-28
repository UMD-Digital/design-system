declare global {
  interface Window {
    UMDHeroElement: typeof UMDHeroElement;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles as styles, CreateShadowDom } from './display';
import { SLOTS as CommonSlots } from '../common';

const { SlotOberserver } = MarkupCreate;

const template = MarkupCreate.Node.stylesTemplate({ styles });

const ELEMENT_NAME = 'umd-element-hero';
const SLOTS = {
  VIDEO: 'video',
  ...CommonSlots,
};

export class UMDHeroElement extends HTMLElement {
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

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeroElement = UMDHeroElement;
    window.customElements.define(ELEMENT_NAME, UMDHeroElement);
  }
};
