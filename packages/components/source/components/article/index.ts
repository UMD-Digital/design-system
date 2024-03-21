declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { MakeTemplate, SlotOberserver } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { SLOTS, VARIABLES } from './globals';

const {
  ELEMENT_NAME,
  THEME_LIGHT,
  ATTRIBUTE_BORDER,
  ATTRIBUTE_ALIGNED,
  ATTRIBUTE_THEME,
} = VARIABLES;

export class UMDCardElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme: string;
  _aligned: boolean;
  _border: boolean;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._theme = THEME_LIGHT;
    this._aligned = false;
    this._border = false;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_THEME, ATTRIBUTE_ALIGNED, ATTRIBUTE_BORDER];
  }

  connectedCallback() {
    const element = this;
    const alignmentAttr = element.getAttribute(ATTRIBUTE_ALIGNED);
    const borderAttr = element.getAttribute(ATTRIBUTE_BORDER);

    element._theme = element.getAttribute(ATTRIBUTE_THEME) || element._theme;
    element._aligned = alignmentAttr === 'true';
    element._border = borderAttr === 'true';

    const container = CreateShadowDom({ element });
    this._shadow.appendChild(container);

    SlotOberserver({
      element,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCardElement = UMDCardElement;
    window.customElements.define(ELEMENT_NAME, UMDCardElement);
  }
};
