declare global {
  interface Window {
    UMDScrollTopElement: typeof UMDScrollTopElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;

const ELEMENT_NAME = 'umd-element-scroll-top';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.reset}
  ${Composite.layout.scrollTop.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDScrollTopElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const scrollTop = Composite.layout.scrollTop.CreateElement({
    isFixed: element.hasAttribute(Attributes.names.LAYOUT_FIXED),
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(scrollTop.element);
  scrollTop.events.load();
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

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDScrollTopElement = UMDScrollTopElement;
    window.customElements.define(ELEMENT_NAME, UMDScrollTopElement);
  }
};
