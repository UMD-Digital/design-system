declare global {
  interface Window {
    UMDLogoElement: typeof UMDLogoElement;
  }
}

import { Components } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { LogoBlock } = Components;

const ELEMENT_NAME = 'umd-element-logo';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${LogoBlock.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDLogoElement }) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const borderAttr = element.getAttribute(Attributes.names.VISUAL_BORDER);

  const isBordered = borderAttr === 'true';

  return LogoBlock.CreateElement({
    image: MarkupValidate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }),
    text: Slots.text.default({ element }),
    isThemeDark,
    isBordered,
  });
};

class UMDLogoElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const shadowDom = this._shadow;
    const imageElement = CreateShadowDom({ element });

    if (imageElement) shadowDom.appendChild(imageElement);
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDLogoElement = UMDLogoElement;
    window.customElements.define(ELEMENT_NAME, UMDLogoElement);
  }
};

export default {
  Load,
};
