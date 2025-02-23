declare global {
  interface Window {
    UMDCardIconElement: typeof UMDCardIconElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;
const { CardIconBlock } = Composite;

const ELEMENT_NAME = 'umd-element-card-icon';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.reset}
  ${CardIconBlock.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const MakeCardData = ({ element }: { element: UMDCardIconElement }) => ({
  image: Markup.validate.ImageSlot({
    element,
    ImageSlot: Slots.name.assets.image,
  }),
  headline: Slots.headline.default({ element }),
  text: Slots.text.default({ element }),
  isThemeDark: Attributes.isTheme.dark({ element }),
});

const CreateShadowDom = ({ element }: { element: UMDCardIconElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const card = CardIconBlock.CreateElement({
    ...MakeCardData({ element }),
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(card);
};

class UMDCardIconElement extends HTMLElement {
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
    window.UMDCardIconElement = UMDCardIconElement;
    window.customElements.define(ELEMENT_NAME, UMDCardIconElement);
  }
};

export default {
  Load,
};
