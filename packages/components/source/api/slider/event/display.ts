declare global {
  interface Window {
    UMDSliderEventsElement: typeof UMDSliderEventsElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const ELEMENT_NAME = 'umd-element-slider-events';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.slider.events.Styles}
`;

const styleTemplate = Markup.create.Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDSliderEventsElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isTheme.dark({ element });
  const dataSlider = document.createElement('div');
  const dataSliderSlot = element.querySelector(
    `[slot=${Slots.name.EVENT_LIST}]`,
  );

  if (!dataSliderSlot) {
    throw new Error(`Slot ${Slots.name.EVENT_LIST} is required`);
  }

  dataSlider.innerHTML = dataSliderSlot.innerHTML;

  const slider = Composite.slider.events.CreateElement({
    isThemeDark,
    dataSlider,
    headline: Slots.headline.default({ element }),
    actions: Slots.actions.default({ element }),
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

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDSliderEventsElement = UMDSliderEventsElement;
    window.customElements.define(ELEMENT_NAME, UMDSliderEventsElement);
  }
};
