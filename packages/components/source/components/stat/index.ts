declare global {
  interface Window {
    UMDStatElement: typeof UMDStatElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const {
  ELEMENT_NAME,
  ATTRIBUTE_TYPE,
  ATTRIBUTE_THEME,
  THEME_LIGHT,
  TYPE_DEFAULT,
} = VARIABLES;

export class UMDStatElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme: string;
  _type: string;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._type = this.getAttribute(ATTRIBUTE_TYPE) || TYPE_DEFAULT;
    this._theme = this.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

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
