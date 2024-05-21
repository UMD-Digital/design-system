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

const styleTemplate = Node.stylesTemplate({ styles });

const MakeOverlayContent = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const { EYEBROW, HEADLINE, TEXT, ACTIONS, DATE, CTAICON } = SLOTS;

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

const CreateShadowDom = ({ element }: { element: UMDCardOverlayElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const type = element.getAttribute(ATTRIBUTE_TYPE);

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (type === TYPE_IMAGE) {
    const ImageOverlay = CardOverlayImage.CreateElement({
      ...MakeOverlayContent({ element }),
      image: MarkupValidate.ImageSlot({ element, ImageSlot: SLOTS.IMAGE }),
    });

    if (ImageOverlay) {
      shadow.appendChild(ImageOverlay);
      return;
    }
  }

  shadow.appendChild(
    CardOverlay.CreateElement({ ...MakeOverlayContent({ element }) }),
  );
};

export class UMDCardOverlayElement extends HTMLElement {
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
    window.UMDCardOverlayElement = UMDCardOverlayElement;
    window.customElements.define(ELEMENT_NAME, UMDCardOverlayElement);
  }
};
