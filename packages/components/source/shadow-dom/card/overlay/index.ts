declare global {
  interface Window {
    UMDCardOverlayElement: typeof UMDCardOverlayElement;
  }
}

import { CardOverlay, CardOverlayImage } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { SlotOberserver, Node } = MarkupCreate;
const { SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-card-overlay';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const THEME_LIGHT = 'light';
const TYPE_IMAGE = 'image';

const SLOTS = {
  IMAGE: 'image',
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  ACTIONS: 'actions',
  CTAICON: 'cta-icon',
  DATE: 'date',
};

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${CardOverlay.Styles}
  ${CardOverlayImage.Styles}
`;

const MakeOverlayContent = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const { EYEBROW, HEADLINE, TEXT, ACTIONS, DATE, CTAICON } = element._slots;

  return {
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    date: SlotWithDefaultStyling({ element, slotRef: DATE }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    ctaIcon: SlotWithDefaultStyling({ element, slotRef: CTAICON }),
    theme,
  };
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  const { IMAGE } = element._slots;
  const type = element.getAttribute(ATTRIBUTE_TYPE);

  if (type === TYPE_IMAGE) {
    const ImageOverlay = CardOverlayImage.CreateElement({
      ...MakeOverlayContent({ element }),
      image: MarkupValidate.ImageSlot({ element, ImageSlot: IMAGE }),
    });

    if (ImageOverlay) return ImageOverlay;
  }

  return CardOverlay.CreateElement({ ...MakeOverlayContent({ element }) });
};

export class UMDCardOverlayElement extends HTMLElement {
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
    window.UMDCardOverlayElement = UMDCardOverlayElement;
    window.customElements.define(ELEMENT_NAME, UMDCardOverlayElement);
  }
};
