declare global {
  interface Window {
    UMDFeedNewsList: typeof UMDFeedNewsList;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles, CreateShadowDom, CreateFeed } from '../common';

const ATTRIBUTE_TOKEN = 'token';
const ATTRIBUTE_ROWS = 'row-count';
const ATTRIBUTE_LAZYLOAD = 'lazyload';
const ATTRIBUTE_CATEGORIES = 'categories';
const ATTRIBUTE_UNION = 'union';

export const ELEMENT_NAME = 'umd-feed-news-list';
export class UMDFeedNewsList extends HTMLElement {
  _shadow: ShadowRoot;
  _token: string | null;
  _showRows: number;
  _lazyLoad: boolean;
  _offset: number;
  _union: boolean;
  _totalEntries: number | null;
  _categories: string[];

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._token = null;
    this._showRows = 5;
    this._offset = 0;
    this._lazyLoad = false;
    this._union = false;
    this._totalEntries = null;
    this._categories = [];

    const styles = `${ComponentStyles}`;
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [
      ATTRIBUTE_TOKEN,
      ATTRIBUTE_ROWS,
      ATTRIBUTE_LAZYLOAD,
      ATTRIBUTE_CATEGORIES,
    ];
  }

  async connectedCallback() {
    const element = this;
    const rowCount = element.getAttribute(ATTRIBUTE_ROWS);
    const shouldLazyLoad = element.getAttribute(ATTRIBUTE_LAZYLOAD);
    const categories = element.getAttribute(ATTRIBUTE_CATEGORIES);

    element._token = element.getAttribute(ATTRIBUTE_TOKEN) || null;
    element._union = element.getAttribute(ATTRIBUTE_UNION) === 'true';

    if (rowCount) element._showRows = parseInt(rowCount);

    if (categories) {
      this._categories = categories.split(',');
    }

    if (shouldLazyLoad) {
      if (shouldLazyLoad === 'true') element._lazyLoad = true;
      if (shouldLazyLoad === 'false') element._lazyLoad = false;
    }

    this._shadow.appendChild(CreateShadowDom({ element }));
    CreateFeed({ element });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedNewsList = UMDFeedNewsList;
    window.customElements.define(ELEMENT_NAME, UMDFeedNewsList);
  }

  return '';
};
