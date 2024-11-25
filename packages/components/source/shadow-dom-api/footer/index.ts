declare global {
  interface Window {
    UMDFooterElement: typeof UMDFooterElement;
  }
}

import { MarkupCreate } from 'utilities';
import { Attributes } from 'shadow-dom-model';
import { ComponentStyles, CreateElement } from './elements';
import { VARIABLES } from './globals';

const { ELEMENT_NAME, THEME_OPTION_DARK, VERSION_TYPE_SIMPLE } = VARIABLES;

export class UMDFooterElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = THEME_OPTION_DARK;
  _type = VERSION_TYPE_SIMPLE;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
    this.style.display = 'block';
  }

  connectedCallback() {
    const element = this;
    element._type = this.getAttribute('type') || VERSION_TYPE_SIMPLE;
    element._theme = Attributes.isTheme.light({ element }) ? 'light' : 'dark';

    this._shadow.appendChild(CreateElement({ element }));
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFooterElement = UMDFooterElement;
    window.customElements.define(ELEMENT_NAME, UMDFooterElement);
  }
};

export default {
  Load,
};
