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

const SizeForOne = ({
  slotContent,
  cardsSlot,
  containerWidth,
}: {
  slotContent: HTMLElement[];
  cardsSlot: HTMLSlotElement;
  containerWidth: number;
}) => {
  const count = 1;
  const spaceBetween = parseInt(spacing.md.replace('px', ''));
  const elementSize = containerWidth / count;

  slotContent.forEach((card) => {
    card.style.width = `${elementSize - spaceBetween}px`;
  });

  cardsSlot.style.width = `${elementSize * slotContent.length}px`;
};

const SizeForTwo = ({
  slotContent,
  cardsSlot,
  containerWidth,
}: {
  slotContent: HTMLElement[];
  cardsSlot: HTMLSlotElement;
  containerWidth: number;
}) => {
  const count = 2;
  const spaceBetween = parseInt(spacing.md.replace('px', ''));
  const elementSize = containerWidth / count;

  slotContent.forEach((card) => {
    card.style.width = `${elementSize - spaceBetween}px`;
  });

  cardsSlot.style.width = `${elementSize * slotContent.length}px`;
};

export const SizeCarousel = ({ element }: { element: ELEMENT_TYPE }) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOT_NAME_CARDS}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];
  const containerWidth = GetCarouselWrapperSize({ element });

  if (element.offsetWidth > 650) {
    SizeForTwo({ slotContent, cardsSlot, containerWidth });
  } else {
    SizeForOne({ slotContent, cardsSlot, containerWidth });
  }
};
