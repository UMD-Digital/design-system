declare global {
  interface Window {
    UMDScrollTopElement: typeof UMDScrollTopElement;
  }
}

import { ScrollTop } from 'elements';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-scroll-top';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${ScrollTop.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDScrollTopElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  shadow.appendChild(ScrollTop.CreateElement({}));
};

class UMDScrollTopElement extends HTMLElement {
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
    window.UMDScrollTopElement = UMDScrollTopElement;
    window.customElements.define(ELEMENT_NAME, UMDScrollTopElement);
  }
};

export default {
  Load,
};
