import { Tokens } from '@universityofmaryland/variables';
import { ELEMENT_TYPE } from '../index';
import { SLOTS, ELEMENTS, VARIABLES, BREAKPOINTS } from '../globals';

const { Spacing } = Tokens;
const { CARDS } = SLOTS;
const { CAROUSEL_CONTAINER_WRAPPER } = ELEMENTS;
const { TABLET_COUNT, MOBILE_COUNT } = VARIABLES;
const { cardBreak } = BREAKPOINTS;

const spaceBetween = parseInt(Spacing.md.replace('px', ''));

export const IsTabletView = ({ shadowRoot }: { shadowRoot: ShadowRoot }) => {
  const wrapper = shadowRoot.querySelector(
    `.${CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;

  return wrapper.offsetWidth > cardBreak;
};

export const GetCarouselWrapperSize = ({
  shadowRoot,
}: {
  shadowRoot: ShadowRoot;
}) => {
  const wrapper = shadowRoot.querySelector(
    `.${CAROUSEL_CONTAINER_WRAPPER}`,
  ) as HTMLElement;

  return wrapper.offsetWidth;
};

export const GetCarouselCount = ({
  shadowRoot,
}: {
  shadowRoot: ShadowRoot;
}) => {
  const isShowTwo = IsTabletView({ shadowRoot });
  return isShowTwo ? TABLET_COUNT : MOBILE_COUNT;
};

export const GetElementSize = ({ element }: { element: ELEMENT_TYPE }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const containerWidth = GetCarouselWrapperSize({ shadowRoot });
  const count = GetCarouselCount({ shadowRoot });
  const multiplier = count == TABLET_COUNT ? 1 : 0.8;
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
    `[slot="${CARDS}"]`,
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
    `[slot="${CARDS}"]`,
  ) as HTMLSlotElement;

  cardsSlot.style.width = `${elementSizeTotal}px`;
  cardsSlot.style.transition = 'none';
  cardsSlot.style.transform = 'translateX(0)';
};
