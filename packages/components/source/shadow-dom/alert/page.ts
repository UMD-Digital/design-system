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

const CreateShadowDom = ({ element }: { element: HTMLElement }) =>
  AlertPage.CreateElement({
    text: SlotWithDefaultStyling({ element, slotRef: SLOTS.BODY }),
    headline: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.HEADLINE,
    }),
    actions: SlotWithDefaultStyling({ element, slotRef: SLOTS.ACTIONS }),

    isShowIcon: element.getAttribute(ATTRIBUTE_ICON) === 'true',
  });

export class UMDAlertPageElement extends HTMLElement {
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
    const shadowDom = this._shadow;

    element._shadow.appendChild(CreateShadowDom({ element }));

    SlotOberserver({
      element,
      shadowDom,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDAlertPageElement = UMDAlertPageElement;
    window.customElements.define(ELEMENT_NAME, UMDAlertPageElement);
  }
};
