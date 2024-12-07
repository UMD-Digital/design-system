declare global {
  interface Window {
    UMDCallToActionElement: typeof UMDCallToActionElement;
  }
}

import { MarkupCreate } from 'utilities';
import { Attributes } from 'model';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const {
  ELEMENT_NAME,
  TYPE_PRIMARY,
  SIZE_STANDARD,
  THEME_LIGHT,
  ATTRIBUTE_TYPE,
  ATTRIBUTE_SIZE,
  ATTRIBUTE_STYLE_PROPS,
} = VARIABLES;

export class UMDCallToActionElement extends HTMLElement {
  _shadow: ShadowRoot;
  _styleProps: null | string;
  _type = TYPE_PRIMARY;
  _size = SIZE_STANDARD;
  _isThemeLight = true;
  _isThemeDark = false;
  _isThemeGold = false;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._styleProps = null;

    const styles = `${ComponentStyles}`;
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_STYLE_PROPS];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name == ATTRIBUTE_STYLE_PROPS) {
      this._styleProps = newValue;
    }
  }

  connectedCallback() {
    const element = this;
    const styleAttrubutes = element.getAttribute(ATTRIBUTE_STYLE_PROPS);
    const isThemeDark = Attributes.isTheme.dark({ element });
    const isThemeGold = Attributes.isTheme.gold({ element });

    element._size = element.getAttribute(ATTRIBUTE_SIZE) || element._size;
    element._type = element.getAttribute(ATTRIBUTE_TYPE) || element._type;
    element._isThemeDark = isThemeDark;
    element._isThemeGold = isThemeGold;

    if (styleAttrubutes) {
      element._styleProps = styleAttrubutes;
    }

    this._shadow.appendChild(CreateShadowDom({ element }));
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCallToActionElement = UMDCallToActionElement;
    window.customElements.define(ELEMENT_NAME, UMDCallToActionElement);
  }
};

export default {
  Load,
};
