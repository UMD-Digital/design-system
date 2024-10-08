declare global {
  interface Window {
    UMDFeedNewsGridFeatured: typeof UMDFeedNewsGridFeatured;
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

const ELEMENT_NAME = 'umd-feed-news-featured';
const ATTRIBUTE_TRANSPARENT = 'transparent';

class UMDFeedNewsGridFeatured extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const isTransparent = this.getAttribute(ATTRIBUTE_TRANSPARENT) === 'true';

    const data = CommonFeedNewsData({
      element: this,
      numberOfColumnsToShowDefault: 4,
      numberOfRowsToStartDefault: 1,
    });
    if (!data) return;

    this._shadow.appendChild(
      FeedsNews.CreateElement({
        ...data,
        isTransparent,
        isTypeGrid: true,
        isTypeFeatured: true,
      }),
    );
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedNewsGridFeatured = UMDFeedNewsGridFeatured;
    window.customElements.define(ELEMENT_NAME, UMDFeedNewsGridFeatured);
  }

  return '';
};

export default {
  Load,
};
