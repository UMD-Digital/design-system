declare global {
  interface Window {
    UMDExampleElement: typeof UMDExampleElement;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const { Node } = MarkupCreate;
const { ELEMENT_NAME } = VARIABLES;

export class UMDExampleElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const container = CreateShadowDom({ element: this });

    this._shadow.appendChild(container);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDExampleElement = UMDExampleElement;
    window.customElements.define(ELEMENT_NAME, UMDExampleElement);
  }
};
