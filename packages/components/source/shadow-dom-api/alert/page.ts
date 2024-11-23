declare global {
  interface Window {
    UMDAlertPageElement: typeof UMDAlertPageElement;
  }
}

import { AlertPage } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { Styles, MarkupCreate } from 'utilities';

const { Node, SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-alert-page';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${AlertPage.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeLight = Attributes.checks.isThemeLight({
    element,
  });
  const isThemeDark = Attributes.checks.isThemeDark({
    element,
  });
  const isShowIcon = Attributes.checks.isShowIcon({ element });

  const alert = AlertPage.CreateElement({
    text: SlotWithDefaultStyling({ element, slotRef: Slots.name.BODY }),
    headline: Slots.defined.headline({ element }),
    actions: Slots.defined.actions({ element }),
    isThemeLight,
    isThemeDark,
    isShowIcon,
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(alert);
};

class UMDAlertPageElement extends HTMLElement {
  _shadow: ShadowRoot;

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
