import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import {
  ELEMENT_TYPE,
  SLOT_NAME_CARDS,
  CAROUSEL_CONTAINER_WRAPPER,
} from './variables';

const ANIMATION_DURATION = 500;
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

export const SizeCarousel = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
  ) as HTMLSlotElement;
  const containerWidth = GetCarouselWrapperSize({ shadowRoot });
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const count = GetCarouselCount({ shadowRoot });
  const multiplier = count == 2 ? 1 : 0.9;
  const elementSize = (containerWidth / count) * multiplier;
  const elementSizeTotal = elementSize * count + spaceBetween / 2;

  slotContent.forEach((card) => {
    card.style.width = `${elementSize - spaceBetween / 2}px`;
  });

  cardsSlot.style.width = `${elementSizeTotal}px`;
};

export const ScrollCarousel = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const firstElement = slotContent[0];
  const elementSize = firstElement.offsetWidth;
  const count = GetCarouselCount({ shadowRoot });
  const nextElement = slotContent[count];
  const elementSizeTotal = elementSize * count + spaceBetween / 2;
  const elementSizeWithAdditonal =
    elementSizeTotal + elementSize + spaceBetween;

  if (!nextElement) return;

  cardsSlot.style.width = `${elementSizeWithAdditonal}px`;
  nextElement.style.display = 'block';
  cardsSlot.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
  cardsSlot.style.transform = `translateX(-${elementSize + spaceBetween}px)`;

  setTimeout(() => {
    const clonedElement = firstElement.cloneNode(true) as HTMLElement;
    clonedElement.style.display = 'none';

    cardsSlot.appendChild(clonedElement);
    cardsSlot.removeChild(firstElement);

    cardsSlot.style.transition = 'none';
    cardsSlot.style.transform = 'translateX(0)';
    cardsSlot.style.width = `${elementSizeTotal}px`;
  }, ANIMATION_DURATION);
};
