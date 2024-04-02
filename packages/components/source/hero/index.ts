declare global {
  interface Window {
    UMDHeroElement: typeof UMDHeroElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './display';

const ELEMENT_NAME = 'umd-element-hero';
const SLOTS = {
  IMAGE: 'image',
  VIDEO: 'video',
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  ACTIONS: 'actions',
};

export class UMDHeroElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const UI = CreateShadowDom({ element: this });

    if (UI) {
      this._shadow.appendChild(UI);
    }
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
