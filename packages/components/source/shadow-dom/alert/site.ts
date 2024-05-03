declare global {
  interface Window {
    UMDAlertSiteElement: typeof UMDAlertSiteElement;
  }
}

import { Styles, MarkupCreate } from 'utilities';
import { AlertSite } from 'elements';

const { SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-alert-site';
const ATTRIBUTE_DAYS = 'days-to-hide';

const SLOTS = {
  HEADLINE: 'headline',
  BODY: 'body',
  ACTIONS: 'actions',
};

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${AlertSite.Styles}
`;

export class UMDAlertSiteElement extends HTMLElement {
  _shadow: ShadowRoot;
  _container: HTMLDivElement | null = null;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;

    element._shadow.appendChild(
      AlertSite.CreateElement({
        text: SlotWithDefaultStyling({ element, slotRef: SLOTS.BODY }),
        headline: SlotWithDefaultStyling({
          element,
          slotRef: SLOTS.HEADLINE,
        }),
        actions: SlotWithDefaultStyling({ element, slotRef: SLOTS.ACTIONS }),
        daysToHide: this.getAttribute(ATTRIBUTE_DAYS) || '10',
      }),
    );
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDAlertSiteElement = UMDAlertSiteElement;
    window.customElements.define(ELEMENT_NAME, UMDAlertSiteElement);
  }
};
