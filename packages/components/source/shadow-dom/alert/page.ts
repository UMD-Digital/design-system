declare global {
  interface Window {
    UMDAlertPageElement: typeof UMDAlertPageElement;
  }
}

import { Styles, MarkupCreate } from 'utilities';
import { AlertPage } from 'elements';

const { SlotWithDefaultStyling, SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-alert-page';
const ATTRIBUTE_ICON = 'icon';

const SLOTS = {
  HEADLINE: 'headline',
  BODY: 'body',
  ACTIONS: 'actions',
};

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
    text: SlotWithDefaultStyling({ element, slotRef: SLOTS.BODY }),
    headline: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.HEADLINE,
    }),
    actions: SlotWithDefaultStyling({ element, slotRef: SLOTS.ACTIONS }),
    isShowIcon: element.getAttribute(ATTRIBUTE_ICON) === 'true',
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

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
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
