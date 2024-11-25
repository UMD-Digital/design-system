declare global {
  interface Window {
    UMDArticleElement: typeof UMDArticleElement;
  }
}

import { CardBlock, CardList } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-article';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${CardBlock.Styles}
  ${CardList.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const MakeArticleData = ({ element }: { element: HTMLElement }) => ({
  image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
  eyebrow: Slots.defined.eyebrow({ element }),
  headline: Slots.defined.headline({ element }),
  text: Slots.defined.text({ element }),
  date: Slots.defined.date({ element }),
  actions: Slots.defined.actions({ element }),
  isTransparent: Attributes.isVisual.transparent({ element }),
  isThemeDark: Attributes.isTheme.dark({
    element,
  }),
});

const CreateShadowDom = ({ element }: { element: UMDArticleElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isAligned = Attributes.isVisual.aligned({ element });
  const isBordered = Attributes.isVisual.bordered({ element });
  const isDisplayList = Attributes.isVisual.list({ element });

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  if (isDisplayList) {
    shadow.appendChild(
      CardList.CreateElement({ ...MakeArticleData({ element }), isAligned }),
    );
    return;
  }

  shadow.appendChild(
    CardBlock.CreateElement({
      ...MakeArticleData({ element }),
      isAligned,
      isBordered,
    }),
  );
};

class UMDArticleElement extends HTMLElement {
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
    window.UMDArticleElement = UMDArticleElement;
    window.customElements.define(ELEMENT_NAME, UMDArticleElement);
  }
};

export default {
  Load,
};
