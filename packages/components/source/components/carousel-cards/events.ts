import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import {
  ELEMENT_TYPE,
  SLOT_NAME_CARDS,
  ANIMATION_DURATION,
  CAROUSEL_CONTAINER_WRAPPER,
} from './variables';

const spaceBetween = parseInt(spacing.md.replace('px', ''));

const GetCarouselWrapperSize = ({ shadowRoot }: { shadowRoot: ShadowRoot }) => {
  const wrapper = shadowRoot.querySelector(
    `.${CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;

  return wrapper.offsetWidth;
};

const GetCarouselCount = ({ shadowRoot }: { shadowRoot: ShadowRoot }) => {
  const wrapper = shadowRoot.querySelector(
    `.${CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;
  const isShowTwo = wrapper.offsetWidth > 650;

  return isShowTwo ? 2 : 1;
};

const GetElementSize = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const containerWidth = GetCarouselWrapperSize({ shadowRoot });
  const count = GetCarouselCount({ shadowRoot });
  const multiplier = count == 2 ? 1 : 0.8;
  const additonalSpace = spaceBetween / 2;

  return (containerWidth / count) * multiplier - additonalSpace;
};

const SetElementSize = ({
  element,
  elementSize,
}: {
  element: ELEMENT_TYPE;
  elementSize: number;
}) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];

  slotContent.forEach((card) => {
    card.style.width = `${elementSize}px`;
  });
};

const SetCarouselSize = ({
  element,
  elementSize,
}: {
  element: ELEMENT_TYPE;
  elementSize: number;
}) => {
  const elementSizeTotal = elementSize * 2 + spaceBetween;
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
  ) as HTMLSlotElement;

  cardsSlot.style.width = `${elementSizeTotal}px`;
  cardsSlot.style.transition = 'none';
  cardsSlot.style.transform = 'translateX(0)';
};

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
    `[slot="${SLOT_NAME_CARDS}"]`,
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
  cardsSlot.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
  cardsSlot.style.transform = `translateX(-${elementSizeWithSpace}px)`;

  setTimeout(() => {
    const clonedElement = firstElement.cloneNode(true) as HTMLElement;
    clonedElement.style.display = 'none';

    cardsSlot.appendChild(clonedElement);
    cardsSlot.removeChild(firstElement);
    SetCarouselSize({ element, elementSize });
  }, ANIMATION_DURATION + 100);
};

export const EventResizeSetHeight = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
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
