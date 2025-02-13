declare global {
  interface Window {
    UMDHeaderStickyElement: typeof UMDHeaderStickyElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;
const { NavigationElements } = Composite;

const ELEMENT_NAME = 'umd-element-navigation-sticky';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${NavigationElements.Sticky.Styles}
`;

class UMDHeaderStickyElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const { _shadow } = element;
    const content = Node.slot({ type: 'content' });

    _shadow.appendChild(
      NavigationElements.Sticky.CreateElement({
        content,
        component: element,
      }),
    );
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeaderStickyElement = UMDHeaderStickyElement;
    window.customElements.define(ELEMENT_NAME, UMDHeaderStickyElement);
  }
};

export default {
  Load,
};
