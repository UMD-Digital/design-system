declare global {
  interface Window {
    UMDAlertPageElement: typeof UMDAlertPageElement;
  }
}

import { AlertPage } from 'elements';
import { Styles, MarkupCreate, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { AttributesNames, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-alert-page';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${AlertPage.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const theme = element.getAttribute('theme');

  const alert = AlertPage.CreateElement({
    text: SlotWithDefaultStyling({ element, slotRef: Slots.BODY }),
    headline: Slots.SlottedHeadline({ element }),
    actions: Slots.SlottedActions({ element }),
    isShowIcon:
      element.getAttribute(AttributesNames.VISUAL_ICON) ===
      AttributesValues.STATE_TRUE,
    theme,
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(alert);
};

class UMDAlertPageElement extends HTMLElement {
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
    window.UMDAlertPageElement = UMDAlertPageElement;
    window.customElements.define(ELEMENT_NAME, UMDAlertPageElement);
  }
};

export default {
  Load,
};
