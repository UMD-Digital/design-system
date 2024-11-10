declare global {
  interface Window {
    UMDCardOverlayElement: typeof UMDCardOverlayElement;
  }
}

import { CardOverlay, CardOverlayImage } from 'elements';
import { MarkupCreate, MarkupValidate, Styles, WebComponents } from 'utilities';

const { Node } = MarkupCreate;
const { SlotWithDefaultStyling } = MarkupCreate;
const { Attributes, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-card-overlay';

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
  const theme =
    element.getAttribute(Attributes.THEME) || AttributesValues.THEME_LIGHT;
  const isQuote =
    element.getAttribute(Attributes.TYPE_QUOTE) === AttributesValues.STATE_TRUE;

  return {
    eyebrow: SlotWithDefaultStyling({ element, slotRef: Slots.EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: Slots.HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: Slots.TEXT }),
    date: SlotWithDefaultStyling({ element, slotRef: Slots.DATE }),
    actions: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
    ctaIcon: SlotWithDefaultStyling({ element, slotRef: Slots.CTA_ICON }),
    isQuote,
    theme,
  };
};

const CreateShadowDom = ({ element }: { element: UMDCardOverlayElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const type = element.getAttribute(Attributes.TYPE);

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (type === AttributesValues.DISPLAY_IMAGE) {
    const ImageOverlay = CardOverlayImage.CreateElement({
      ...MakeOverlayContent({ element }),
      image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.IMAGE }),
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

class UMDCardOverlayElement extends HTMLElement {
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
    window.UMDCardOverlayElement = UMDCardOverlayElement;
    window.customElements.define(ELEMENT_NAME, UMDCardOverlayElement);
  }
};

export default {
  Load,
};
