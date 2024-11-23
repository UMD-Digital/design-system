declare global {
  interface Window {
    UMDSliderEventsElement: typeof UMDSliderEventsElement;
  }
}

import { SliderEvents } from 'elements';
import { Attributes, Slots } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';

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
  const isThemeDark = Attributes.checks.isThemeDark({ element });
  const dataSlider = document.createElement('div');
  const dataSliderSlot = element.querySelector(
    `[slot=${Slots.name.EVENT_LIST}]`,
  );

  if (!dataSliderSlot) {
    throw new Error(`Slot ${Slots.name.EVENT_LIST} is required`);
  }

  dataSlider.innerHTML = dataSliderSlot.innerHTML;

  const slider = SliderEvents.CreateElement({
    isThemeDark,
    dataSlider,
    headline: Slots.defined.headline({ element }),
    actions: Slots.defined.actions({ element }),
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
    return [Attributes.names.RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == Attributes.names.RESIZE && newValue === 'true') {
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
