declare global {
  interface Window {
    UMDElementQuote: typeof UMDElementQuote;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { SlotWithDefaultStyling } = Markup.create;

const ELEMENT_NAME = 'umd-element-quote';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.reset}
  ${Composite.quote.elements.text.Styles}
  ${Composite.quote.featured.Styles}
  ${Composite.quote.inline.Styles}
`;

const MakeData = ({ element }: { element: UMDElementQuote }) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isThemeMaryland = Attributes.isTheme.maryland({ element });
  const isTransparent = Attributes.isVisual.transparent({ element });

  return {
    quote: SlotWithDefaultStyling({ element, slotRef: Slots.name.QUOTE }),
    image: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.assets.image,
    }),
    attribution: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.ATTRIBUTION,
    }),
    attributionSubText: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.ATTRIBUTION_SUB_TEXT,
    }),
    action: Slots.actions.default({ element }),
    isTransparent,
    isThemeDark,
    isThemeMaryland,
  };
};

const CreateShadowDom = ({ element }: { element: UMDElementQuote }) => {
  const isSizeLarge = Attributes.isVisual.sizeLarge({ element });
  const isTypeStatement = Attributes.isDisplay.statement({ element });
  const isTypeFeatured = Attributes.isDisplay.featured({ element });

  if (isTypeStatement) {
    // return QuoteStatement.CreateElement({ ...MakeData({ element }) });
  }

  if (isTypeFeatured) {
    return Composite.quote.featured.CreateElement({
      ...MakeData({ element }),
      isSizeLarge,
    });
  }

  return Composite.quote.inline.CreateElement({
    ...MakeData({ element }),
    isSizeLarge,
  });
};

export class UMDElementQuote extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Markup.create.Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
  }
}

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDElementQuote = UMDElementQuote;
    window.customElements.define(ELEMENT_NAME, UMDElementQuote);
  }
};
