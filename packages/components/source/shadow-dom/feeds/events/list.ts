declare global {
  interface Window {
    UMDFeedEventsList: typeof UMDFeedEventsList;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { FeedsEvents } from 'elements';
import { TypeEventFeedRequirements } from 'elements/feeds/events';

const ATTRIBUTE_TOKEN = 'token';
const ATTRIBUTE_ROWS = 'row-count';
const ATTRIBUTE_LAZYLOAD = 'lazyload';
const ATTRIBUTE_CATEGORIES = 'categories';
const ATTRIBUTE_UNION = 'union';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${FeedsEvents.Styles}
`;

const ELEMENT_NAME = 'umd-feed-events-list';
class UMDFeedEventsList extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({
      styles,
    });

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
    const data: TypeEventFeedRequirements = {
      token,
      numberOfRowsToStart: Number(this.getAttribute(ATTRIBUTE_ROWS)) || 5,
      numberOfColumnsToShow: 1,
      isLazyLoad: this.getAttribute(ATTRIBUTE_LAZYLOAD) === 'true',
      isUnion: this.getAttribute(ATTRIBUTE_UNION) !== 'false',
      isTypeList: true,
    };

    if (categoriesAttribute) {
      data.categories = categoriesAttribute.split(',');
    }

    this._shadow.appendChild(FeedsEvents.CreateElement(data));
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedEventsList = UMDFeedEventsList;
    window.customElements.define(ELEMENT_NAME, UMDFeedEventsList);
  }

  return '';
};
