import { Tokens } from '@universityofmaryland/variables';
import { ELEMENT_TYPE } from '../index';
import { BREAKPOINTS, ELEMENTS, SLOTS } from '../globals';

const { Colors, Spacing } = Tokens;

const { TABLET, DESKTOP, LARGE } = BREAKPOINTS;
const { DATE_SLOT_NAME } = SLOTS;
const { DATES_CONTAINER_CLASS, DATES_WRAPPER_CONTAINER_CLASS, ARROW_CLASS } =
  ELEMENTS;

export const ShowNumberOfDates = ({
  shadowRoot,
}: {
  shadowRoot: ShadowRoot;
}) => {
  const container = shadowRoot.querySelector(
    `.${DATES_CONTAINER_CLASS}`,
  ) as HTMLDivElement;

  let count = 1;

  if (container.offsetWidth > TABLET) count = 2;
  if (container.offsetWidth > DESKTOP) count = 3;
  if (container.offsetWidth > LARGE) count = 4;

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

export const JumpToDate = ({ element }: { element: ELEMENT_TYPE }) => {
  const currentPosition = element._count;
  const slider = element.querySelector(
    `[slot=${DATE_SLOT_NAME}]`,
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
  const isThemeDark = element.getAttribute('theme') === 'dark';
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
      const height =
        maxHeightElement.offsetHeight +
        parseInt(maxHeightElement.style.marginTop.replace('px', ''));

      sliderWrapper.style.height = `${height}px`;
    };

    const setWidthPerDate = () => {
      const count = ShowNumberOfDates({ shadowRoot });
      const dateElementSize = sliderWrapper.offsetWidth / count;
      const elementWidth = element.offsetWidth;
      const isMobile = elementWidth < TABLET;

      slider.style.width = `${dateElements.length * dateElementSize}px`;

      dateElements.forEach((dateElement) => {
        dateElement.style.width = `${dateElementSize}px`;

        if (isMobile) {
          const lineColor = isThemeDark
            ? Colors.gray.mediumAA
            : Colors.gray.light;

          dateElement.style.display = `flex`;
          dateElement.style.justifyContent = `center`;
          dateElement.style.paddingRight = `0`;
          dateElement.style.marginTop = `${Spacing.xs}`;
          dateElement.style.paddingTop = `${Spacing.xs}`;
          dateElement.style.borderTop = `1px solid ${lineColor}`;
        } else {
          dateElement.style.display = `block`;
          dateElement.style.justifyContent = `inherit`;
          dateElement.style.paddingRight = `${Spacing.lg}`;

          dateElement.style.marginTop = `0`;
          dateElement.style.paddingTop = `0`;
          dateElement.style.borderTop = `none`;
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
