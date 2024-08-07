declare global {
  interface Window {
    UMDFeedNewsGrid: typeof UMDFeedNewsGrid;
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

const ELEMENT_NAME = 'umd-feed-news';
const ATTRIBUTE_TYPE = 'type';
const ATTRIBUTE_TRANSPARENT = 'transparent';

class UMDFeedNewsGrid extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const attributeType = this.getAttribute(ATTRIBUTE_TYPE);
    const isTransparent = this.getAttribute(ATTRIBUTE_TRANSPARENT) === 'true';
    const isTypeGrid = attributeType === 'grid' || !attributeType;
    const isTypeOverlay = attributeType === 'overlay';

    const data = CommonFeedNewsData({
      element: this,
      numberOfColumnsToShowDefault: 3,
      numberOfRowsToStartDefault: 1,
    });
    if (!data) return;

    this._shadow.appendChild(
      FeedsNews.CreateElement({
        ...data,
        isTypeGrid,
        isTypeOverlay,
        isTransparent,
      }),
    );
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedNewsGrid = UMDFeedNewsGrid;
    window.customElements.define(ELEMENT_NAME, UMDFeedNewsGrid);
  }

  return '';
};

export default {
  Load,
};
