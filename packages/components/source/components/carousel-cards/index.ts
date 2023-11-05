import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import { MakeTemplate } from 'helpers/ui';
import { ELEMENT_TYPE, BREAKPOINTS, BACKGROUND_TEXTURE } from './variables';
import { CreateIntroColumn } from './elements/intro';

export const ELEMENT_CAROUSEL_CARDS_NAME = 'umd-element-carousel-cards';

const CAROUSEL_CONTAINER = 'umd-element-carousel-container';
const CAROUSEL_CONTAINER_WRAPPER = 'umd-element-carousel-container-wrapper';
const ComponentStyles = `
  :host {
    display: block !important;
    position: relative !important;
    container: umd-carousel-card / inline-size; 
  }

  .${CAROUSEL_CONTAINER} {
    background-color: ${colors.black};
    padding: ${spacing.md} 0;
    min-height: 40vh;
    position: relative;
    overflow: hidden;
  }

  @container umd-carousel-card (max-width: 300px) {
    .${CAROUSEL_CONTAINER} {
      display: none;
    }
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.medium}px) {
    .${CAROUSEL_CONTAINER} {
      padding: ${spacing['4xl']} 0;
    }
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_CONTAINER} {
      padding: ${spacing['max']} 0;
    }
  }

  .${CAROUSEL_CONTAINER} > svg {
    width: auto;
    object-fit: cover;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .${CAROUSEL_CONTAINER} ::slotted(*) {
    color: ${colors.white} !important;
  }

  .${CAROUSEL_CONTAINER_WRAPPER} {
    position: relative;
  }
`;

const CreateContent = () => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const intro = CreateIntroColumn();

  container.classList.add(CAROUSEL_CONTAINER);
  wrapper.classList.add(CAROUSEL_CONTAINER_WRAPPER);
  wrapper.classList.add('umd-lock');

  wrapper.appendChild(intro);

  container.innerHTML = BACKGROUND_TEXTURE;
  container.appendChild(wrapper);

  return container;
};

export class UMDCarouselCards extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();

    const ElementStyles = require('./index.css');
    const styles = `${ElementStyles.toString()}${ComponentStyles}`;
    const template = MakeTemplate({ styles });

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
    const content = CreateContent();

    this._shadow.appendChild(content);
  }
}

if (!window.customElements.get(ELEMENT_CAROUSEL_CARDS_NAME)) {
  window.UMDCarouselCards = UMDCarouselCards;
  window.customElements.define(ELEMENT_CAROUSEL_CARDS_NAME, UMDCarouselCards);
}
