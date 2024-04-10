declare global {
  interface Window {
    UMDHeaderElement: typeof UMDHeaderElement;
  }
}

import { MarkupCreate } from 'utilities';
import { styles, CreateShadowDom } from './display';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-header';
const SLOTS = {
  LOGO: 'logo',
  NAVIGATION: 'navigation',
  UTILITY: 'utility',
  PRIMARY_SLIDE_LINKS: 'primary-slide-links',
  PRIMARY_SLIDE_SECONDARY_LINKS: 'primary-slide-secondary-links',
  PRIMARY_SLIDE_CONTENT: 'primary-slide-content',
  CHILDREN_SLIDES: 'children-slides',
};

export class UMDHeaderElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const { _shadow } = element;
    const shadowElement = CreateShadowDom({ element });

    if (!shadowElement) return;
    _shadow.appendChild(shadowElement);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeaderElement = UMDHeaderElement;
    window.customElements.define(ELEMENT_NAME, UMDHeaderElement);
  }
};
