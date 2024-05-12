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

const MakeCardData = ({ element }: { element: UMDCardIconElement }) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const { HEADLINE, TEXT, IMAGE } = element._slots;

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    theme,
  };
};

const CreateShadowDom = ({ element }: { element: UMDCardIconElement }) =>
  CardIconBlock.CreateElement({
    ...MakeCardData({ element }),
  });

export class UMDCardIconElement extends HTMLElement {
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

    shadowDom.appendChild(CreateShadowDom({ element }));

    SlotOberserver({
      element,
      shadowDom,
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
