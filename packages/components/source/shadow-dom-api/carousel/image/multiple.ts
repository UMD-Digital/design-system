declare global {
  interface Window {
    UMDCarouselImageMultipleElement: typeof UMDCarouselImageMultipleElement;
  }
}

import { CarouselImageMultiple } from 'elements';
import { Attributes, AttributeNames, Slots } from 'shadow-dom-model';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { ImageHasAlt } = MarkupValidate;

const ELEMENT_NAME = 'umd-element-carousel-multiple-image';
const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${CarouselImageMultiple.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });
const CreateShadowDom = ({
  element,
}: {
  element: UMDCarouselImageMultipleElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isThemeDark({ element });
  const isFullScreenOption = Attributes.includesFullScreenOption({ element });
  const slottedImages = Array.from(
    element.querySelectorAll(`[slot="${Slots.IMAGES}"] > *`),
  ) as HTMLImageElement[];

  const images = slottedImages
    .map((image) => {
      if (image.nodeName === 'IMG') {
        if (ImageHasAlt({ image })) return image.cloneNode(true);
      }
      return null;
    })
    .filter((image) => image !== null) as HTMLImageElement[];

  if (!images) return;

  const carousel = CarouselImageMultiple.CreateElement({
    images,
    isThemeDark,
    isFullScreenOption,
  });

  element._elementRef = carousel;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  if (carousel.overlay) shadow.appendChild(carousel.overlay);
  shadow.appendChild(carousel.element);
};

class UMDCarouselImageMultipleElement extends HTMLElement {
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
    return [AttributeNames.RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (
      name == AttributeNames.RESIZE &&
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
    window.UMDCarouselImageMultipleElement = UMDCarouselImageMultipleElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselImageMultipleElement);
  }
};

export default {
  Load,
};
