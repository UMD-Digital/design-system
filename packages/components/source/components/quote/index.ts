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
import { Reset } from 'helpers/styles';
import { MakeTemplate, SlotDefaultStyling } from 'helpers/ui';

const ELEMENT_NAME = 'umd-element-quote';

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const ATTRIBUTE_SIZE = 'size';
const THEME_LIGHT = 'light';
const TYPE_STATEMENT = 'statement';
const TYPE_FEATURED = 'featured';
const SIZE_NORMAL = 'normal';

const SLOTS = {
  IMAGE: 'image',
  QUOTE: 'quote',
  ATTRIBUTION: 'attribution',
  ATTRIBUTION_SUB_TEXT: 'attribution-sub-text',
  ACTIONS: 'actions',
};
const styles = `
  :host {
    display: block;
  }
  
  ${Reset}
  ${QuoteElements.Text.Styles}
  ${QuoteFeatured.Styles}
  ${QuoteInline.Styles}
  ${QuoteStatement.Styles}
`;

const MakeData = ({ element }: { element: UMDElementQuote }) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;

  const { IMAGE, QUOTE, ATTRIBUTION, ATTRIBUTION_SUB_TEXT, ACTIONS } =
    element._slots;

  return {
    theme,
    quote: SlotDefaultStyling({ element, slotRef: QUOTE }),
    image: SlotDefaultStyling({ element, slotRef: IMAGE }),
    attribution: SlotDefaultStyling({ element, slotRef: ATTRIBUTION }),
    attributionSubText: SlotDefaultStyling({
      element,
      slotRef: ATTRIBUTION_SUB_TEXT,
    }),
    action: SlotDefaultStyling({ element, slotRef: ACTIONS }),
  };
};

const CreateShadowDom = ({ element }: { element: UMDElementQuote }) => {
  const typeAttribute = element.getAttribute(ATTRIBUTE_TYPE);
  const size = element.getAttribute(ATTRIBUTE_SIZE) || SIZE_NORMAL;

  const isTypeStatement = typeAttribute === TYPE_STATEMENT;
  const isTypeFeatured = typeAttribute === TYPE_FEATURED;

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
  _slots: Record<string, string>;

  constructor() {
    const template = MakeTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDElementQuote = UMDElementQuote;
    window.customElements.define(ELEMENT_NAME, UMDElementQuote);
  }
};
