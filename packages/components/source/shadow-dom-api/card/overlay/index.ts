declare global {
  interface Window {
    UMDCardOverlayElement: typeof UMDCardOverlayElement;
  }
}

import { CardOverlay, CardOverlayImage } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { SlotWithDefaultStyling } = MarkupCreate;

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
}) => ({
  eyebrow: Slots.defined.eyebrow({ element }),
  headline: Slots.defined.headline({ element }),
  text: Slots.defined.text({ element }),
  date: SlotWithDefaultStyling({ element, slotRef: Slots.name.DATE }),
  actions: Slots.defined.actions({ element }),
  ctaIcon: SlotWithDefaultStyling({ element, slotRef: Slots.name.CTA_ICON }),
  isQuote: Attributes.isVisual.quote({ element }),
  isThemeDark: Attributes.isTheme.dark({ element }),
  isThemeLight: Attributes.isTheme.light({ element }),
});

const CreateShadowDom = ({ element }: { element: UMDCardOverlayElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (Attributes.isLayout.image({ element })) {
    const ImageOverlay = CardOverlayImage.CreateElement({
      ...MakeOverlayContent({ element }),
      image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
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
