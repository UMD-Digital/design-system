declare global {
  interface Window {
    UMDNavDrawer: typeof UMDNavDrawer;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { EventClose, EventOpen, EventSlide } from './services/events';
import { ComponentStyles, CreateShadowDom } from './elements';

export const ELEMENT_NAME = 'umd-element-nav-drawer';
export type NavDrawerType = UMDNavDrawer;
export class UMDNavDrawer extends HTMLElement {
  _shadow: ShadowRoot;
  _upcomingSlide: null | string;
  _previousSlide: null | string;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._upcomingSlide = null;
    this._previousSlide = null;

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

    this._shadow.appendChild(container);
  }

  eventOpen() {
    EventOpen({ element: this });
  }

  eventClose() {
    EventClose({ element: this });
  }

  eventSlide() {
    EventSlide({ element: this });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDNavDrawer = UMDNavDrawer;
    window.customElements.define(ELEMENT_NAME, UMDNavDrawer);

    return require('./styles/light-dom.css').toString();
  }

  return '';
};
