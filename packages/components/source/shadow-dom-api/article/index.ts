declare global {
  interface Window {
    UMDArticleElement: typeof UMDArticleElement;
  }
}

import { CardBlock, CardList } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-article';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${CardBlock.Styles}
  ${CardList.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const MakeArticleData = ({ element }: { element: HTMLElement }) => {
  const isThemeDark = Attributes.isThemeDark({
    element,
  });
  const isTransparent = Attributes.isTransparent({ element });

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
    eyebrow: Slots.SlottedEyebrow({ element }),
    headline: Slots.SlottedHeadline({ element }),
    text: Slots.SlottedText({ element }),
    date: Slots.SlottedDate({ element }),
    actions: Slots.SlottedActions({ element }),
    isThemeDark,
    isTransparent,
  };
};

const CreateShadowDom = ({ element }: { element: UMDArticleElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isAligned = Attributes.isVisuallyAligned({ element });
  const isBordered = Attributes.isVisuallyBordered({ element });
  const isDisplayList = Attributes.isDisplayList({ element });

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (isDisplayList) {
    shadow.appendChild(
      CardList.CreateElement({ ...MakeArticleData({ element }), isAligned }),
    );
    return;
  }

  shadow.appendChild(
    CardBlock.CreateElement({
      ...MakeArticleData({ element }),
      isAligned,
      isBordered,
    }),
  );
};

class UMDArticleElement extends HTMLElement {
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
    window.UMDArticleElement = UMDArticleElement;
    window.customElements.define(ELEMENT_NAME, UMDArticleElement);
  }
};

export default {
  Load,
};
