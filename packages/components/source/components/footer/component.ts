declare global {
  interface Window {
    UMDFooterElement: typeof UMDFooterElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateElement } from './elements';
import { VARIABLES } from './globals';

export const ELEMENT_NAME = 'umd-element-footer';
export type ELEMENT_TYPE = UMDFooterElement;
export class UMDFooterElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = VARIABLES.THEME_OPTION_DARK;
  _type = VARIABLES.VERSION_TYPE_SIMPLE;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const ElementStyles = require('./styles/component.css');
    const styles = `${ElementStyles.toString()}${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
    this.style.display = 'block';
  }

  static get observedAttributes() {
    return ['type', 'theme'];
  }

  connectedCallback() {
    const element = this;
    element._type = this.getAttribute('type') || VARIABLES.VERSION_TYPE_SIMPLE;
    element._theme = this.getAttribute('theme') || VARIABLES.THEME_OPTION_DARK;

    this._shadow.appendChild(CreateElement({ element }));
  }
}

export const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    const GetDefaultStyles = () => require('./styles/site.css').toString();

    window.UMDFooterElement = UMDFooterElement;
    window.customElements.define(ELEMENT_NAME, UMDFooterElement);

    return GetDefaultStyles();
  }
};
