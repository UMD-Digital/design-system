declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { CardBlock, CardList } from 'elements';
import { Styles, MarkupCreate } from 'utilities';
import { CheckForImageAlt } from 'utilities/ui';

const { SlotOberserver, SlotWithDefaultStyling, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-card';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_ALIGNED = 'aligned';
const ATTRIBUTE_BORDER = 'border';
const ATTRIBUTE_DISPLAY = 'display';
const THEME_LIGHT = 'light';
const DISPLAY_LIST = 'list';
const SLOTS = {
  IMAGE: 'image',
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  ACTIONS: 'actions',
};
const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${CardBlock.Styles}
  ${CardList.Styles}
`;

const GetImage = ({ element }: { element: UMDCardElement }) => {
  const { IMAGE } = element._slots;
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotWithDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

const CreateShadowDom = ({ element }: { element: UMDCardElement }) => {
  const { EYEBROW, HEADLINE, TEXT, ACTIONS } = element._slots;

  const alignmentAttr = element.getAttribute(ATTRIBUTE_ALIGNED);
  const borderAttr = element.getAttribute(ATTRIBUTE_BORDER);
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const isAligned = alignmentAttr === 'true';
  const isBordered = borderAttr === 'true';
  const isDisplayList =
    element.getAttribute(ATTRIBUTE_DISPLAY) === DISPLAY_LIST;

  if (isDisplayList) {
    return CardList.CreateElement({
      image: GetImage({ element }),
      eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
      headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
      text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
      actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
      theme,
    });
  }

  return CardBlock.CreateElement({
    image: GetImage({ element }),
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    theme,
    isAligned,
    isBordered,
  });
};

export class UMDCardElement extends HTMLElement {
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
    window.UMDCardElement = UMDCardElement;
    window.customElements.define(ELEMENT_NAME, UMDCardElement);
  }
};
