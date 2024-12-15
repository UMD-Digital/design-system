declare global {
  interface Window {
    UMDHeroLogoElement: typeof UMDHeroLogoElement;
  }
}

import { Markup } from 'utilities';
import { ComponentStyles as styles, CreateShadowDom } from './display';

const ELEMENT_NAME = 'umd-element-hero-logo';
const template = Markup.create.Node.stylesTemplate({ styles });

export class UMDHeroLogoElement extends HTMLElement {
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
    window.UMDHeroLogoElement = UMDHeroLogoElement;
    window.customElements.define(ELEMENT_NAME, UMDHeroLogoElement);
  }
};

export default {
  Load,
};
