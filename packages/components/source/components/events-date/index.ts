declare global {
  interface Window {
    UMDEventsDateElement: typeof UMDEventsDateElement;
  }
}

import { MakeTemplate, SlotOberserver } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { ELEMENTS, SLOTS } from './globals';

const { CONTAINER_DARK_CLASS } = ELEMENTS;

export const ELEMENT_NAME = 'umd-element-events-date';
export type ELEMENT_TYPE = UMDEventsDateElement;
export class UMDEventsDateElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme'];
  }

  connectedCallback() {
    const element = this;
    const theme = element.getAttribute('theme') || 'light';
    const container = CreateShadowDom({ element });

    if (theme === 'dark') {
      container.classList.add(CONTAINER_DARK_CLASS);
    }

    element._shadow.appendChild(container);

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
