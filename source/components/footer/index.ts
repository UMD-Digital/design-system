import { ComponentStyles, CreateElement } from './components';
import {
  THEME_OPTION_DARK,
  VERSION_TYPE_SIMPLE,
  VERSION_TYPES,
} from './variables';

export const ELEMENT_NAME = 'umd-element-footer';
const STYLE_FILE_CDN =
  'https://unpkg.com/@universityofmaryland/umd-element-footer/dist/styles.css';

const LoadTemplate = async () => {
  const template = document.createElement('template');
  const resp = await fetch(STYLE_FILE_CDN).catch((err) => {
    throw new Error(
      `UMDFooterElement: Failed to load style file from CDN. ${err}`,
    );
  });
  const configCss = await resp.text();

  template.innerHTML = `<style>${configCss}${ComponentStyles}</style>`;

  return template;
};

export class UMDFooterElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const load = async () => {
      const template = await LoadTemplate();
      this._shadow.appendChild(template.content.cloneNode(true));
      this.style.display = 'block';
    };

    load();
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

if (!window.customElements.get(ELEMENT_NAME)) {
  // @ts-ignore
  window.UMDFooterElement = UMDFooterElement;
  window.customElements.define(ELEMENT_NAME, UMDFooterElement);
}
