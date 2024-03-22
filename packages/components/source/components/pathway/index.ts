declare global {
  interface Window {
    UMDPathwayElement: typeof UMDPathwayElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const { ELEMENT_NAME, THEME_LIGHT, THEME_DARK, THEME_MARYLAND, THEME_WHITE } =
  VARIABLES;

export class UMDPathwayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _isImageFirst: boolean;
  _isImageScaled: boolean;
  _theme: string;
  _isHeroType: boolean;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._isImageFirst = true;
    this._isImageScaled = true;
    this._theme = THEME_WHITE;
    this._isHeroType = false;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const isImageFirst = this.getAttribute('isImageFirst');
    const isImageScaled = this.getAttribute('isImageScaled');
    const isHeroType = this.getAttribute('type') === 'hero';
    const theme = this.getAttribute('theme');

    if (isImageFirst === 'false') this._isImageFirst = false;
    if (isImageScaled === 'false') this._isImageScaled = false;
    if (isHeroType) this._isHeroType = true;
    if (theme) {
      if (theme === THEME_LIGHT) this._theme = THEME_LIGHT;
      if (theme === THEME_DARK) this._theme = THEME_DARK;
      if (theme === THEME_MARYLAND) this._theme = THEME_MARYLAND;
    }

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
