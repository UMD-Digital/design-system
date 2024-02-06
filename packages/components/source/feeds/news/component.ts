declare global {
  interface Window {
    UMDFeedNews: typeof UMDFeedNews;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';

const ATTRIBUTE_TOKEN = 'token';
const ATTRIBUTE_ROWS = 'row-count';
const ATTRIBUTE_SHOW = 'show-count';
const ATTRIBUTE_LAZYLOAD = 'lazyload';
const ATTRIBUTE_CATEGORIES = 'categories';

export const ELEMENT_NAME = 'umd-feed-news';
export type UMDNewsFeedType = UMDFeedNews;
export class UMDFeedNews extends HTMLElement {
  _shadow: ShadowRoot;
  _token: string | null;
  _showCount: number;
  _showRows: number;
  _lazyLoad: boolean;
  _categories: string[];

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._token = null;
    this._showCount = 3;
    this._showRows = 1;
    this._lazyLoad = false;
    this._categories = [];

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [
      ATTRIBUTE_TOKEN,
      ATTRIBUTE_ROWS,
      ATTRIBUTE_LAZYLOAD,
      ATTRIBUTE_SHOW,
      ATTRIBUTE_CATEGORIES,
    ];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  async connectedCallback() {
    const element = this;
    const rowCount = element.getAttribute(ATTRIBUTE_ROWS);
    const showCount = element.getAttribute(ATTRIBUTE_SHOW);
    const shouldLazyLoad = element.getAttribute(ATTRIBUTE_LAZYLOAD);
    const categories = element.getAttribute(ATTRIBUTE_CATEGORIES);

    element._token = element.getAttribute(ATTRIBUTE_TOKEN) || null;

    if (categories) {
      this._categories = categories.split(',');
    }

    if (shouldLazyLoad) {
      if (shouldLazyLoad === 'true') element._lazyLoad = true;
      if (shouldLazyLoad === 'false') element._lazyLoad = false;
    }

    if (rowCount) {
      if (rowCount === '1') element._showRows = 1;
      if (rowCount === '2') element._showRows = 2;
      if (rowCount === '3') element._showRows = 3;
    }

    if (showCount) {
      if (showCount === '2') element._showCount = 2;
      if (showCount === '3') element._showCount = 3;
      if (showCount === '4') element._showCount = 4;
    }

    const container = await CreateShadowDom({ element });
    if (container) this._shadow.appendChild(container);
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedNews = UMDFeedNews;
    window.customElements.define(ELEMENT_NAME, UMDFeedNews);
  }

  return '';
};
