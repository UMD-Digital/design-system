import { ELEMENT_TYPE } from '../component';
import { SLOTS } from '../globals';
import {
  ButtonVisibilityLogic,
  JumpToDate,
  ShowNumberOfDates,
  SizeDatesElements,
} from './helpers';

export const EventSlideDates = ({
  forward,
  element,
}: {
  forward: boolean;
  element: ELEMENT_TYPE;
}) => {
  const scopedSlider = element.querySelector(
    `[slot=${SLOTS.DATE_SLOT_NAME}]`,
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
    `[slot=${SLOTS.DATE_SLOT_NAME}]`,
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
    },
    { passive: false },
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
    },
    { passive: false },
  );
};
