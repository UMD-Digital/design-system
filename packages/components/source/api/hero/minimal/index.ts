declare global {
  interface Window {
    UMDHeroMinimalElement: typeof UMDHeroMinimalElement;
  }
}

import { Markup } from 'utilities';
import { ComponentStyles as styles, CreateShadowDom } from './display';

const ELEMENT_NAME = 'umd-element-hero-minimal';
const template = Markup.create.Node.stylesTemplate({ styles });

export class UMDHeroMinimalElement extends HTMLElement {
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
    window.UMDHeroMinimalElement = UMDHeroMinimalElement;
    window.customElements.define(ELEMENT_NAME, UMDHeroMinimalElement);
  }
};

export default {
  Load,
};
