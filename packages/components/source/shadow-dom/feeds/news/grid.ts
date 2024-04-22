declare global {
  interface Window {
    UMDFeedNewsGrid: typeof UMDFeedNewsGrid;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { FeedsNews } from 'elements';
import { TypeNewsFeedRequirements } from 'elements/feeds/news';

const ATTRIBUTE_TOKEN = 'token';
const ATTRIBUTE_ROWS = 'row-count';
const ATTRIBUTE_SHOW = 'show-count';
const ATTRIBUTE_LAZYLOAD = 'lazyload';
const ATTRIBUTE_CATEGORIES = 'categories';
const ATTRIBUTE_UNION = 'union';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${FeedsNews.Styles}
`;

const ELEMENT_NAME = 'umd-feed-news';
class UMDFeedNewsGrid extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const token = this.getAttribute(ATTRIBUTE_TOKEN);
    const categoriesAttribute = this.getAttribute(ATTRIBUTE_CATEGORIES);

    if (!token) {
      console.error(`${ELEMENT_NAME} requires a token to be set`);
      return;
    }

    const data: TypeNewsFeedRequirements = {
      token,
      numberOfRowsToStart: Number(this.getAttribute(ATTRIBUTE_ROWS)) || 1,
      numberOfColumnsToShow: Number(this.getAttribute(ATTRIBUTE_SHOW)) || 3,
      isLazyLoad: this.getAttribute(ATTRIBUTE_LAZYLOAD) === 'true',
      isUnion: this.getAttribute(ATTRIBUTE_UNION) !== 'false',
      isTypeGrid: true,
    };

    if (categoriesAttribute) {
      data.categories = categoriesAttribute.split(',');
    }

    this._shadow.appendChild(FeedsNews.CreateElement(data));
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedNewsGrid = UMDFeedNewsGrid;
    window.customElements.define(ELEMENT_NAME, UMDFeedNewsGrid);
  }

  return '';
};
