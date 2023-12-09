import { spacing } from '@universityofmaryland/umd-web-configuration';
import { ELEMENT_TYPE } from '../component';
import { BREAKPOINTS, ELEMENTS, SLOTS } from '../globals';

export const ShowNumberOfDates = ({
  shadowRoot,
}: {
  shadowRoot: ShadowRoot;
}) => {
  const container = shadowRoot.querySelector(
    `.${ELEMENTS.DATES_CONTAINER_CLASS}`,
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
    `[slot=${SLOTS.DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const dateElements = Array.from(
    slider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const buttons = Array.from(
    shadowRoot.querySelectorAll(`.${ELEMENTS.ARROW_CLASS}`),
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

export const JumpToDate = ({ element }: { element: ELEMENT_TYPE }) => {
  const currentPosition = element._count;
  const slider = element.querySelector(
    `[slot=${SLOTS.DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const dateElements = Array.from(
    slider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];

  let endPosition = 0;

  if (currentPosition > 0) {
    endPosition =
      dateElements[currentPosition].offsetLeft - dateElements[0].offsetLeft;
  }

  slider.style.transform = `translateX(${-endPosition}px)`;
};

export const SizeDatesElements = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;

  const slider = element.querySelector(
    `[slot=${SLOTS.DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;
  const sliderWrapper = shadowRoot.querySelector(
    `.${ELEMENTS.DATES_WRAPPER_CONTAINER_CLASS}`,
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
        dateElement.style.justifyContent = `center`;

        if (isMobile) {
          dateElement.style.justifyContent = `center`;
          dateElement.style.paddingRight = `0`;
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
