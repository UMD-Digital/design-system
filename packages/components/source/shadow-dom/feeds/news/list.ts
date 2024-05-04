declare global {
  interface Window {
    UMDFeedNewsList: typeof UMDFeedNewsList;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { FeedsNews } from 'elements';
import { CommonFeedNewsData } from './common';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${FeedsNews.Styles}
`;

const ELEMENT_NAME = 'umd-feed-news-list';
class UMDFeedNewsList extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const data = CommonFeedNewsData({
      element: this,
    });
    if (!data) return;

    this._shadow.appendChild(
      FeedsNews.CreateElement({ ...data, isTypeList: true }),
    );
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
