declare global {
  interface Window {
    UMDAccordionElement: typeof UMDAccordionElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import ComponentStyles, { CreateShadowDom } from './elements';
import { ELEMENT_NAME, VARIABLES } from './globals';
import { Debounce } from 'helpers/performance';
import { SetClosed, SetOpen } from './services/helper';
import { EventSize } from './services/events';

const { THEME_LIGHT, ATTRIBUTE_THEME } = VARIABLES;
export type ELEMENT_TYPE = UMDAccordionElement;

export class UMDAccordionElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = THEME_LIGHT;
  _open = false;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['aria-hidden'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!oldValue) return;

    if (name == 'aria-hidden' && newValue === 'false' && oldValue === 'true') {
      SetOpen({ element: this });
    }

    if (name == 'aria-hidden' && newValue === 'true' && oldValue === 'false') {
      SetClosed({ element: this });
    }
  }

  connectedCallback() {
    const element = this;
    const theme = element.getAttribute(ATTRIBUTE_THEME);
    const ariaHidden = element.getAttribute('aria-hidden');
    const isOpen = ariaHidden && ariaHidden === 'false';

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
