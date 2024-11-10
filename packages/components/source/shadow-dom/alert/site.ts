declare global {
  interface Window {
    UMDAlertSiteElement: typeof UMDAlertSiteElement;
  }
}

import { AlertSite } from 'elements';
import { Styles, MarkupCreate, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Attributes, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-alert-site';

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
      slotRef: Slots.HEADLINE,
    }),
    text: SlotWithDefaultStyling({ element, slotRef: Slots.BODY }),
    actions: SlotWithDefaultStyling({ element, slotRef: Slots.ACTIONS }),
    daysToHide: element.getAttribute(Attributes.VISUAL_DAYS_TO_HIDE) || '10',
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(alert);
};

class UMDAlertSiteElement extends HTMLElement {
  _shadow: ShadowRoot;
  _container: HTMLDivElement | null = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDAlertSiteElement = UMDAlertSiteElement;
    window.customElements.define(ELEMENT_NAME, UMDAlertSiteElement);
  }
};

export default {
  Load,
};
