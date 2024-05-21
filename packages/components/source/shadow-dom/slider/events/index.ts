declare global {
  interface Window {
    UMDEventsDateSliderElement: typeof UMDEventsDateSliderElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { SliderEvents } from 'elements';

const { SlotWithDefaultStyling, SlotOberserver } = MarkupCreate;

const ATTRIBUTE_RESIZE = 'resize';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const SLOTS = {
  EVENT_LIST: 'event-list',
  HEADLINE: 'headline',
  ACTIONS: 'actions',
};

const ELEMENT_NAME = 'umd-element-slider-events';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${SliderEvents.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = ({
  element,
}: {
  element: UMDEventsDateSliderElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const dataSlider = document.createElement('div');
  const dataSliderSlot = element.querySelector(`[slot=${SLOTS.EVENT_LIST}]`);

  if (!dataSliderSlot) {
    throw new Error(`Slot ${SLOTS.EVENT_LIST} is required`);
  }

  dataSlider.innerHTML = dataSliderSlot.innerHTML;

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

export class UMDEventsDateSliderElement extends HTMLElement {
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

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDEventsDateSliderElement = UMDEventsDateSliderElement;
    window.customElements.define(ELEMENT_NAME, UMDEventsDateSliderElement);
  }
};
