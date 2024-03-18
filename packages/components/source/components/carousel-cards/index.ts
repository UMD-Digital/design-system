declare global {
  interface Window {
    UMDCarouselCardsElement: typeof UMDCarouselCardsElement;
  }
}

import { MakeTemplate, SlotOberserver } from 'helpers/ui';
import { Debounce } from 'helpers/performance';
import {
  EventResizeButtonLogic,
  EventResizeCarouselElementsWidth,
  EventResizeSetHeight,
  EventScrollCarousel,
  EventSwipe,
} from './services/events';
import { CreateShadowDom, OnLoadStyles, ComponentStyles } from './elements';
import { SLOTS, VARIABLES } from './globals';

const { ATTRIBUTE_RESIZE, ELEMENT_NAME } = VARIABLES;

export class UMDCarouselCardsElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == ATTRIBUTE_RESIZE && newValue === 'true') {
      EventResizeCarouselElementsWidth({ element: this });
      EventResizeSetHeight({ element: this });
      EventResizeButtonLogic({ element: this });
    }
  }

  connectedCallback() {
    const element = this;
    const content = CreateShadowDom({ element });
    const resize = () => {
      EventResizeCarouselElementsWidth({ element });
      EventResizeSetHeight({ element });
      EventResizeButtonLogic({ element });
    };

    this._shadow.appendChild(content);
    OnLoadStyles({ element });

    window.addEventListener('resize', Debounce(resize, 20));
    EventSwipe({ container: content, element });
    EventResizeButtonLogic({ element });
    SlotOberserver({
      element,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
  }

  eventMoveForward() {
    EventScrollCarousel({ element: this });
  }

  eventMoveBackwards() {
    EventScrollCarousel({ element: this, isDirectionRight: false });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCarouselCardsElement = UMDCarouselCardsElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselCardsElement);
  }
};
