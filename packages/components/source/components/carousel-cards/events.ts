import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import {
  ELEMENT_TYPE,
  SLOT_NAME_CARDS,
  CAROUSEL_CONTAINER_WRAPPER,
} from './variables';

const GetCarouselWrapperSize = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const wrapper = shadowRoot.querySelector(
    `.${CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;

  return wrapper.offsetWidth;
};

export const SizeCarousel = ({ element }: { element: ELEMENT_TYPE }) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const containerWidth = GetCarouselWrapperSize({ element });
  console.log(containerWidth);
  const count = 2;
  const elementSize =
    containerWidth / count - parseInt(spacing.md.replace('px', ''));

  slotContent.forEach((card) => {
    card.style.width = `${elementSize}px`;
  });

  cardsSlot.style.display = `flex`;
  cardsSlot.style.width = `${elementSize * slotContent.length}px`;
};
