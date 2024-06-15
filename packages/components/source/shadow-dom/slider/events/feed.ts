declare global {
  interface Window {
    UMDSliderEventsFeedElement: typeof UMDSliderEventsFeedElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { SliderEvents, FeedsSlides } from 'elements';

const { SlotWithDefaultStyling } = MarkupCreate;

const ATTRIBUTE_RESIZE = 'resize';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const ATTRIBUTE_TOKEN = 'token';
const THEME_LIGHT = 'light';
const SLOTS = {
  HEADLINE: 'headline',
  ACTIONS: 'actions',
};

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
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const token = element.getAttribute(ATTRIBUTE_TOKEN);
  const type = element.getAttribute(ATTRIBUTE_TYPE) || 'academic';
  const categories = element.getAttribute('categories');

  if (!token) throw new Error('Token is required for this component');

  const dataSlider = document.createElement('div');
  const slides: HTMLElement[] = await FeedsSlides.CreateElement({
    token,
    type,
    categories,
    theme,
  });

  if (!slides) return;

  slides.forEach((slide) => dataSlider.appendChild(slide));

  const slider = SliderEvents.CreateElement({
    theme,
    dataSlider,
    headline: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.HEADLINE,
    }),
    actions: SlotWithDefaultStyling({
      element,
      slotRef: SLOTS.ACTIONS,
    }),
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
    return [ATTRIBUTE_RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == ATTRIBUTE_RESIZE && newValue === 'true') {
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
