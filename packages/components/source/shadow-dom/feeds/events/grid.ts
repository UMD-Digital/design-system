declare global {
  interface Window {
    UMDFeedEventsGrid: typeof UMDFeedEventsGrid;
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

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDFeedEventsGrid = UMDFeedEventsGrid;
    window.customElements.define(ELEMENT_NAME, UMDFeedEventsGrid);
  }

  return '';
};
