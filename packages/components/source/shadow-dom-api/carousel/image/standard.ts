declare global {
  interface Window {
    UMDCarouselImageStandardElement: typeof UMDCarouselImageStandardElement;
  }
}

import { CarouselImageStandard } from 'elements';
import { Attributes, AttributesNames, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { ImageHasAlt } = MarkupValidate;

const ELEMENT_NAME = 'umd-element-carousel-image';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${CarouselImageStandard.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });
const CreateShadowDom = ({
  element,
}: {
  element: UMDCarouselImageStandardElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isThemeDark({ element });
  const isFullScreenOption = Attributes.includesFullScreenOption({ element });
  const slottedImages = Array.from(
    element.querySelectorAll(`[slot="${Slots.IMAGES}"] > *`),
  ) as HTMLImageElement[];
  const slottedHeadlines = Array.from(
    element.querySelectorAll(`[slot="${Slots.HEADLINES}"] > *`),
  );
  const slottedTexts = Array.from(
    element.querySelectorAll(`[slot="${Slots.TEXTS}"] > *`),
  );
  const headlines = slottedHeadlines.map((headline) =>
    headline.cloneNode(true),
  ) as HTMLElement[];
  const texts = slottedTexts.map((text) =>
    text.cloneNode(true),
  ) as HTMLElement[];

  const images = slottedImages
    .map((image) => {
      if (image.nodeName === 'IMG') {
        if (ImageHasAlt({ image })) return image.cloneNode(true);
      }
      return null;
    })
    .filter((image) => image !== null) as HTMLImageElement[];

  if (!images) return;

  const carousel = CarouselImageStandard.CreateElement({
    images,
    headlines,
    texts,
    isThemeDark,
    isFullScreenOption,
  });

  element._elementRef = carousel;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  if (carousel.overlay) shadow.appendChild(carousel.overlay);
  shadow.appendChild(carousel.element);
};

class UMDCarouselImageStandardElement extends HTMLElement {
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
    return [AttributesNames.RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (
      name == AttributesNames.RESIZE &&
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
    window.UMDCarouselImageStandardElement = UMDCarouselImageStandardElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselImageStandardElement);
  }
};

export default {
  Load,
};
