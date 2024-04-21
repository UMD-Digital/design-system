declare global {
  interface Window {
    UMDLogoElement: typeof UMDLogoElement;
  }
}

import { LogoBlock } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { SlotOberserver, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-logo';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_BORDER = 'border';
const THEME_LIGHT = 'light';
const SLOTS = {
  IMAGE: 'image',
};

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${LogoBlock.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDLogoElement }) => {
  const { IMAGE } = element._slots;
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const borderAttr = element.getAttribute(ATTRIBUTE_BORDER);

  const isBordered = borderAttr === 'true';

  return LogoBlock.CreateElement({
    image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
    theme,
    isBordered,
  });
};

export class UMDLogoElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const shadowDom = this._shadow;
    const imageElement = CreateShadowDom({ element });

    if (imageElement) shadowDom.appendChild(imageElement);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDLogoElement = UMDLogoElement;
    window.customElements.define(ELEMENT_NAME, UMDLogoElement);
  }
};
