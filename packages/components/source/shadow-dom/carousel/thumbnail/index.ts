declare global {
  interface Window {
    UMDCarouselThumbnailElement: typeof UMDCarouselThumbnailElement;
  }
}

import { CarouselThumbnail } from 'elements';
import { MarkupCreate, Styles } from 'utilities';

const { Node, SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-carousel-thumbnail';
const ATTRIBUTE_RESIZE = 'resize';
const ATTRIBUTE_THEME = 'theme';

const SLOTS = {
  blocks: 'blocks',
};

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
  const theme = element.getAttribute(ATTRIBUTE_THEME);
  const slottedBlocks = Array.from(
    element.querySelectorAll(`[slot="${SLOTS.blocks}"] > *`),
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

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
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
