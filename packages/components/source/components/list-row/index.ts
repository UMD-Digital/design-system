declare global {
  interface Window {
    UMDListRowElement: typeof UMDListRowElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const { ELEMENT_NAME } = VARIABLES;

export class UMDListRowElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme: string;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._theme =
      this.getAttribute(VARIABLES.ATTRIBUTE_THEME) || VARIABLES.THEME_LIGHT;

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
    window.UMDListRowElement = UMDListRowElement;
    window.customElements.define(ELEMENT_NAME, UMDListRowElement);
  }
};
