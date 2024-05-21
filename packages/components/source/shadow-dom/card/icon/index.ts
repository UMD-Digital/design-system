declare global {
  interface Window {
    UMDCardIconElement: typeof UMDCardIconElement;
  }
}

import { CardIconBlock } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { SlotOberserver, SlotWithDefaultStyling, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-card-icon';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const SLOTS = {
  IMAGE: 'image',
  HEADLINE: 'headline',
  TEXT: 'text',
};
const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${CardIconBlock.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const MakeCardData = ({ element }: { element: UMDCardIconElement }) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const { HEADLINE, TEXT, IMAGE } = SLOTS;

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    theme,
  };
};

const CreateShadowDom = ({ element }: { element: UMDCardIconElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const card = CardIconBlock.CreateElement({
    ...MakeCardData({ element }),
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(card);
};

export class UMDCardIconElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });

    SlotOberserver({
      element: this,
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
    window.UMDCardIconElement = UMDCardIconElement;
    window.customElements.define(ELEMENT_NAME, UMDCardIconElement);
  }
};
