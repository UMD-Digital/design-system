declare global {
  interface Window {
    UMDEventsDateSliderElement: typeof UMDEventsDateSliderElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { Debounce } from 'helpers/performance';
import { ComponentStyles, CreateContainer, OnLoadStyles } from './elements';
import { EventResize, EventSwipe } from './services/events';
import { ButtonVisibilityLogic, SizeDatesElements } from './services/helpers';
import { ELEMENTS } from './globals';

export const ELEMENT_NAME = 'umd-element-events-date-slider';
export type ELEMENT_TYPE = UMDEventsDateSliderElement;
export class UMDEventsDateSliderElement extends HTMLElement {
  _shadow: ShadowRoot;
  _element: null | HTMLElement = null;
  _count = 0;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme', 'aria-hidden'];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == 'aria-hidden' && newValue === 'false' && oldValue === null) {
      SizeDatesElements({ element: this });
    }
  }

  connectedCallback() {
    const element = this;
    const theme = element.getAttribute('theme') || 'light';
    const container = CreateContainer({ element });

    const resize = () => {
      EventResize({ element });
    };

    if (theme === 'dark') {
      container.classList.add(ELEMENTS.CONTAINER_DARK_CLASS);
    }

    element._shadow.appendChild(container);
    OnLoadStyles({ element });
    window.addEventListener('resize', Debounce(resize, 20));
    EventSwipe({ container, element });
    ButtonVisibilityLogic({ element });
  }

  setCountForward = () => {
    this._count = this._count + 1;
  };

  setCountBackward = () => {
    this._count = this._count - 1;
  };
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDEventsDateSliderElement = UMDEventsDateSliderElement;
    window.customElements.define(ELEMENT_NAME, UMDEventsDateSliderElement);

    return require('./styles/light-dom.css').toString();
  }

  return '';
};
