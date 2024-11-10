declare global {
  interface Window {
    UMDHeroElement: typeof UMDHeroElement;
  }
}

import { MarkupCreate, WebComponents } from 'utilities';
import { ComponentStyles as styles, CreateShadowDom } from './display';

const template = MarkupCreate.Node.stylesTemplate({ styles });

const ELEMENT_NAME = 'umd-element-hero';

export class UMDHeroElement extends HTMLElement {
  _shadow: ShadowRoot;
  _styles: HTMLTemplateElement;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._styles = template;
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeroElement = UMDHeroElement;
    window.customElements.define(ELEMENT_NAME, UMDHeroElement);
  }
};

export default {
  Load,
};
