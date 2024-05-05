declare global {
  interface Window {
    UMDFeedEventsGrouped: typeof UMDFeedEventsGrouped;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { FeedsEvents } from 'elements';
import { CommonFeedEventsData } from './common';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${FeedsEvents.Styles}
`;

const ELEMENT_NAME = 'umd-feed-events-grouped';
class UMDFeedEventsGrouped extends HTMLElement {
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
    const data = CommonFeedEventsData({
      element: this,
      numberOfRowsToStartDefault: 10,
    });
    if (!data) return;

    this._shadow.appendChild(
      FeedsEvents.CreateElement({
        ...data,
        isTypeGrouped: true,
      }),
    );
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedEventsGrouped = UMDFeedEventsGrouped;
    window.customElements.define(ELEMENT_NAME, UMDFeedEventsGrouped);
  }

  return '';
};
