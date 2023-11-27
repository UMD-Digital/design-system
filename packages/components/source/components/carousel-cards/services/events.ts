import { spacing } from '@universityofmaryland/umd-web-configuration';
import { GetElementSize, SetElementSize, SetCarouselSize } from './helpers';
import { ELEMENT_TYPE } from '../component';
import { SLOTS, VARIABLES } from '../globals';

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

export const EventScrollCarousel = ({ element }: { element: ELEMENT_TYPE }) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOTS.cards}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const elementCount = 2;
  const firstElement = slotContent[0];
  const nextElement = slotContent[elementCount];
  const elementSize = firstElement.offsetWidth;
  const elementSizeWithSpace = elementSize + spaceBetween;
  const elementSizeTotal =
    elementSize * elementCount + spaceBetween / elementCount;
  const elementSizeWithAdditonal = elementSizeTotal + elementSizeWithSpace;

  if (!nextElement) return;

  cardsSlot.style.width = `${elementSizeWithAdditonal}px`;
  nextElement.style.display = 'block';
  cardsSlot.style.transition = `transform ${VARIABLES.ANIMATION_DURATION}ms ease-in-out`;
  cardsSlot.style.transform = `translateX(-${elementSizeWithSpace}px)`;

  setTimeout(() => {
    const clonedElement = firstElement.cloneNode(true) as HTMLElement;
    clonedElement.style.display = 'none';

    cardsSlot.appendChild(clonedElement);
    cardsSlot.removeChild(firstElement);
    SetCarouselSize({ element, elementSize });
  }, VARIABLES.ANIMATION_DURATION + 100);
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
    console.log(isrightswipe);
    if (!isrightswipe) {
      EventScrollCarousel({ element });
    }
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

export const EventResizeSetHeight = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOTS.cards}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const maxHeight = slotContent.reduce((acc, currentElement) => {
    if (acc > currentElement.offsetHeight) return acc;
    return currentElement.offsetHeight;
  }, 0);

  slotContent.forEach((card) => {
    card.style.height = `${maxHeight}px`;
  });
};
