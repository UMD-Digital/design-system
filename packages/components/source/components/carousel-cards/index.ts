import { ELEMENT_TYPE } from './variables';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block !important;
      position: relative !important;
      container: umd-carousel-card / inline-size; 
    }
  
  </style>
`;

export const ELEMENT_CAROUSEL_CARDS_NAME = 'umd-element-carousel-cards';

export class UMDCarouselCards extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {}

  connectedCallback() {
    console.log('called');
  }
}

if (!window.customElements.get(ELEMENT_CAROUSEL_CARDS_NAME)) {
  window.UMDCarouselCards = UMDCarouselCards;
  window.customElements.define(ELEMENT_CAROUSEL_CARDS_NAME, UMDCarouselCards);
}
