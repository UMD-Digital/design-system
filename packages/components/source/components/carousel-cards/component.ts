declare global {
  interface Window {
    UMDCarouselCardsElement: typeof UMDCarouselCardsElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { Debounce } from 'helpers/performance';
import {
  EventResizeCarouselElementsWidth,
  EventResizeSetHeight,
  EventScrollCarousel,
  EventSwipe,
} from './services/events';
import { CreateContent, OnLoadStyles, ComponentStyles } from './elements';

export const ELEMENT_NAME = 'umd-element-carousel-cards';
export type ELEMENT_TYPE = UMDCarouselCardsElement;
export class UMDCarouselCardsElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const content = CreateContent({ element });
    const resize = () => {
      EventResizeCarouselElementsWidth({ element });
      EventResizeSetHeight({ element });
    };

    this._shadow.appendChild(content);
    OnLoadStyles({ element });

    window.addEventListener('resize', Debounce(resize, 20));
    EventSwipe({ container: content, element });
  }

  eventMoveForward() {
    EventScrollCarousel({ element: this });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCarouselCardsElement = UMDCarouselCardsElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselCardsElement);

    return require('./styles/light-dom.css').toString();
  }

  return '';
};
