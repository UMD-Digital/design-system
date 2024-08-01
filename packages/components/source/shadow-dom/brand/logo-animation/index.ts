declare global {
  interface Window {
    UMDBrandLogoAnimation: typeof UMDBrandLogoAnimation;
  }
}

import { AnimationBrandLogo } from 'macros';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-brand-logo-animation';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${AnimationBrandLogo.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDBrandLogoAnimation }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(AnimationBrandLogo.CreateElement({}));
};

class UMDBrandLogoAnimation extends HTMLElement {
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
    window.UMDBrandLogoAnimation = UMDBrandLogoAnimation;
    window.customElements.define(ELEMENT_NAME, UMDBrandLogoAnimation);
  }
};

export default {
  Load,
};
