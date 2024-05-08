declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { CardBlock, CardList } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';
import { Tokens } from '@universityofmaryland/variables';

const { SlotOberserver, SlotWithDefaultStyling, Node } = MarkupCreate;

const { Colors } = Tokens;
const ELEMENT_NAME = 'umd-element-card';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_ALIGNED = 'aligned';
const ATTRIBUTE_BORDER = 'border';
const ATTRIBUTE_DISPLAY = 'display';
const THEME_LIGHT = 'light';
const DISPLAY_LIST = 'list';

const ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER = 'text-lockup-small-container';
const ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE = 'text-lockup-small-headline';
const THEME_DARK = 'dark';
const IS_DARK_THEME = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

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
  .${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER} .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE},
  .${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER} .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} * {
    color: ${Colors.black};
  }

  .${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER}${IS_DARK_THEME} .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE},
  .${ELEMENT_TEXT_LOCKUP_SMALL_CONTAINER}${IS_DARK_THEME} .${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE} * {
    color: ${Colors.white};
  }
  
  ${Styles.ResetString}
  ${CardBlock.Styles}
  ${CardList.Styles}
`;

const MakeCardData = ({ element }: { element: UMDCardElement }) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const { EYEBROW, HEADLINE, TEXT, ACTIONS, IMAGE } = element._slots;

  return {
    image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    theme,
  };
};

const CreateShadowDom = ({ element }: { element: UMDCardElement }) => {
  const alignmentAttr = element.getAttribute(ATTRIBUTE_ALIGNED);
  const borderAttr = element.getAttribute(ATTRIBUTE_BORDER);

  const isAligned = alignmentAttr === 'true';
  const isBordered = borderAttr === 'true';
  const isDisplayList =
    element.getAttribute(ATTRIBUTE_DISPLAY) === DISPLAY_LIST;

  if (isDisplayList) {
    return CardList.CreateElement(MakeCardData({ element }));
  }

  return CardBlock.CreateElement({
    ...MakeCardData({ element }),
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
