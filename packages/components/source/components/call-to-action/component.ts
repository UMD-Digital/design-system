declare global {
  interface Window {
    UMDCallToActionElement: typeof UMDCallToActionElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';
import { EventSize } from './services/events';
import { Debounce } from 'helpers/performance';

export const ELEMENT_NAME = 'umd-element-call-to-action';
export type CallToActionType = UMDCallToActionElement;
export class UMDCallToActionElement extends HTMLElement {
  _shadow: ShadowRoot;
  _type = VARIABLES.TYPE_PRIMARY;
  _size = VARIABLES.SIZE_STANDARD;

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
    const element = this;
    const resize = () => {
      EventSize({ element });
    };

    element._size = element.getAttribute('size') || element._size;
    element._type = element.getAttribute('type') || element._type;

    const container = CreateShadowDom({ element });

    if (!container) return;
    this._shadow.appendChild(container);
    resize();

    window.addEventListener('resize', Debounce(resize, 20));
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCallToActionElement = UMDCallToActionElement;
    window.customElements.define(ELEMENT_NAME, UMDCallToActionElement);

    return require('./styles/light-dom.css').toString();
  }

  return '';
};
