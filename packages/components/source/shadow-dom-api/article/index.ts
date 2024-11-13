declare global {
  interface Window {
    UMDArticleElement: typeof UMDArticleElement;
  }
}

import { CardBlock, CardList } from 'elements';
import { AttributesNames, AttributesValues, Slots } from 'shadow-dom-model';
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
  const theme =
    element.getAttribute(AttributesNames.THEME) || AttributesValues.THEME_LIGHT;
  const isTransparent =
    element.getAttribute(AttributesNames.VISUAL_TRANSPARENT) === 'true';

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
    eyebrow: Slots.SlottedEyebrow({ element }),
    headline: Slots.SlottedHeadline({ element }),
    text: Slots.SlottedText({ element }),
    date: Slots.SlottedDate({ element }),
    actions: Slots.SlottedActions({ element }),
    theme,
    isTransparent,
  };
};

const CreateShadowDom = ({ element }: { element: UMDArticleElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const alignmentAttr = element.getAttribute(AttributesNames.VISUAL_ALIGN);
  const borderAttr = element.getAttribute(AttributesNames.VISUAL_BORDER);
  const isAligned = alignmentAttr === 'true';
  const isBordered = borderAttr === 'true';
  const isDisplayList =
    element.getAttribute(AttributesNames.VISUAL_DISPLAY) ===
    AttributesValues.DISPLAY_LIST;

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
