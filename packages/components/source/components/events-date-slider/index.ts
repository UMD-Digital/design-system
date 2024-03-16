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
import { VARIABLES } from './globals';

const { ATTRIBUTE_RESIZE, ATTRIBUTE_THEME, THEME_LIGHT } = VARIABLES;

export const ELEMENT_NAME = 'umd-element-events-date-slider';
export type ELEMENT_TYPE = UMDEventsDateSliderElement;
export class UMDEventsDateSliderElement extends HTMLElement {
  _shadow: ShadowRoot;
  _element: null | HTMLElement = null;
  _theme: string;
  _count = 0;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
    this._theme = THEME_LIGHT;

    const styles = `${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [ATTRIBUTE_THEME, ATTRIBUTE_RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == ATTRIBUTE_RESIZE && newValue === 'true') {
      SizeDatesElements({ element: this });
    }
  }

  connectedCallback() {
    const element = this;
    const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;

    const resize = () => {
      EventResize({ element });
    };

    element._theme = theme;
    element._shadow.appendChild(CreateContainer({ element }));

    OnLoadStyles({ element });
    EventSwipe({ element });
    ButtonVisibilityLogic({ element });
    window.addEventListener('resize', Debounce(resize, 20));
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
  }
};
