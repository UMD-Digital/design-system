declare global {
  interface Window {
    UMDCarouselThumbnailElement: typeof UMDCarouselThumbnailElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;

const ELEMENT_NAME = 'umd-element-carousel-thumbnail';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.carousel.thumbnail.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });
const CreateShadowDom = ({
  element,
}: {
  element: UMDCarouselThumbnailElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isTheme.dark({ element });
  const slottedBlocks = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.BLOCKS}"] > *`),
  ) as HTMLElement[];

  const blocks = slottedBlocks.map((block) =>
    block.cloneNode(true),
  ) as HTMLElement[];

  const carousel = Composite.carousel.thumbnail.CreateElement({
    blocks,
    isThemeDark,
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

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCarouselThumbnailElement = UMDCarouselThumbnailElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselThumbnailElement);
  }
};
