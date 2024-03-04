declare global {
  interface Window {
    UMDHeroElement: typeof UMDHeroElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const {
  THEME_WHITE,
  TYPE_DEFAULT_CENTERED,
  TYPE_DEFAULT,
  TEXT_ALIGN_LEFT,
  TEXT_ALIGN_CENTER,
  TYPE_STACKED_INTERIOR,
  TYPE_STACKED,
} = VARIABLES;

export const ELEMENT_NAME = 'umd-element-hero';
export type HeroType = UMDHeroElement;
export class UMDHeroElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = THEME_WHITE;
  _type = TYPE_DEFAULT;
  _textAlignment = TEXT_ALIGN_LEFT;
  _withLock = false;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const type = this.getAttribute('type');
    const theme = this.getAttribute('theme');

    this._theme = theme || this._theme;
    this._type = type || this._type;

    if (this._type === TYPE_DEFAULT_CENTERED) {
      this._type = TYPE_DEFAULT;
      this._textAlignment = TEXT_ALIGN_CENTER;
    }

    if (this._type === TYPE_STACKED_INTERIOR) {
      this._type = TYPE_STACKED;
      this._withLock = true;
    }

    this._shadow.appendChild(CreateShadowDom({ element: this }));
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
