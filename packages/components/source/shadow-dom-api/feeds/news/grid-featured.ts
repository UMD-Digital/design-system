declare global {
  interface Window {
    UMDFeedNewsGridFeatured: typeof UMDFeedNewsGridFeatured;
  }
}

import { Feeds } from '@universityofmaryland/web-elements-library';
import { MarkupCreate, Styles } from 'utilities';
import { CommonFeedNewsData } from './common';

const { FeedsNews } = Feeds;

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${FeedsNews.Styles}
`;

const ELEMENT_NAME = 'umd-feed-news-featured';
const ATTRIBUTE_TRANSPARENT = 'transparent';
const ATTRIBUTE_LAYOUT = 'layout';
const LAYOUT_REVERSED = 'reversed';

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
    const isLayoutReversed =
      this.getAttribute(ATTRIBUTE_LAYOUT) === LAYOUT_REVERSED;

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
        isLayoutReversed,
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
