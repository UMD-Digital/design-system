declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { CardBlock, CardList } from 'elements';
import { MarkupCreate, MarkupValidate, Styles, WebComponents } from 'utilities';

const { Node, SlotWithDefaultStyling } = MarkupCreate;
const { Attributes, AttributesValues, Slots } = WebComponents;

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
  const theme =
    element.getAttribute(Attributes.THEME) || AttributesValues.THEME_LIGHT;
  const isTransparent =
    element.getAttribute(Attributes.VISUAL_TRANSPARENT) === 'true';

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
    eyebrow: SlotWithDefaultStyling({ element, slotRef: Slots.EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: Slots.HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: Slots.TEXT }),
    actions: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
    theme,
    isTransparent,
  };
};

const CreateShadowDom = ({ element }: { element: UMDCardElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const alignmentAttr = element.getAttribute(Attributes.VISUAL_ALIGN);
  const borderAttr = element.getAttribute(Attributes.VISUAL_BORDER);

  const isAligned = alignmentAttr === 'true';
  const isBordered = borderAttr === 'true';
  const isDisplayList =
    element.getAttribute(Attributes.VISUAL_DISPLAY) ===
    AttributesValues.DISPLAY_LIST;

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
