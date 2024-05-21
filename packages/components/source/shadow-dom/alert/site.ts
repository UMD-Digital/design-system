declare global {
  interface Window {
    UMDAlertSiteElement: typeof UMDAlertSiteElement;
  }
}

import { Styles, MarkupCreate } from 'utilities';
import { AlertSite } from 'elements';

const { SlotWithDefaultStyling, SlotOberserver } = MarkupCreate;

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

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const alert = AlertSite.CreateElement({
    headline: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.HEADLINE,
    }),
    text: SlotWithDefaultStyling({ element, slotRef: SLOTS.BODY }),
    actions: SlotWithDefaultStyling({ element, slotRef: SLOTS.ACTIONS }),
    daysToHide: element.getAttribute(ATTRIBUTE_DAYS) || '10',
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(alert);
};

export class UMDAlertSiteElement extends HTMLElement {
  _shadow: ShadowRoot;
  _container: HTMLDivElement | null = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
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
