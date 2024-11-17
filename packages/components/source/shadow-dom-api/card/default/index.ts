declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { CardBlock, CardList } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-card';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${CardBlock.Styles}
  ${CardList.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const MakeCardData = ({ element }: { element: UMDCardElement }) => {
  const isThemeDark = Attributes.isThemeDark({
    element,
  });
  const isTransparent = Attributes.isTransparent({ element });

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
    eyebrow: Slots.SlottedEyebrow({ element }),
    headline: Slots.SlottedHeadline({ element }),
    text: Slots.SlottedText({ element }),
    actions: Slots.SlottedActions({ element }),
    isThemeDark,
    isTransparent,
  };
};

const CreateShadowDom = ({ element }: { element: UMDCardElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isAligned = Attributes.isVisuallyAligned({ element });
  const isBordered = Attributes.isVisuallyBordered({ element });
  const isDisplayList = Attributes.isDisplayList({ element });

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (isDisplayList) {
    shadow.appendChild(
      CardList.CreateElement({ ...MakeCardData({ element }), isAligned }),
    );
    return;
  }

  shadow.appendChild(
    CardBlock.CreateElement({
      ...MakeCardData({ element }),
      isAligned,
      isBordered,
    }),
  );
};

class UMDCardElement extends HTMLElement {
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
    window.UMDCardElement = UMDCardElement;
    window.customElements.define(ELEMENT_NAME, UMDCardElement);
  }
};

export default {
  Load,
};
