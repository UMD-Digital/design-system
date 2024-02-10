import { spacing } from '@universityofmaryland/variables';
import { ELEMENT_TYPE } from 'components/carousel-cards/component';
import { SLOTS, VARIABLES, ELEMENTS } from 'components/carousel-cards/globals';
import {
  GetElementSize,
  SetElementSize,
  SetCarouselSize,
  IsTabletView,
} from './helpers';

const spaceBetween = parseInt(spacing.md.replace('px', ''));

export const EventResizeCarouselElementsWidth = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const elementSize = GetElementSize({ element });

  SetElementSize({ element, elementSize });
  SetCarouselSize({ element, elementSize });
};

export const EventScrollCarousel = ({
  element,
  isDirectionRight = true,
}: {
  element: ELEMENT_TYPE;
  isDirectionRight?: boolean;
}) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const cardsSlot = element.querySelector(
    `[slot="${SLOTS.CARDS}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const isShowTwo = IsTabletView({ shadowRoot });
  const elementCount = isShowTwo ? 2 : 1;
  const firstElement = slotContent[0];
  const lastElement = slotContent[slotContent.length - 1];
  const nextElement = slotContent[elementCount];
  const elementSize = firstElement.offsetWidth;
  const elementSizeWithSpace = elementSize + spaceBetween;

  if (!nextElement) return;

  const scrollTabletRight = () => {
    const temporaryCarouselSize =
      elementSize * elementCount +
      spaceBetween / elementCount +
      elementSizeWithSpace;

    const animateRight = () => {
      cardsSlot.style.width = `${temporaryCarouselSize}px`;
      nextElement.style.display = 'block';
      cardsSlot.style.transition = `transform ${VARIABLES.ANIMATION_DURATION}ms`;
      cardsSlot.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        const clonedElement = firstElement.cloneNode(true) as HTMLDivElement;
        cardsSlot.appendChild(clonedElement);
        clonedElement.style.display = 'none';

        cardsSlot.removeChild(firstElement);
        SetCarouselSize({ element, elementSize });
      }, VARIABLES.ANIMATION_DURATION - 50);
    };

    const animateLeft = () => {
      const clonedElement = lastElement.cloneNode(true) as HTMLDivElement;
      const removedElement = slotContent[1];

      cardsSlot.style.width = `${temporaryCarouselSize}px`;
      cardsSlot.prepend(clonedElement);
      clonedElement.style.display = 'block';
      cardsSlot.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        cardsSlot.style.transition = `transform ${VARIABLES.ANIMATION_DURATION}ms`;
        cardsSlot.style.transform = `translateX(0)`;
      }, 10);

      setTimeout(() => {
        removedElement.style.display = 'none';
        cardsSlot.removeChild(lastElement);

        SetCarouselSize({ element, elementSize });
      }, VARIABLES.ANIMATION_DURATION - 50);
    };

    isDirectionRight ? animateRight() : animateLeft();
  };

  const scrollMobileRight = () => {
    const isOnlyTwo = slotContent.length === 2;
    const temporaryCarouselSize = elementSize * 3 + spaceBetween * 2;

    const animateRight = () => {
      const clonedElement = firstElement.cloneNode(true) as HTMLElement;
      const upcomingElement = isOnlyTwo ? clonedElement : slotContent[2];
      clonedElement.style.display = 'none';
      cardsSlot.appendChild(clonedElement);

      cardsSlot.style.width = `${temporaryCarouselSize}px`;
      upcomingElement.style.display = 'block';
      cardsSlot.style.transition = `transform ${VARIABLES.ANIMATION_DURATION}ms ease-in-out`;
      cardsSlot.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        cardsSlot.removeChild(firstElement);

        SetCarouselSize({ element, elementSize });
      }, VARIABLES.ANIMATION_DURATION + 100);
    };

    const animateLeft = () => {
      const clonedElement = lastElement.cloneNode(true) as HTMLDivElement;
      const removedElement = slotContent[1];

      cardsSlot.style.width = `${temporaryCarouselSize}px`;
      cardsSlot.prepend(clonedElement);
      clonedElement.style.display = 'block';
      cardsSlot.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        cardsSlot.style.transition = `transform ${VARIABLES.ANIMATION_DURATION}ms`;
        cardsSlot.style.transform = `translateX(0)`;
      }, 10);

      setTimeout(() => {
        removedElement.style.display = 'none';
        cardsSlot.removeChild(lastElement);

        SetCarouselSize({ element, elementSize });
      }, VARIABLES.ANIMATION_DURATION - 50);
    };

    isDirectionRight ? animateRight() : animateLeft();
  };

  isShowTwo ? scrollTabletRight() : scrollMobileRight();
};

export const EventSwipe = ({
  container,
  element,
}: {
  container: HTMLDivElement;
  element: ELEMENT_TYPE;
}) => {
  const threshold = 20;
  const allowedTime = 100;
  let startX = 0;
  let dist = 0;
  let elapsedTime = 0;
  let startTime = 0;

  const swipes = (isrightswipe: Boolean) => {
    if (!isrightswipe) {
      EventScrollCarousel({ element });
    } else {
      EventScrollCarousel({ element, isDirectionRight: false });
    }
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

export const EventResizeSetHeight = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOTS.CARDS}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const minimumHeight = 450;

  const maxHeight = slotContent.reduce((acc, currentElement) => {
    if (acc > currentElement.offsetHeight) return acc;
    return currentElement.offsetHeight;
  }, minimumHeight);

  slotContent.forEach((card) => {
    card.style.height = `${maxHeight}px`;
  });
};

export const EventResizeButtonLogic = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const forwardButton = shadowRoot.querySelector(
    `.${ELEMENTS.CAROUSEL_CARDS_BUTTON_FORWARDS}`,
  ) as HTMLButtonElement;
  const backwardButton = shadowRoot.querySelector(
    `.${ELEMENTS.CAROUSEL_CARDS_BUTTON_BACKWARDS}`,
  ) as HTMLButtonElement;
  const buttons = [forwardButton, backwardButton];
  const cardsSlot = element.querySelector(
    `[slot="${SLOTS.CARDS}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const count = slotContent.length;
  const isShowTwo = IsTabletView({ shadowRoot });
  const isButtonShownMobile = count > VARIABLES.MOBILE_COUNT;
  const isButtonShownTablet = count > VARIABLES.TABLET_COUNT;

  if (isShowTwo && isButtonShownTablet) {
    buttons.forEach((button) => (button.style.display = 'block'));
  }

  if (isShowTwo && !isButtonShownTablet) {
    buttons.forEach((button) => (button.style.display = 'none'));
  }

  if (!isShowTwo && isButtonShownMobile) {
    buttons.forEach((button) => (button.style.display = 'block'));
  }

  if (!isShowTwo && !isButtonShownMobile) {
    buttons.forEach((button) => (button.style.display = 'none'));
  }
};
