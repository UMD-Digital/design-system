declare global {
  interface Window {
    UMDCarouselCardsElement: typeof UMDCarouselCardsElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { CarouselCards } = Composite;

const ELEMENT_NAME = 'umd-element-carousel-cards';

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
  const slide = element.querySelector(
    `[slot="${Slots.name.CARDS}"]`,
  ) as HTMLElement;
  const cards = Array.from(
    slide.querySelectorAll(':scope > *'),
  ) as HTMLElement[];

  const createCardShadowRef = () => {
    const slot = Node.slot({ type: Slots.name.CARDS });
    element._shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${Slots.name.CARDS}"]`,
  ) as HTMLElement;
  const carousel = CarouselCards.CreateElement({
    slide,
    shadowRef,
    cards,
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
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
    return [Attributes.names.RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (
      name == Attributes.names.RESIZE &&
      newValue === 'true' &&
      this._elementRef
    ) {
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
