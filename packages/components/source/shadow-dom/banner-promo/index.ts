declare global {
  interface Window {
    UMDBannerPromoElement: typeof UMDBannerPromoElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { BannerPromo } from 'elements';

const { SlotWithDefaultStyling, SlotOberserver, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-banner-promo';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_HAS_LOGO = 'hasLogo';

const SLOTS = { HEADLINE: 'headline', TEXT: 'text', ACTIONS: 'actions' };

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
  const hasLogo = element.getAttribute(ATTRIBUTE_HAS_LOGO);
  let includeSeal = true;

  if (hasLogo === 'false') includeSeal = false;

  const banner = BannerPromo.CreateElement({
    theme: element.getAttribute(ATTRIBUTE_THEME),
    text: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.TEXT,
    }),
    headline: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.HEADLINE,
    }),
    actions: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.ACTIONS,
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

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
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
