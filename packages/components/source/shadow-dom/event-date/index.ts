declare global {
  interface Window {
    UMDEventsDateElement: typeof UMDEventsDateElement;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles, CreateShadowDom } from './elements';
import { SLOTS } from './globals';

const { SlotOberserver, Node } = MarkupCreate;

export const ELEMENT_NAME = 'umd-element-events-date';
export type ELEMENT_TYPE = UMDEventsDateElement;
export class UMDEventsDateElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme: string;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
    this._theme = 'light';

    const styles = `${ComponentStyles}`;
    const template = Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme'];
  }

  connectedCallback() {
    const element = this;
    const theme = element.getAttribute('theme') || 'light';

    element._theme = theme;
    element._shadow.appendChild(CreateShadowDom({ element }));

    SlotOberserver({
      element,
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
    window.UMDEventsDateElement = UMDEventsDateElement;
    window.customElements.define(ELEMENT_NAME, UMDEventsDateElement);
  }
};
