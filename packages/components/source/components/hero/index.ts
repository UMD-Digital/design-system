declare global {
  interface Window {
    UMDHeroElement: typeof UMDHeroElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

export const ELEMENT_NAME = 'umd-element-hero';
export type HeroType = UMDHeroElement;
export class UMDHeroElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = 'light';
  _type = 'default';

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme', 'type'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  connectedCallback() {
    const container = CreateShadowDom({ element: this });
    const type = this.getAttribute('type');
    const theme = this.getAttribute('theme');

    this._theme = theme || this._theme;
    this._type = type || this._type;

    this._shadow.appendChild(container);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeroElement = UMDHeroElement;
    window.customElements.define(ELEMENT_NAME, UMDHeroElement);
  }
};
