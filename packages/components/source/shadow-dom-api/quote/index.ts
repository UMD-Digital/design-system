declare global {
  interface Window {
    UMDElementQuote: typeof UMDElementQuote;
  }
}

import {
  QuoteElements,
  QuoteFeatured,
  QuoteInline,
  QuoteStatement,
} from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-quote';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${QuoteElements.Text.Styles}
  ${QuoteFeatured.Styles}
  ${QuoteInline.Styles}
  ${QuoteStatement.Styles}
`;

const MakeData = ({ element }: { element: UMDElementQuote }) => {
  const isThemeDark = Attributes.checks.isThemeDark({ element });
  const isThemeMaryland = Attributes.checks.isThemeMaryland({ element });
  const isTransparent =
    element.getAttribute(Attributes.names.VISUAL_TRANSPARENT) === 'true';

  return {
    quote: SlotWithDefaultStyling({ element, slotRef: Slots.name.QUOTE }),
    image: SlotWithDefaultStyling({ element, slotRef: Slots.name.IMAGE }),
    attribution: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.ATTRIBUTION,
    }),
    attributionSubText: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.ATTRIBUTION_SUB_TEXT,
    }),
    action: SlotWithDefaultStyling({ element, slotRef: Slots.name.ACTIONS }),
    isTransparent,
    isThemeDark,
    isThemeMaryland,
  };
};

const CreateShadowDom = ({ element }: { element: UMDElementQuote }) => {
  const typeAttribute = element.getAttribute(Attributes.names.TYPE);
  const size =
    element.getAttribute(Attributes.names.DISPLAY_SIZE) ||
    Attributes.values.SIZE_NORMAL;

  const isTypeStatement = typeAttribute === Attributes.values.DISPLAY_STATEMENT;
  const isTypeFeatured = typeAttribute === Attributes.values.DISPLAY_FEATURED;

  if (isTypeStatement) {
    return QuoteStatement.CreateElement({ ...MakeData({ element }) });
  }

  if (isTypeFeatured) {
    return QuoteFeatured.CreateElement({ ...MakeData({ element }), size });
  }

  return QuoteInline.CreateElement({ ...MakeData({ element }), size });
};

export class UMDElementQuote extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDElementQuote = UMDElementQuote;
    window.customElements.define(ELEMENT_NAME, UMDElementQuote);
  }
};

export default {
  Load,
};
