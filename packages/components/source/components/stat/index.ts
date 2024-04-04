declare global {
  interface Window {
    UMDStatElement: typeof UMDStatElement;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const {
  ELEMENT_NAME,
  ATTRIBUTE_TYPE,
  ATTRIBUTE_THEME,
  ATTRIBUTE_SIZE,
  ATTRIBUTE_HAS_LINE,
  THEME_LIGHT,
  TYPE_DEFAULT,
  SIZE_DEFAULT,
} = VARIABLES;

export class UMDStatElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme: string;
  _type: string;
  _size: string;
  _hasLine: boolean;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._type = this.getAttribute(ATTRIBUTE_TYPE) || TYPE_DEFAULT;
    this._theme = this.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
    this._size = this.getAttribute(ATTRIBUTE_SIZE) || SIZE_DEFAULT;
    this._hasLine = this.hasAttribute(ATTRIBUTE_HAS_LINE);

    const styles = `${ComponentStyles}`;
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDStatElement = UMDStatElement;
    window.customElements.define(ELEMENT_NAME, UMDStatElement);
  }
};
