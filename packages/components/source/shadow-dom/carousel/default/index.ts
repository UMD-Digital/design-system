declare global {
  interface Window {
    UMDCarouselElement: typeof UMDCarouselElement;
  }
}

import { Carousel } from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';

const { Node } = MarkupCreate;
const { Attributes, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-carousel';

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
  const theme = element.getAttribute('theme');
  const attributeLeftButton = element.getAttribute('left-button');
  const attributeRightButton = element.getAttribute('right-button');
  const attributeMobileHint = element.getAttribute('mobile-hint');
  const attributeHint = element.getAttribute('hint');
  const tabletSize = element.getAttribute('tablet-size');
  const desktopSize = element.getAttribute('desktop-size');
  const tabletCount = element.getAttribute('tablet-count');
  const desktopCount = element.getAttribute('desktop-count');
  const maxCount = element.getAttribute('max-count');
  const gridGap = element.getAttribute('grid-gap-pixels');
  const slide = element.querySelector(
    `[slot="${Slots.BLOCKS}"]`,
  ) as HTMLElement;
  const blocks = Array.from(
    slide.querySelectorAll(':scope > *'),
  ) as HTMLElement[];
  let hasLeftButton = true;
  let hasRightButton = true;
  let mobileHint = true;
  let hint = true;

  if (attributeLeftButton === 'false') hasLeftButton = false;
  if (attributeRightButton === 'false') hasRightButton = false;
  if (attributeMobileHint === 'false') mobileHint = false;
  if (attributeHint === 'false') hint = false;

  const createCardShadowRef = () => {
    const slot = Node.slot({ type: Slots.BLOCKS });
    element._shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${Slots.BLOCKS}"]`,
  ) as HTMLElement;
  const carousel = Carousel.CreateElement({
    slide,
    shadowRef,
    blocks,
    theme,
    hasLeftButton,
    hasRightButton,
    mobileHint,
    hint,
    tabletSize: tabletSize ? parseInt(tabletSize) : undefined,
    desktopSize: desktopSize ? parseInt(desktopSize) : undefined,
    tabletCount: tabletCount ? parseInt(tabletCount) : undefined,
    desktopCount: desktopCount ? parseInt(desktopCount) : undefined,
    maxCount: maxCount ? parseInt(maxCount) : undefined,
    gridGap,
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
    return [Attributes.RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == Attributes.RESIZE && newValue === 'true' && this._elementRef) {
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
