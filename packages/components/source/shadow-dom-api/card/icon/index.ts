declare global {
  interface Window {
    UMDCardIconElement: typeof UMDCardIconElement;
  }
}

import { CardIconBlock } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-card-icon';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${CardIconBlock.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const MakeCardData = ({ element }: { element: UMDCardIconElement }) => ({
  image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
  headline: Slots.SlottedHeadline({ element }),
  text: Slots.SlottedText({ element }),
  isThemeDark: Attributes.isThemeDark({ element }),
});

const CreateShadowDom = ({ element }: { element: UMDCardIconElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const card = CardIconBlock.CreateElement({
    ...MakeCardData({ element }),
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(card);
};

class UMDCardIconElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCardIconElement = UMDCardIconElement;
    window.customElements.define(ELEMENT_NAME, UMDCardIconElement);
  }
};

export default {
  Load,
};
