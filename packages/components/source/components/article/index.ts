declare global {
  interface Window {
    UMDArticleElement: typeof UMDArticleElement;
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
  ATTRIBUTE_DISPLAY,
  DISPLAY_BLOCK,
  DISPLAY_LIST,
} = VARIABLES;

export class UMDArticleElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme: string;
  _display: string;
  _aligned: boolean;
  _border: boolean;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._theme = THEME_LIGHT;
    this._display = DISPLAY_BLOCK;
    this._aligned = false;
    this._border = false;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const alignmentAttr = element.getAttribute(ATTRIBUTE_ALIGNED);
    const borderAttr = element.getAttribute(ATTRIBUTE_BORDER);
    const displayAttr = element.getAttribute(ATTRIBUTE_DISPLAY);

    element._theme = element.getAttribute(ATTRIBUTE_THEME) || element._theme;
    element._aligned = alignmentAttr === 'true';
    element._border = borderAttr === 'true';

    if (displayAttr === DISPLAY_LIST) element._display = DISPLAY_LIST;

    this._shadow.appendChild(CreateShadowDom({ element }));

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
    window.UMDArticleElement = UMDArticleElement;
    window.customElements.define(ELEMENT_NAME, UMDArticleElement);
  }
};
