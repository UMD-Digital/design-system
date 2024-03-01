declare global {
  interface Window {
    UMDAccordionElement: typeof UMDAccordionElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import ComponentStyles, { CreateShadowDom } from './elements';
import { ELEMENT_NAME, VARIABLES } from './globals';
import { Debounce } from 'helpers/performance';
import { EventAdjustHeight } from './services/events';

const { THEME_DEFAULT, OPEN_DEFAULT } = VARIABLES;
export type ELEMENT_TYPE = UMDAccordionElement;

export class UMDAccordionElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = THEME_DEFAULT;
  _open = OPEN_DEFAULT;

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
    if (name == 'aria-hidden' && newValue === 'false' && oldValue === 'true') {
      EventAdjustHeight({
        element: this,
        maintainExpandState: true,
        noTransition: true,
      });
    }
  }

  connectedCallback() {
    const element = this;
    const theme = element.getAttribute('theme');
    const open = element.hasAttribute('open');

    element._theme = theme || element._theme;
    element._open = open || element._open;

    const container = CreateShadowDom({ element });
    element._shadow.appendChild(container);

    const resize = () => {
      EventAdjustHeight({ element: element, maintainExpandState: true });
    };

    window.addEventListener('resize', Debounce(resize, 20));

    EventAdjustHeight({
      element,
      maintainExpandState: true,
      noTransition: true,
    });
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
