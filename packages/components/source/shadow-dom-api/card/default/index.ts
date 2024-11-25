declare global {
  interface Window {
    UMDCardElement: typeof UMDCardElement;
  }
}

import { CardBlock, CardList } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-card';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${CardBlock.Styles}
  ${CardList.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const MakeCardData = ({ element }: { element: UMDCardElement }) => ({
  image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
  eyebrow: Slots.defined.eyebrow({ element }),
  headline: Slots.defined.headline({ element }),
  text: Slots.defined.text({ element }),
  actions: Slots.defined.actions({ element }),
  isTransparent: Attributes.isVisual.transparent({ element }),
  isThemeDark: Attributes.isTheme.dark({
    element,
  }),
});

const CreateShadowDom = ({ element }: { element: UMDCardElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isAligned = Attributes.isVisual.aligned({ element });
  const isBordered = Attributes.isVisual.bordered({ element });
  const isDisplayList = Attributes.isVisual.list({ element });

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (isDisplayList) {
    shadow.appendChild(
      CardList.CreateElement({ ...MakeCardData({ element }), isAligned }),
    );
    return;
  }

  shadow.appendChild(
    CardBlock.CreateElement({
      ...MakeCardData({ element }),
      isAligned,
      isBordered,
    }),
  );
};

class UMDCardElement extends HTMLElement {
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
    window.UMDCardElement = UMDCardElement;
    window.customElements.define(ELEMENT_NAME, UMDCardElement);
  }
};

export default {
  Load,
};
