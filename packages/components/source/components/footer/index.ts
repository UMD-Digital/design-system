import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateElement } from './components';
import {
  THEME_OPTION_DARK,
  VERSION_TYPE_SIMPLE,
  VERSION_TYPES,
} from './variables';

export const ELEMENT_FOOTER_NAME = 'umd-element-footer';

export class UMDFooterElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const ElementStyles = require('./index.css');
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
    const type = this.getAttribute('type') || VERSION_TYPE_SIMPLE;
    const theme = this.getAttribute('theme') || THEME_OPTION_DARK;
    const wrapper = CreateElement({ element, type, theme });

    if (VERSION_TYPES.indexOf(type) === -1) {
      const message = `UMDFooterElement: Invalid type attribute. Must be one of ${VERSION_TYPES.join(
        ',',
      )}. Refer to documenation for more information.`;
      throw new Error(message);
    }

    this._shadow.appendChild(wrapper);
  }
}

if (!window.customElements.get(ELEMENT_FOOTER_NAME)) {
  window.UMDFooterElement = UMDFooterElement;
  window.customElements.define(ELEMENT_FOOTER_NAME, UMDFooterElement);
}
