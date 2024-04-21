declare global {
  interface Window {
    UMDAccordionElement: typeof UMDAccordionElement;
  }
}

import { Performance } from 'utilities';
import { MarkupCreate } from 'utilities';
import ComponentStyles, { CreateShadowDom } from './elements';
import { ELEMENT_NAME, VARIABLES } from './globals';
import { SetClosed, SetOpen } from './services/helper';
import { EventSize } from './services/events';

const { Debounce } = Performance;

const {
  THEME_LIGHT,
  ATTRIBUTE_THEME,
  ATTRIBUTE_RESIZE,
  ATTRIBUTE_STATE,
  STATE_OPEN,
  STATE_CLOSED,
} = VARIABLES;
export type ELEMENT_TYPE = UMDAccordionElement;

export class UMDAccordionElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = THEME_LIGHT;
  _open = false;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MarkupCreate.Node.stylesTemplate({ styles });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_RESIZE, ATTRIBUTE_STATE];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === ATTRIBUTE_RESIZE && newValue === 'true') {
      SetOpen({ element: this, hasAnimation: false });
    }

    if (
      name == ATTRIBUTE_STATE &&
      newValue === STATE_CLOSED &&
      oldValue === STATE_OPEN
    ) {
      SetClosed({ element: this });
    }

    if (
      name == ATTRIBUTE_STATE &&
      newValue === STATE_OPEN &&
      oldValue === STATE_CLOSED
    ) {
      SetOpen({ element: this });
    }
  }

  connectedCallback() {
    const element = this;
    const theme = element.getAttribute(ATTRIBUTE_THEME);
    const state = element.getAttribute(ATTRIBUTE_STATE);
    const isOpen = state && state === STATE_OPEN;

    element._theme = theme || element._theme;
    element._open = isOpen || element._open;
    element._shadow.appendChild(CreateShadowDom({ element }));

    const resize = () => {
      EventSize({ element: element });
    };

    window.addEventListener('resize', Debounce(resize, 20));
    if (element._open) {
      SetOpen({ element: element, hasAnimation: false });
    }
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDAccordionElement = UMDAccordionElement;
    window.customElements.define(ELEMENT_NAME, UMDAccordionElement);
  }
};
