declare global {
  interface Window {
    UMDCarouselThumbnailElement: typeof UMDCarouselThumbnailElement;
  }
}

import { CarouselThumbnail } from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';

const { Node } = MarkupCreate;
const { Attributes, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-carousel-thumbnail';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${CarouselThumbnail.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });
const CreateShadowDom = ({
  element,
}: {
  element: UMDCarouselThumbnailElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const theme = element.getAttribute(Attributes.THEME);
  const slottedBlocks = Array.from(
    element.querySelectorAll(`[slot="${Slots.BLOCKS}"] > *`),
  ) as HTMLElement[];

  const blocks = slottedBlocks.map((block) =>
    block.cloneNode(true),
  ) as HTMLElement[];

  const carousel = CarouselThumbnail.CreateElement({
    blocks,
    theme,
  });

  element._elementRef = carousel;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(carousel.element);
  carousel.events.Load();
};

class UMDCarouselThumbnailElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      SetEventReize: () => void;
      Load: () => void;
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
    window.UMDCarouselThumbnailElement = UMDCarouselThumbnailElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselThumbnailElement);
  }
};

export default {
  Load,
};
