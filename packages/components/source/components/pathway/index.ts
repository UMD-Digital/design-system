declare global {
  interface Window {
    UMDPathwayElement: typeof UMDPathwayElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

export const ELEMENT_NAME = 'umd-element-pathway';
export type ELEMENT_TYPE = UMDPathwayElement;
export class UMDPathwayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _isImageFirst: boolean;
  _isImageScaled: boolean;
  _isThemeDark: boolean;
  _isHeroType: boolean;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._isImageFirst = true;
    this._isImageScaled = true;
    this._isThemeDark = false;
    this._isHeroType = false;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const isImageFirst = this.getAttribute('isImageFirst');
    const isImageScaled = this.getAttribute('isImageScaled');
    const isThemeDark = this.getAttribute('theme') === 'dark';
    const isHeroType = this.getAttribute('type') === 'hero';

    if (isImageFirst === 'false') this._isImageFirst = false;
    if (isImageScaled === 'false') this._isImageScaled = false;
    if (isThemeDark) this._isThemeDark = true;
    if (isHeroType) this._isHeroType = true;

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
