declare global {
  interface Window {
    UMDNavDrawer: typeof UMDNavDrawer;
  }
}

import { MarkupCreate } from 'utilities';
import { EventClose, EventOpen, EventSlide } from './services/events';
import { ComponentStyles, CreateShadowDom } from './elements';
import { VARIABLES } from './globals';

const { ELEMENT_NAME } = VARIABLES;

export class UMDNavDrawer extends HTMLElement {
  _shadow: ShadowRoot;
  _upcomingSlide: null | string;
  _previousSlide: null | string;
  _currentSlide: null | HTMLDivElement;
  _focusCallback: null | (() => void);

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._upcomingSlide = null;
    this._previousSlide = null;
    this._currentSlide = null;
    this._focusCallback = null;

    const styles = `${ComponentStyles}`;
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
  }

  eventOpen() {
    EventOpen({ element: this });
  }

  eventClose() {
    EventClose({ element: this });
  }

  eventSlideLeft() {
    EventSlide({ element: this });
  }

  eventSlideRight() {
    EventSlide({ element: this, isRight: true });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDNavDrawer = UMDNavDrawer;
    window.customElements.define(ELEMENT_NAME, UMDNavDrawer);
  }
};
