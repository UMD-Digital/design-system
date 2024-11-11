declare global {
  interface Window {
    UMDSliderEventsElement: typeof UMDSliderEventsElement;
  }
}

import { SliderEvents } from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { AttributesNames, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-slider-events';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${SliderEvents.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDSliderEventsElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const theme =
    element.getAttribute(AttributesNames.THEME) || AttributesValues.THEME_LIGHT;
  const dataSlider = document.createElement('div');
  const dataSliderSlot = element.querySelector(`[slot=${Slots.EVENT_LIST}]`);

  if (!dataSliderSlot) {
    throw new Error(`Slot ${Slots.EVENT_LIST} is required`);
  }

  dataSlider.innerHTML = dataSliderSlot.innerHTML;

  const slider = SliderEvents.CreateElement({
    theme,
    dataSlider,
    headline: Slots.SlottedHeadline({ element }),
    actions: Slots.SlottedActions({ element }),
  });

  element._elementRef = slider;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(slider.element);
  slider.events.SetDateElementsSizes();
};

export class UMDSliderEventsElement extends HTMLElement {
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
    return [AttributesNames.RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == AttributesNames.RESIZE && newValue === 'true') {
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
    window.UMDSliderEventsElement = UMDSliderEventsElement;
    window.customElements.define(ELEMENT_NAME, UMDSliderEventsElement);
  }
};

export default {
  Load,
};
