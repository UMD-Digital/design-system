import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import {
  BREAKPOINTS,
  DATE_SLOT_NAME,
  DATES_CONTAINER_CLASS,
  DATES_WRAPPER_CONTAINER_CLASS,
  ARROW_CLASS,
  ELEMENT_TYPE,
} from './variables';

const ShowNumberOfDates = ({ shadowRoot }: { shadowRoot: ShadowRoot }) => {
  const container = shadowRoot.querySelector(
    `.${DATES_CONTAINER_CLASS}`,
  ) as HTMLDivElement;

  let count = 1;

  if (container.offsetWidth > BREAKPOINTS.tablet) count = 2;
  if (container.offsetWidth > BREAKPOINTS.desktop) count = 3;
  if (container.offsetWidth > BREAKPOINTS.large) count = 4;

  return count;
};

export const ButtonVisibilityLogic = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const currentPosition = element._count;

  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const dateElements = Array.from(
    slider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const buttons = Array.from(
    shadowRoot.querySelectorAll(`.${ARROW_CLASS}`),
  ) as HTMLButtonElement[];
  const count = ShowNumberOfDates({ shadowRoot });
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

const JumpToDate = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const currentPosition = element._count;

  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const dateElements = Array.from(
    slider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const count = ShowNumberOfDates({ shadowRoot });
  const endPosition = Math.floor(
    currentPosition * count + dateElements[0].offsetWidth,
  );

  slider.style.transform = `translateX(${-endPosition}px)`;
};

export const SizeDatesElements = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;

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
      const count = ShowNumberOfDates({ shadowRoot });
      const dateElementSize = sliderWrapper.offsetWidth / count;
      const elementWidth = element.offsetWidth;
      const isMobile = elementWidth < BREAKPOINTS.tablet;

      slider.style.width = `${dateElements.length * dateElementSize}px`;

      dateElements.forEach((dateElement) => {
        dateElement.style.width = `${dateElementSize}px`;

        if (isMobile) {
          dateElement.style.justifyContent = `center`;
          dateElement.style.paddingRight = `${spacing.md}`;
        } else {
          dateElement.style.justifyContent = `inherit`;
          dateElement.style.paddingRight = `${spacing.lg}`;
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

export const EventSlideDates = ({
  forward,
  element,
}: {
  forward: boolean;
  element: ELEMENT_TYPE;
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

export const EventResize = ({ element }: { element: ELEMENT_TYPE }) => {
  SizeDatesElements({ element });
  JumpToDate({ element });
  ButtonVisibilityLogic({ element });
};

export const EventSwipe = ({
  container,
  element,
}: {
  container: HTMLDivElement;
  element: ELEMENT_TYPE;
}) => {
  if (!container) {
    throw new Error(
      'missing required elements is not defined in EventSwipe function',
    );
  }

  const shadowRoot = element.shadowRoot as ShadowRoot;
  const currentPosition = element._count;

  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const dateElements = Array.from(
    slider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const count = ShowNumberOfDates({ shadowRoot });
  const threshold = 20;
  const allowedTime = 100;
  let startX = 0;
  let dist = 0;
  let elapsedTime = 0;
  let startTime = 0;

  const swipes = (isrightswipe: Boolean) => {
    if (isrightswipe) {
      if (currentPosition > 0) {
        element.setCountBackward();
        EventSlideDates({ forward: false, element });
      }
    } else {
      if (currentPosition <= dateElements.length - count) {
        element.setCountForward();
        EventSlideDates({ forward: true, element });
      }
    }

    ButtonVisibilityLogic({ element });
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
