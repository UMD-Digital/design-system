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
} from './services/events';
import { CreateContent, OnLoadStyles, ComponentStyles } from './elements';

export const ELEMENT_NAME = 'umd-element-carousel-cards';
export type ELEMENT_TYPE = UMDCarouselCardsElement;
export class UMDCarouselCardsElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();

    const elementStyles = require('./styles/shadow-dom.css');
    const styles = `${elementStyles.toString()}${ComponentStyles}`;
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
  }

  eventMoveForward() {
    EventScrollCarousel({ element: this });
  }
}

export const Load = () => {
  if (!window.customElements.get(ELEMENT_NAME)) {
    const GetDefaultStyles = () => require('./styles/light-dom.css').toString();

    window.UMDCarouselCardsElement = UMDCarouselCardsElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselCardsElement);

    return GetDefaultStyles();
  }
};
