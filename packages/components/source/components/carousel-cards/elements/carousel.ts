import { MakeSlot } from 'helpers/ui';
import {
  ELEMENT_TYPE,
  SLOT_NAME_CARDS,
  BREAKPOINTS,
  CAROUSEL_CONTAINER_WRAPPER,
} from '../variables';

const CAROUSEL_CONTAINER = 'umd-carousel-cards-carousel-container';

export const CarouselContainerStyles = `
  .${CAROUSEL_CONTAINER} {
    color: white;
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_CONTAINER} {
      width: 60%;
    }
  }

  .${CAROUSEL_CONTAINER_WRAPPER} {
    overflow: hidden;
  }

`;

export const CreateCarouselColumn = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const slot = MakeSlot({ type: SLOT_NAME_CARDS });

  container.classList.add(CAROUSEL_CONTAINER);
  wrapper.classList.add(CAROUSEL_CONTAINER_WRAPPER);

  wrapper.appendChild(slot);
  container.appendChild(wrapper);

  return container;
};
