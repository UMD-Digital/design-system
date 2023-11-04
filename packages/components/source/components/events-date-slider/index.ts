import { Debounce } from '../../helpers/performance';
import { ContainerStyles, CreateContainer } from './elements';
import {
  SizeDatesElements,
  EventResize,
  EventSwipe,
  ButtonVisibilityLogic,
} from './events';
import {
  CONTAINER_DARK_CLASS,
  DATE_SLOT_NAME,
  ELEMENT_TYPE,
} from './variables';

export const ELEMENT_EVENTS_DATES_SLIDER_NAME =
  'umd-element-events-date-slider';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block !important;
      position: relative !important;
      text-wrap: pretty;
      container: dates-slider / inline-size; 
    }
  
    ${ContainerStyles}
  </style>
`;

const OnLoadStyles = ({ element }: { element: ELEMENT_TYPE }) => {
  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;

  slider.style.display = 'flex';
  slider.style.position = 'absolute';
  slider.style.top = '0';
  slider.style.left = '0';

  SizeDatesElements({ element });
};

export class UMDEventsDateSliderElement extends HTMLElement {
  _shadow: ShadowRoot;
  _element: null | HTMLElement = null;
  _count = 0;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme', 'aria-hidden'];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == 'aria-hidden' && newValue === 'false' && oldValue === null) {
      SizeDatesElements({ element: this });
    }
  }

  connectedCallback() {
    const element = this;
    const theme = element.getAttribute('theme') || 'light';
    const container = CreateContainer({ element });

    const resize = () => {
      EventResize({ element });
    };

    if (theme === 'dark') {
      container.classList.add(CONTAINER_DARK_CLASS);
    }

    element._shadow.appendChild(container);
    OnLoadStyles({ element });
    window.addEventListener('resize', Debounce(resize, 20));
    EventSwipe({ container, element });
    ButtonVisibilityLogic({ element });
  }

  setCountForward = () => {
    this._count = this._count + 1;
  };

  setCountBackward = () => {
    this._count = this._count - 1;
  };
}

if (!window.customElements.get(ELEMENT_EVENTS_DATES_SLIDER_NAME)) {
  window.UMDEventsDateSliderElement = UMDEventsDateSliderElement;
  window.customElements.define(
    ELEMENT_EVENTS_DATES_SLIDER_NAME,
    UMDEventsDateSliderElement,
  );
}
