import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { MakeTemplate } from 'helpers/ui';
import { Debounce } from 'helpers/performance';
import {
  ELEMENT_TYPE,
  BREAKPOINTS,
  BACKGROUND_TEXTURE,
  SLOT_NAME_CARDS,
} from './variables';
import { SizeCarousel } from './events';
import { CreateIntroColumn, IntroContainerStyles } from './elements/intro';
import {
  CreateCarouselColumn,
  CarouselContainerStyles,
} from './elements/carousel';

export const ELEMENT_NAME = 'umd-element-carousel-cards';

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
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
  }

  .${CAROUSEL_CONTAINER} ::slotted(*) {
    color: ${colors.white} !important;
  }

  .${CAROUSEL_CONTAINER_WRAPPER} {
    position: relative;
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_CONTAINER_WRAPPER} {
      display: flex;
      justify-content: space-between;
    }
  }

  ${IntroContainerStyles}
  ${CarouselContainerStyles}
`;

const OnLoadStyles = ({ element }: { element: ELEMENT_TYPE }) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
  ) as HTMLSlotElement;

  cardsSlot.style.display = `flex`;
  cardsSlot.style.justifyContent = `space-between`;
};

const CreateContent = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const intro = CreateIntroColumn();
  const carousel = CreateCarouselColumn({ element });

  container.classList.add(CAROUSEL_CONTAINER);
  wrapper.classList.add(CAROUSEL_CONTAINER_WRAPPER);
  wrapper.classList.add('umd-lock');

  wrapper.appendChild(intro);
  wrapper.appendChild(carousel);

  container.innerHTML = BACKGROUND_TEXTURE;
  container.appendChild(wrapper);

  return container;
};

export class UMDCarouselCardsElement extends HTMLElement {
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
    const element = this;
    const content = CreateContent({ element });
    const resize = () => SizeCarousel({ element });

    this._shadow.appendChild(content);

    SizeCarousel({ element });
    OnLoadStyles({ element });

    window.addEventListener('resize', Debounce(resize, 20));
  }
}
