declare global {
  interface Window {
    UMDFeedEventsList: typeof UMDFeedEventsList;
  }
}

import * as Feeds from '@universityofmaryland/web-feeds-library';
import { Markup, Styles } from 'utilities';
import { CommonFeedEventsData } from './common';

const { FeedsEvents } = Feeds;

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${FeedsEvents.Styles}
`;

const ELEMENT_NAME = 'umd-feed-events-list';
class UMDFeedEventsList extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Markup.create.Node.stylesTemplate({
      styles,
    });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const data = CommonFeedEventsData({ element: this });
    if (!data) return;

    this._shadow.appendChild(
      FeedsEvents.CreateElement({ ...data, isTypeList: true }),
    );
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedEventsList = UMDFeedEventsList;
    window.customElements.define(ELEMENT_NAME, UMDFeedEventsList);
  }

  return '';
};

export default {
  Load,
};
