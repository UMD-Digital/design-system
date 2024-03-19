declare global {
  interface Window {
    UMDListRowPersonElement: typeof UMDListRowPersonElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const { ELEMENT_NAME, ATTRIBUTE_THEME, THEME_LIGHT } = VARIABLES;

export class UMDListRowPersonElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme: string;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
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
    window.UMDListRowPersonElement = UMDListRowPersonElement;
    window.customElements.define(ELEMENT_NAME, UMDListRowPersonElement);
  }
};
