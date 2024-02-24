declare global {
  interface Window {
    UMDAccordionElement: typeof UMDAccordionElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import ComponentStyles, { CreateShadowDom } from './elements';
import { ELEMENT_NAME } from './globals';
import { Debounce } from './services/helper';
import { EventToggleExpand } from './services/events';

export type ELEMENT_TYPE = UMDAccordionElement;

export class UMDAccordionElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  connectedCallback() {
    const container = CreateShadowDom({ element: this });
    const element = this;

    this._shadow.appendChild(container);

    const headlineContainer = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;

    const resize = () => {
      const isExpanded = headlineContainer.ariaExpanded === 'true';

      EventToggleExpand({ element, expand: isExpanded });
    };

    window.addEventListener('resize', Debounce(resize, 20));
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
