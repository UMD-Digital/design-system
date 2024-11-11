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
import { MarkupCreate, Styles, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { AttributesNames, AttributesValues, Slots } = WebComponents;

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
  const theme =
    element.getAttribute(AttributesNames.THEME) || AttributesValues.THEME_LIGHT;
  const isTransparent =
    element.getAttribute(AttributesNames.VISUAL_TRANSPARENT) === 'true';

  return {
    theme,
    quote: SlotWithDefaultStyling({ element, slotRef: Slots.QUOTE }),
    image: SlotWithDefaultStyling({ element, slotRef: Slots.IMAGE }),
    attribution: SlotWithDefaultStyling({
      element,
      slotRef: Slots.ATTRIBUTION,
    }),
    attributionSubText: SlotWithDefaultStyling({
      element,
      slotRef: Slots.ATTRIBUTION_SUB_TEXT,
    }),
    action: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
    isTransparent,
  };
};

const CreateShadowDom = ({ element }: { element: UMDElementQuote }) => {
  const typeAttribute = element.getAttribute(AttributesNames.TYPE);
  const size =
    element.getAttribute(AttributesNames.DISPLAY_SIZE) ||
    AttributesValues.SIZE_NORMAL;

  const isTypeStatement = typeAttribute === AttributesValues.DISPLAY_STATEMENT;
  const isTypeFeatured = typeAttribute === AttributesValues.DISPLAY_FEATURED;

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
