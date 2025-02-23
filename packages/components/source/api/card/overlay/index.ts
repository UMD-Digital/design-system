declare global {
  interface Window {
    UMDCardOverlayElement: typeof UMDCardOverlayElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;
const { SlotWithDefaultStyling } = Markup.create;
const { CardOverlay, CardOverlayImage } = Composite;

const ELEMENT_NAME = 'umd-element-card-overlay';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.reset}
  ${CardOverlay.Styles}
  ${CardOverlayImage.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const MakeOverlayContent = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => ({
  eyebrow: Slots.eyebrow.default({ element }),
  headline: Slots.headline.default({ element }),
  text: Slots.text.default({ element }),
  date: Slots.date.default({ element }),
  actions: Slots.actions.default({ element }),
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
      image: Markup.validate.ImageSlot({
        element,
        ImageSlot: Slots.name.assets.image,
      }),
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
