declare global {
  interface Window {
    UMDCarouselImageStandardElement: typeof UMDCarouselImageStandardElement;
  }
}

import { CarouselImageStandard } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { ImageHasAlt } = MarkupValidate;

const ELEMENT_NAME = 'umd-element-carousel-image';
const SLOTS = {
  IMAGES: 'images',
};

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
  const slottedImages = Array.from(
    element.querySelectorAll(`slot[name="${SLOTS.IMAGES}"] > *`),
  );
  const images = slottedImages
    .map((image) => {
      if (image instanceof HTMLImageElement) {
        if (ImageHasAlt({ image })) return image.cloneNode(true);
      }
      return null;
    })
    .filter((image) => image !== null) as HTMLImageElement[];

  if (!images) return;

  const carousel = CarouselImageStandard.CreateElement({
    images,
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(carousel);
};

class UMDCarouselImageStandardElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
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
