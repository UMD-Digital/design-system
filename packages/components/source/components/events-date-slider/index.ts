export const ELEMENT_EVENTS_DATES_SLIDER_NAME =
  'umd-element-events-date-slider';
const CONTAINER_CLASS = 'umd-element-date-slider-container';
const CONTAINER_DARK_CLASS = 'umd-element-date-slider-container-dark';
const CONTAINER_SCROLL_WRAPPER_CLASS = 'umd-element-container-wrapper';
const INTRO_CONTAINER_CLASS = 'umd-element-date-slider-intro-container';
const DATES_CONTAINER_CLASS = 'umd-element-date-slider-dates-container';
const DATES_WRAPPER_CONTAINER_CLASS = 'umd-element-date-slider-dates-wrapper';
const ARROW_CLASS = 'umd-element-date-slider-arrow';
const FORWARD_ARROW_CLASS = 'umd-element-date-slider-forward-arrow';
const BACK_ARROW_CLASS = 'umd-element-date-slider-back-arrow';
const COVER_CLASS = 'umd-element-date-slider-date-lock-cover';

const FORWARD_ARROW_ICON = `<svg aria-hidden="true"  viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.0184 5.05487L17.0694 8H19.8462L23.8959 4.03913L23.8567 4L23.8959 3.96087L19.8462 0L17.0694 0L20.2936 3.22002H0L0 5.05487H20.0184Z"/>
</svg>`;
const BACK_ARROW_ICON = `<svg aria-hidden="true" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.98162 5.05487L6.93058 8H4.15376L0.104145 4.03913L0.143276 4L0.104143 3.96087L4.15376 0L6.93058 0L3.70637 3.22002H24V5.05487H3.98162Z"/>
</svg>`;

const COLORS = {
  white: '#ffffff',
  lightGray: '#f1f1f1',
  gray: '#e6e6e6',
  darkGray: '#454545',
  darkerGray: '#242424',
  black: '#000000',
};

const BREAKPOINTS = {
  tablet: 550,
  desktop: 750,
  large: 950,
};

const DATE_SLOT_NAME = 'date-list';
const INTRODUCTION_SLOT_NAME = 'introduction';
const DATE_GAP = 24;

const template = document.createElement('template');
let currentPosition = 0;

template.innerHTML = `
<style>
  :host {
    display: block !important;
    position: relative !important;
    text-wrap: pretty;
    container: dates-slider / inline-size; 
  }

  :host .${CONTAINER_CLASS} {
    padding: 24px 0;
    background-color: ${COLORS.lightGray};
    position: relative;
    z-index: 99;
  }

  @container dates-slider (max-width: 260px) {
    :host .${CONTAINER_CLASS} {
      display: none
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${CONTAINER_CLASS} {
      padding: 40px;
    }
  }

  :host .${CONTAINER_SCROLL_WRAPPER_CLASS} {
    position: relative;
    z-index: 99;
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${CONTAINER_SCROLL_WRAPPER_CLASS} {
      display: flex;
      align-items: center;
    }
  }

  :host .${DATES_CONTAINER_CLASS} {
    display: flex;
    position: relative;
    padding: 0 36px;
    width: calc(100% - 72px);
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${DATES_CONTAINER_CLASS} {
      padding: 0 48px;
      width: calc(100% - 236px);
    }
  }

  :host .${INTRO_CONTAINER_CLASS} {
    margin-bottom: 24px;
    padding-left: 48px;
  }

  @container dates-slider (max-width: ${BREAKPOINTS.tablet - 1}px) {
    :host .${INTRO_CONTAINER_CLASS} {
      text-align: center;
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${INTRO_CONTAINER_CLASS} {
      padding-right: 48px;
      padding-left: 0;
      width: 140px;
      margin-bottom: 0;
    }
  }

  :host .${DATES_WRAPPER_CONTAINER_CLASS} {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 44px;
  }

  :host .${ARROW_CLASS} {
    border: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.gray};
    transition: background-color .5s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${ARROW_CLASS} {
      width: 48px;
      height: 48px;
    }
  }

  :host .${ARROW_CLASS}:hover {
    background-color: ${COLORS.black};
  }

  :host .${ARROW_CLASS}:hover svg {
    fill: ${COLORS.white};
  }

  :host .${ARROW_CLASS} svg {
    transition: fill .5s;
    fill: ${COLORS.black};
    width: 16px;
    height: 6px;
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${ARROW_CLASS} svg {
      width: 24px;
      height: 8px;
    }
  }

  :host .${BACK_ARROW_CLASS} {
    left: 0;
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${BACK_ARROW_CLASS} {
      left: -${DATE_GAP}px;
    }
  }

  :host .${FORWARD_ARROW_CLASS} {
    right: 0;
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${FORWARD_ARROW_CLASS} {
      right: -${DATE_GAP}px;
    }
  }

  :host .${COVER_CLASS} {
    display: block;
    position: absolute;
    width: 200vw;
    height: 100%;
    top: 0;
    left: -100vw;
    background-color: ${COLORS.lightGray};
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${COVER_CLASS} {
      width: 40vw;
      left: calc(100% - 1px);
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    ::slotted(div[slot="${INTRODUCTION_SLOT_NAME}"]) {
      width: 140px;
    }
  }

  :host .${CONTAINER_DARK_CLASS} {
    background-color: ${COLORS.darkerGray};
  }

  :host .${CONTAINER_DARK_CLASS} .${COVER_CLASS} {
    background-color: ${COLORS.darkerGray};
  }

  :host .${CONTAINER_DARK_CLASS} .${ARROW_CLASS} {
    background-color: ${COLORS.darkGray};
  }

  :host .${CONTAINER_DARK_CLASS} .${ARROW_CLASS} svg {
    fill: ${COLORS.white}
  }

  :host .${CONTAINER_DARK_CLASS} .${ARROW_CLASS}:hover {
    background-color: ${COLORS.white}
  }

  :host .${CONTAINER_DARK_CLASS} .${ARROW_CLASS}:hover svg {
    fill: ${COLORS.black}
  }
</style>`;

// Functions

const Debounce = <T extends Function>(cb: T, wait = 50) => {
  let h = 0;
  let callable = (...args: any) => {
    clearTimeout(h);
    // @ts-ignore
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
};

const MakeSlot = ({ type }: { type: string }) => {
  const slot = document.createElement('slot');
  slot.setAttribute('name', type);
  return slot;
};

const CreateCoverElement = () => {
  const coverElement = document.createElement('div');
  coverElement.classList.add(COVER_CLASS);
  return coverElement;
};

const CreateButton = ({
  forward = true,
  shadowRoot,
  element,
}: {
  forward: boolean;
  shadowRoot: ShadowRoot;
  element: HTMLElement;
}) => {
  const button = document.createElement('button');

  if (forward) {
    button.innerHTML = FORWARD_ARROW_ICON;
    button.classList.add(FORWARD_ARROW_CLASS);
  } else {
    button.innerHTML = BACK_ARROW_ICON;
    button.classList.add(BACK_ARROW_CLASS);
    button.style.display = 'none';
  }

  button.classList.add(ARROW_CLASS);

  button.addEventListener('click', () => {
    forward ? currentPosition++ : currentPosition--;
    SlideDates({ forward, element });
    ButtonVisibilityLogic({
      shadowRoot,
      element,
    });
  });

  return button;
};

const ShadowDomStructure = ({
  infoSlot,
  datesSlot,
  shadowRoot,
  element,
}: {
  infoSlot: HTMLSlotElement;
  datesSlot: HTMLSlotElement;
  shadowRoot: ShadowRoot;
  element: HTMLElement;
}) => {
  const container = document.createElement('div');
  const containerWrapper = document.createElement('div');
  const introductionWrapper = document.createElement('div');
  const datesContainer = document.createElement('div');
  const datesWrapper = document.createElement('div');
  const coverElement = CreateCoverElement();
  const firstButton = CreateButton({ forward: false, shadowRoot, element });
  const secondButton = CreateButton({ forward: true, shadowRoot, element });

  container.classList.add(CONTAINER_CLASS);
  containerWrapper.classList.add(CONTAINER_SCROLL_WRAPPER_CLASS);

  introductionWrapper.classList.add(INTRO_CONTAINER_CLASS);
  introductionWrapper.appendChild(infoSlot);

  datesWrapper.classList.add(DATES_WRAPPER_CONTAINER_CLASS);
  datesSlot.style.display = 'block';
  datesWrapper.appendChild(datesSlot);

  datesContainer.classList.add(DATES_CONTAINER_CLASS);
  datesContainer.appendChild(firstButton);
  datesContainer.appendChild(datesWrapper);
  datesContainer.appendChild(secondButton);

  containerWrapper.appendChild(introductionWrapper);
  containerWrapper.appendChild(datesContainer);
  container.appendChild(containerWrapper);
  container.appendChild(coverElement);

  return container;
};

const ShowCount = ({ shadowRoot }: { shadowRoot: ShadowRoot }) => {
  const container = shadowRoot.querySelector(
    `.${DATES_CONTAINER_CLASS}`,
  ) as HTMLDivElement;

  let count = 1;

  if (container.offsetWidth > BREAKPOINTS.tablet) count = 2;
  if (container.offsetWidth > BREAKPOINTS.desktop) count = 3;
  if (container.offsetWidth > BREAKPOINTS.large) count = 4;

  return count;
};

const ButtonVisibilityLogic = ({
  shadowRoot,
  element,
}: {
  shadowRoot: ShadowRoot;
  element: HTMLElement;
}) => {
  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const dateElements = Array.from(
    slider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const buttons = Array.from(
    shadowRoot.querySelectorAll(`.${ARROW_CLASS}`),
  ) as HTMLButtonElement[];
  const count = ShowCount({ shadowRoot });
  const length = dateElements.length;

  buttons.forEach((button) => {
    button.setAttribute('disabled', '');

    setTimeout(() => {
      button.removeAttribute('disabled');
    }, 500);
  });

  if (currentPosition === 0) {
    buttons[0].style.display = 'none';
  } else {
    buttons[0].style.display = 'flex';
  }

  if (currentPosition >= length - count) {
    buttons[1].style.display = 'none';
  } else {
    buttons[1].style.display = 'flex';
  }
};

const SlideDates = ({
  forward,
  element,
}: {
  forward: boolean;
  element: HTMLElement;
}) => {
  const scopedSlider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;

  const dateElements = Array.from(
    scopedSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const width = dateElements[0].offsetWidth;
  const loop = 30;
  const sliderStyle = scopedSlider.style.transform;
  const sliderPosition = sliderStyle
    ? parseInt(sliderStyle.replace(/[^\d.]/g, ''))
    : 0;
  const endPosition = forward
    ? Math.floor(sliderPosition + width)
    : Math.floor(sliderPosition - width);
  const increment = width / loop;
  let index = 1;

  const slideFunction = () => {
    const incrementIncrease = increment * index;
    const postion = forward
      ? sliderPosition + incrementIncrease
      : sliderPosition - incrementIncrease;

    if (loop > index) {
      index++;
      window.requestAnimationFrame(slideFunction);
      scopedSlider.style.transform = `translateX(${-postion}px)`;
    } else {
      scopedSlider.style.transform = `translateX(${-endPosition}px)`;
    }
  };

  window.requestAnimationFrame(slideFunction);
};

const JumpToDate = ({
  element,
  shadowRoot,
}: {
  element: HTMLElement;
  shadowRoot: ShadowRoot;
}) => {
  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const dateElements = Array.from(
    slider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const count = ShowCount({ shadowRoot });
  const endPosition = Math.floor(
    currentPosition * count + dateElements[0].offsetWidth,
  );

  slider.style.transform = `translateX(${-endPosition}px)`;
};

const SizeDatesElements = ({
  element,
  shadowRoot,
}: {
  element: HTMLElement;
  shadowRoot: ShadowRoot;
}) => {
  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const sliderWrapper = shadowRoot.querySelector(
    `.${DATES_WRAPPER_CONTAINER_CLASS}`,
  ) as HTMLDivElement;

  const sizing = ({
    slider,
    sliderWrapper,
  }: {
    slider: HTMLDivElement;
    sliderWrapper: HTMLDivElement;
  }) => {
    const dateElements = Array.from(
      slider.querySelectorAll(':scope > *'),
    ) as HTMLDivElement[];

    const sliderVisibility = ({ show = true }: { show?: boolean }) => {
      slider.style.visibility = show ? 'visible' : 'hidden';
    };

    const setHeight = () => {
      const maxHeightElement = dateElements.sort((a, b) => {
        return a.offsetHeight - b.offsetHeight;
      })[0];

      sliderWrapper.style.height = `${maxHeightElement.offsetHeight}px`;
    };

    const setWidthPerDate = () => {
      const count = ShowCount({ shadowRoot });
      const dateElementSize = sliderWrapper.offsetWidth / count;
      const elementWidth = element.offsetWidth;
      const isMobile = elementWidth < BREAKPOINTS.tablet;

      slider.style.width = `${dateElements.length * dateElementSize}px`;

      dateElements.forEach((dateElement) => {
        dateElement.style.width = `${dateElementSize}px`;

        if (isMobile) {
          dateElement.style.justifyContent = `center`;
        } else {
          dateElement.style.justifyContent = `inherit`;
        }
      });
    };

    sliderVisibility({ show: false });
    setWidthPerDate();
    setHeight();
    sliderVisibility({ show: true });
  };

  sizing({ slider, sliderWrapper });
};

const EventResize = ({
  element,
  shadowRoot,
}: {
  element: HTMLElement;
  shadowRoot: ShadowRoot;
}) => {
  SizeDatesElements({ element, shadowRoot });
  JumpToDate({ element, shadowRoot });
};

const EventSwipe = ({
  container,
  shadowRoot,
  element,
}: {
  container: HTMLDivElement;
  shadowRoot: ShadowRoot;
  element: HTMLElement;
}) => {
  if (!container) {
    throw new Error(
      'missing required elements is not defined in EventSwipe function',
    );
  }

  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const dateElements = Array.from(
    slider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const count = ShowCount({ shadowRoot });
  const threshold = 20;
  const allowedTime = 100;
  let startX = 0;
  let dist = 0;
  let elapsedTime = 0;
  let startTime = 0;

  const swipes = (isrightswipe: Boolean) => {
    if (isrightswipe) {
      if (currentPosition > 0) {
        currentPosition--;
        SlideDates({ forward: false, element });
      }
    } else {
      if (currentPosition <= dateElements.length - count) {
        currentPosition++;
        SlideDates({ forward: true, element });
      }
    }

    ButtonVisibilityLogic({
      shadowRoot,
      element,
    });
  };

  container.addEventListener(
    'touchstart',
    (event) => {
      const touchObject = event.changedTouches[0];

      dist = 0;
      startX = touchObject.pageX;
      startTime = new Date().getTime();
      event.preventDefault();
    },
    false,
  );

  container.addEventListener(
    'touchmove',
    (event) => {
      event.preventDefault();
    },
    false,
  );

  container.addEventListener(
    'touchend',
    (event) => {
      const touchObject = event.changedTouches[0];

      dist = touchObject.pageX - startX;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime > allowedTime && Math.abs(dist) >= threshold) {
        swipes(dist > 0);
      }

      event.preventDefault();
    },
    false,
  );
};

const OnLoadStyles = ({
  element,
  shadowRoot,
}: {
  element: HTMLElement;
  shadowRoot: ShadowRoot;
}) => {
  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;

  slider.style.display = 'flex';
  slider.style.position = 'absolute';
  slider.style.top = '0';
  slider.style.left = '0';

  SizeDatesElements({ element, shadowRoot });
};

export class UMDEventsDateSliderElement extends HTMLElement {
  _shadow: ShadowRoot;
  _containerElement = document.createElement('div');
  _theme = 'light';

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
    if (name == 'theme' && newValue) {
      this._theme = newValue;
    }

    if (name == 'aria-hidden' && newValue === 'false') {
      SizeDatesElements({ element: this, shadowRoot: this._shadow });
    }
  }

  connectedCallback() {
    const infoSlot = MakeSlot({ type: INTRODUCTION_SLOT_NAME });
    const datesSlot = MakeSlot({ type: DATE_SLOT_NAME });
    const element = this;
    const shadowRoot = this._shadow;
    const theme = this._theme;

    const container = ShadowDomStructure({
      datesSlot,
      infoSlot,
      shadowRoot,
      element,
    });

    const resize = () => {
      EventResize({ element, shadowRoot });
    };

    if (theme === 'dark') {
      container.classList.add(CONTAINER_DARK_CLASS);
    }

    shadowRoot.appendChild(container);
    OnLoadStyles({ element, shadowRoot });
    window.addEventListener('resize', Debounce(resize, 20));
    EventSwipe({ container, shadowRoot, element });
  }
}

if (!window.customElements.get(ELEMENT_EVENTS_DATES_SLIDER_NAME)) {
  window.UMDEventsDateSliderElement = UMDEventsDateSliderElement;
  window.customElements.define(
    ELEMENT_EVENTS_DATES_SLIDER_NAME,
    UMDEventsDateSliderElement,
  );
}
