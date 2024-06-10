declare global {
  interface Window {
    UMDCarouselCardsElement: typeof UMDCarouselCardsElement;
  }
}

import { CarouselCards } from 'elements';
import { MarkupCreate, Styles } from 'utilities';

const { SlotWithDefaultStyling, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-carousel-cards';
const ATTRIBUTE_RESIZE = 'resize';
const SLOTS = {
  HEADLINE: 'headline',
  TEXT: 'text',
  ACTIONS: 'actions',
  CARDS: 'cards',
};

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${CarouselCards.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });
const CreateShadowDom = ({ element }: { element: UMDCarouselCardsElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const slide = element.querySelector(`[slot="${SLOTS.CARDS}"]`) as HTMLElement;
  const cards = Array.from(
    slide.querySelectorAll(':scope > *'),
  ) as HTMLElement[];

  const createCardShadowRef = () => {
    const slot = Node.slot({ type: SLOTS.CARDS });
    element._shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${SLOTS.CARDS}"]`,
  ) as HTMLElement;
  const carousel = CarouselCards.CreateElement({
    slide,
    shadowRef,
    cards,
    headline: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.HEADLINE,
    }),
    text: SlotWithDefaultStyling({ element, slotRef: SLOTS.TEXT }),
    actions: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.ACTIONS,
    }),
  });

  element._elementRef = carousel;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(carousel.element);
  carousel.events.Load();
};

class UMDCarouselCardsElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      SetEventReize: () => void;
    };
  } | null;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
    this._elementRef = null;
  }

  static get observedAttributes() {
    return [ATTRIBUTE_RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == ATTRIBUTE_RESIZE && newValue === 'true' && this._elementRef) {
      this._elementRef.events.SetEventReize();
    }
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCarouselCardsElement = UMDCarouselCardsElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselCardsElement);
  }
};

export default {
  Load,
};
