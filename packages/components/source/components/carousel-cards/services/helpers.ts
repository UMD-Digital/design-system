import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { ELEMENT_TYPE } from '../component';
import { SLOTS, ELEMENTS } from '../globals';

const spaceBetween = parseInt(spacing.md.replace('px', ''));

export const GetCarouselWrapperSize = ({
  shadowRoot,
}: {
  shadowRoot: ShadowRoot;
}) => {
  const wrapper = shadowRoot.querySelector(
    `.${ELEMENTS.CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;

  return wrapper.offsetWidth;
};

export const GetCarouselCount = ({
  shadowRoot,
}: {
  shadowRoot: ShadowRoot;
}) => {
  const wrapper = shadowRoot.querySelector(
    `.${ELEMENTS.CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;
  const isShowTwo = wrapper.offsetWidth > 650;

  return isShowTwo ? 2 : 1;
};

export const GetElementSize = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const containerWidth = GetCarouselWrapperSize({ shadowRoot });
  const count = GetCarouselCount({ shadowRoot });
  const multiplier = count == 2 ? 1 : 0.8;
  const additonalSpace = spaceBetween / 2;

  return (containerWidth / count) * multiplier - additonalSpace;
};

export const SetElementSize = ({
  element,
  elementSize,
}: {
  element: ELEMENT_TYPE;
  elementSize: number;
}) => {
  const cardsSlot = element.querySelector(
    `[slot="${SLOTS.cards}"]`,
  ) as HTMLSlotElement;
  const slotContent = Array.from(cardsSlot.children) as HTMLElement[];

  slotContent.forEach((card) => {
    card.style.width = `${elementSize}px`;
  });
};

export const SetCarouselSize = ({
  element,
  elementSize,
}: {
  element: ELEMENT_TYPE;
  elementSize: number;
}) => {
  const elementSizeTotal = elementSize * 2 + spaceBetween;
  const cardsSlot = element.querySelector(
    `[slot="${SLOTS.cards}"]`,
  ) as HTMLSlotElement;

  cardsSlot.style.width = `${elementSizeTotal}px`;
  cardsSlot.style.transition = 'none';
  cardsSlot.style.transform = 'translateX(0)';
};
