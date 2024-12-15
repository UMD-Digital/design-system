declare global {
  interface Window {
    UMDFeedEventsGrid: typeof UMDFeedEventsGrid;
  }
}

import { Feeds } from '@universityofmaryland/web-elements-library';
import { MarkupCreate, Styles } from 'utilities';
import { CommonFeedEventsData } from './common';

const { FeedsEvents } = Feeds;

const styles = `
  :host {
    display: block;
  }

  ${Styles.resetString}
  ${FeedsEvents.Styles}
`;

const ELEMENT_NAME = 'umd-feed-events';
class UMDFeedEventsGrid extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const data = CommonFeedEventsData({
      element: this,
      numberOfColumnsToShowDefault: 3,
      numberOfRowsToStartDefault: 1,
    });
    if (!data) return;

    this._shadow.appendChild(
      FeedsEvents.CreateElement({ ...data, isTypeGrid: true }),
    );
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedEventsGrid = UMDFeedEventsGrid;
    window.customElements.define(ELEMENT_NAME, UMDFeedEventsGrid);
  }

  return '';
};

export default {
  Load,
};
