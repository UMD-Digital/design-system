declare global {
  interface Window {
    UMDSliderEventsFeedElement: typeof UMDSliderEventsFeedElement;
  }
}

import { SliderEvents, FeedsSlides } from 'elements';
import { Attributes, AttributeNames, Slots } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';

const ELEMENT_NAME = 'umd-element-slider-events-feed';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${SliderEvents.Styles}
  ${FeedsSlides.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = async ({
  element,
}: {
  element: UMDSliderEventsFeedElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isThemeDark({ element });
  const token = element.getAttribute(AttributeNames.FEED_TOKEN);
  const type = element.getAttribute(AttributeNames.TYPE) || 'academic';
  const categories = element.getAttribute('categories');

  if (!token) throw new Error('Token is required for this component');

  const dataSlider = document.createElement('div');
  const slides: HTMLElement[] = await FeedsSlides.CreateElement({
    token,
    type,
    categories,
    isThemeDark,
  });

  if (!slides) return;

  slides.forEach((slide) => dataSlider.appendChild(slide));

  const slider = SliderEvents.CreateElement({
    isThemeDark,
    dataSlider,
    headline: Slots.SlottedHeadline({ element }),
    actions: Slots.SlottedActions({ element }),
  });

  element._elementRef = slider;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(slider.element);
  slider.events.SetDateElementsSizes();
};

export class UMDSliderEventsFeedElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      SetDateElementsSizes: () => void;
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
    if (name == AttributeNames.RESIZE && newValue === 'true') {
      if (this._elementRef) this._elementRef.events.SetDateElementsSizes();
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
    window.UMDSliderEventsFeedElement = UMDSliderEventsFeedElement;
    window.customElements.define(ELEMENT_NAME, UMDSliderEventsFeedElement);
  }
};

export default {
  Load,
};
