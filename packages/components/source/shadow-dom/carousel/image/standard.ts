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
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_FULLSCREEN = 'option-full-screen';

const SLOTS = {
  IMAGES: 'images',
  HEADLINES: 'headlines',
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
  const theme = element.getAttribute(ATTRIBUTE_THEME);
  const isFullScreenOption =
    element.getAttribute(ATTRIBUTE_FULLSCREEN) !== 'false';
  const slottedImages = Array.from(
    element.querySelectorAll(`[slot="${SLOTS.IMAGES}"] > *`),
  ) as HTMLImageElement[];
  const slottedHeadlines = Array.from(
    element.querySelectorAll(`[slot="${SLOTS.HEADLINES}"] > *`),
  );
  const headlines = slottedHeadlines.map((headline) =>
    headline.cloneNode(true),
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
    theme,
    isFullScreenOption,
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(carousel.element);
  carousel.events.Load();
};

class UMDCarouselImageStandardElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      Load: () => void;
    };
  } | null;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
    this._elementRef = null;
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
