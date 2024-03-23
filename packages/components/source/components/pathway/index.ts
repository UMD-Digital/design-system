declare global {
  interface Window {
    UMDPathwayElement: typeof UMDPathwayElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

const ELEMENT_NAME = 'umd-element-pathway';

export class UMDPathwayElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const container = CreateShadowDom({ element: this });
    if (container) this._shadow.appendChild(container);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPathwayElement = UMDPathwayElement;
    window.customElements.define(ELEMENT_NAME, UMDPathwayElement);
  }
};
