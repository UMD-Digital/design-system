import { MakeSlot } from 'helpers/ui';
import { CreateButton, ButtonStyles } from './button';
import { SLOTS, BREAKPOINTS, ELEMENTS, VARIABLES } from '../globals';
import { UMDCarouselCardsElement } from '../index';

const { CARDS } = SLOTS;
const { LARGE } = BREAKPOINTS;
const { CAROUSEL_CONTAINER_WRAPPER } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;

const CAROUSEL_CONTAINER = 'umd-carousel-cards-carousel-container';
const CAROUSEL_CONTAINER_LOCK = 'umd-carousel-cards-carousel-container-lock';

// prettier-ignore
export const CarouselContainerStyles = `
  .${CAROUSEL_CONTAINER} {
    position: relative;
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${CAROUSEL_CONTAINER} {
      padding-bottom: 60px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CAROUSEL_CONTAINER} {
      width: 60%;
    }
  }

  .${CAROUSEL_CONTAINER_WRAPPER} {
    overflow: hidden;
    padding-right: 0;
  }

  @media (min-width: ${LARGE}px) {
    .${CAROUSEL_CONTAINER_WRAPPER}  {
      max-width: inherit;
      padding: 0;
    }
  }

  ${ButtonStyles}
`;

export const CreateCarouselColumn = ({
  element,
}: {
  element: UMDCarouselCardsElement;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const slot = MakeSlot({ type: CARDS });
  const fowardButton = CreateButton({ element });
  const backwardsButton = CreateButton({ element, isRight: false });

  container.classList.add(CAROUSEL_CONTAINER);
  wrapper.classList.add(CAROUSEL_CONTAINER_LOCK);
  wrapper.classList.add(CAROUSEL_CONTAINER_WRAPPER);

  wrapper.appendChild(slot);
  container.appendChild(backwardsButton);
  container.appendChild(fowardButton);
  container.appendChild(wrapper);

  return container;
};
