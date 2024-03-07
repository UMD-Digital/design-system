declare global {
  interface Window {
    UMDCardOverlayElement: typeof UMDCardOverlayElement;
  }
}

import { MakeTemplate, SlotOberserver } from 'helpers/ui';
import { Debounce } from 'helpers/performance';
import { ComponentStyles, CreateShadowDom } from './elements';
import { SLOTS } from './globals';
import { EventResize } from './services/events';
import { GifFunctionality } from './services/helper';

export const ELEMENT_NAME = 'umd-element-card-overlay';
export type CardType = UMDCardOverlayElement;
export class UMDCardOverlayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _theme = 'light';

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
    const resizeEvent = () => {
      EventResize({ element });
    };

    element._theme = element.getAttribute('theme') || element._theme;
    this._shadow.appendChild(CreateShadowDom({ element }));

    window.addEventListener('resize', Debounce(resizeEvent, 20));
    resizeEvent();
    GifFunctionality({ element });
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
    window.UMDCardOverlayElement = UMDCardOverlayElement;
    window.customElements.define(ELEMENT_NAME, UMDCardOverlayElement);
  }
};
