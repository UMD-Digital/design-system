import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import {
  ELEMENT_TYPE,
  SLOT_NAME_CARDS,
  CAROUSEL_CONTAINER_WRAPPER,
} from './variables';

const GetCarouselWrapperSize = ({ shadowRoot }: { shadowRoot: ShadowRoot }) => {
  const wrapper = shadowRoot.querySelector(
    `.${CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;

  return wrapper.offsetWidth;
};

export const SizeCarousel = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const wrapper = shadowRoot.querySelector(
    `.${CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
  ) as HTMLSlotElement;
  const containerWidth = GetCarouselWrapperSize({ shadowRoot });
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const slotContentLength = slotContent.length;
  const spaceBetween = parseInt(spacing.md.replace('px', ''));
  const isShowTwo = wrapper.offsetWidth > 650;
  const count = isShowTwo ? 2 : 1;
  const multiplier = isShowTwo ? 1 : 0.9;
  const elementSize = (containerWidth / count) * multiplier;
  const elementSizeTotal = elementSize * slotContentLength + spaceBetween;

  slotContent.forEach((card) => {
    card.style.width = `${elementSize - spaceBetween / 2}px`;
  });

  cardsSlot.style.width = `${elementSizeTotal}px`;
};
