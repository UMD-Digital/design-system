declare global {
  interface Window {
    UMDBannerPromoElement: typeof UMDBannerPromoElement;
  }
}

import { BannerPromo } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';

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
  const includeSeal = Attributes.checks.isVisuallyLogo({ element });
  const isThemeDark = Attributes.checks.isThemeDark({
    element,
  });

  const banner = BannerPromo.CreateElement({
    text: Slots.defined.text({ element }),
    headline: Slots.defined.headline({ element }),
    actions: Slots.defined.actions({ element }),
    includeSeal,
    isThemeDark,
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
