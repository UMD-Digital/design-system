import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateElement } from './elements';
import { THEME_OPTION_DARK, VERSION_TYPE_SIMPLE } from './variables';

export const ELEMENT_NAME = 'umd-element-footer';

export const GetDefaultStyles = () => require('./default.css').toString();

export class UMDFooterElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = THEME_OPTION_DARK;
  _type = VERSION_TYPE_SIMPLE;

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
    element._type = this.getAttribute('type') || VERSION_TYPE_SIMPLE;
    element._theme = this.getAttribute('theme') || THEME_OPTION_DARK;

    this._shadow.appendChild(CreateElement({ element }));
  }
}
