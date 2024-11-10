declare global {
  interface Window {
    UMDBannerPromoElement: typeof UMDBannerPromoElement;
  }
}

import { MarkupCreate, Styles, WebComponents } from 'utilities';
import { BannerPromo } from 'elements';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Attributes, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-banner-promo';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${BannerPromo.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });
const CreateShadowDom = ({ element }: { element: UMDBannerPromoElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const hasLogo = element.getAttribute(Attributes.VISUAL_HAS_LOGO);
  let includeSeal = false;

  if (hasLogo === 'true') includeSeal = true;

  const banner = BannerPromo.CreateElement({
    theme: element.getAttribute(Attributes.THEME),
    text: SlotWithDefaultStyling({
      element,
      slotRef: Slots.TEXT,
    }),
    headline: SlotWithDefaultStyling({
      element,
      slotRef: Slots.HEADLINE,
    }),
    actions: SlotWithDefaultStyling({
      element,
      slotRef: Slots.ACTIONS,
    }),
    includeSeal,
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(banner);
};

class UMDBannerPromoElement extends HTMLElement {
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
    window.UMDBannerPromoElement = UMDBannerPromoElement;
    window.customElements.define(ELEMENT_NAME, UMDBannerPromoElement);
  }
};

export default {
  Load,
};
