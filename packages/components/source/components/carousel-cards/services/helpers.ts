import { Tokens } from '@universityofmaryland/variables';
import { ELEMENT_TYPE } from '../index';
import { SLOTS, ELEMENTS, VARIABLES, BREAKPOINTS } from '../globals';

const { Spacing } = Tokens;

const spaceBetween = parseInt(Spacing.md.replace('px', ''));

export const IsTabletView = ({ shadowRoot }: { shadowRoot: ShadowRoot }) => {
  const wrapper = shadowRoot.querySelector(
    `.${ELEMENTS.CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;

  return wrapper.offsetWidth > BREAKPOINTS.cardBreak;
};

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
  const isShowTwo = IsTabletView({ shadowRoot });
  return isShowTwo ? VARIABLES.TABLET_COUNT : VARIABLES.MOBILE_COUNT;
};

export const GetElementSize = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const containerWidth = GetCarouselWrapperSize({ shadowRoot });
  const count = GetCarouselCount({ shadowRoot });
  const multiplier = count == VARIABLES.TABLET_COUNT ? 1 : 0.8;
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
    `[slot="${SLOTS.CARDS}"]`,
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
    `[slot="${SLOTS.CARDS}"]`,
  ) as HTMLSlotElement;

  cardsSlot.style.width = `${elementSizeTotal}px`;
  cardsSlot.style.transition = 'none';
  cardsSlot.style.transform = 'translateX(0)';
};
