declare global {
  interface Window {
    UMDCarouselElement: typeof UMDCarouselElement;
  }
}

import { Carousel } from 'elements';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-carousel';
const ATTRIBUTE_RESIZE = 'resize';
const SLOTS = {
  BLOCKS: 'blocks',
};

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${Carousel.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDCarouselElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const slide = element.querySelector(
    `[slot="${SLOTS.BLOCKS}"]`,
  ) as HTMLElement;
  const blocks = Array.from(
    slide.querySelectorAll(':scope > *'),
  ) as HTMLElement[];

  const createCardShadowRef = () => {
    const slot = Node.slot({ type: SLOTS.BLOCKS });
    element._shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${SLOTS.BLOCKS}"]`,
  ) as HTMLElement;
  const carousel = Carousel.CreateElement({
    slide,
    shadowRef,
    blocks,
  });

  element._elementRef = carousel;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(carousel.element);
  carousel.events.load();
};

class UMDCarouselElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      resize: () => void;
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
      this._elementRef.events.resize();
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
    window.UMDCarouselElement = UMDCarouselElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselElement);
  }
};

export default {
  Load,
};