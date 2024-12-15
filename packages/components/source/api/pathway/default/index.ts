declare global {
  interface Window {
    UMDPathwayElement: typeof UMDPathwayElement;
  }
}

import { Markup } from 'utilities';
import { ComponentStyles, CreateShadowDom } from './display';

const ELEMENT_NAME = 'umd-element-pathway';

export class UMDPathwayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _styles: HTMLTemplateElement;

  constructor() {
    const styleTemplate = Markup.create.Node.stylesTemplate({
      styles: `${ComponentStyles}`,
    });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._styles = styleTemplate;
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPathwayElement = UMDPathwayElement;
    window.customElements.define(ELEMENT_NAME, UMDPathwayElement);
  }
};

export default {
  Load,
};
