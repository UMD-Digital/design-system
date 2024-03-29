declare global {
  interface Window {
    UMDElementQuote: typeof UMDElementQuote;
  }
}

import {
  QuoteFeatured,
  QuoteInline,
  QuoteSimple,
} from '@universityofmaryland/custom-elements-library';
import { Reset } from 'helpers/styles';
import { MakeTemplate } from 'helpers/ui';

const ELEMENT_NAME = 'umd-element-quote';

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const ATTRIBUTE_SIZE = 'size';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const TYPE_SIMPLE = 'simple';
const TYPE_INLINE = 'inline';
const TYPE_FEATURED = 'featured';
const SIZE_NORMAL = 'normal';
const SIZE_LARGE = 'large';

const SLOTS = {
  IMAGE: 'image',
  QUOTE: 'headline',
  ATTRIBUTION: 'attribution',
  ATTRIBUTION_SUB_TEXT: 'attribution-sub-text',
  ACTIONS: 'actions',
};
const styles = `
  :host {
    display: block;
  }
  
  ${Reset}
  ${QuoteFeatured.Styles}
  ${QuoteInline.Styles}
  ${QuoteSimple.Styles}

`;

const CreateShadowDom = ({ element }: { element: UMDElementQuote }) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const typeAttribute = element.getAttribute(ATTRIBUTE_TYPE);
  const { IMAGE, QUOTE, ATTRIBUTION, ATTRIBUTION_SUB_TEXT, ACTIONS } =
    element._slots;

  const isTypeSimple = typeAttribute === TYPE_SIMPLE;
  const isTypeFeatured = typeAttribute === TYPE_FEATURED;

  if (isTypeSimple) {
    return QuoteSimple.CreateElement({
      theme,
    });
  }

  if (isTypeFeatured) {
    return QuoteFeatured.CreateElement({
      theme,
    });
  }

  return QuoteInline.CreateElement({
    theme,
  });
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
