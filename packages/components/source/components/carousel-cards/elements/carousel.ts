import { MakeSlot } from 'helpers/ui';
import { ELEMENT_TYPE } from 'components/carousel-cards/component';
import {
  SLOTS,
  BREAKPOINTS,
  ELEMENTS,
} from 'components/carousel-cards/globals';

import { CreateButton, ButtonStyles } from './button';

const CAROUSEL_CONTAINER = 'umd-carousel-cards-carousel-container';
const CAROUSEL_CONTAINER_LOCK = 'umd-carousel-cards-carousel-container-lock';

// prettier-ignore
export const CarouselContainerStyles = `
  .${CAROUSEL_CONTAINER} {
    position: relative;
  }

  @container umd-carousel-card (max-width: ${BREAKPOINTS.large - 1}px) {
    .${CAROUSEL_CONTAINER} {
      padding-bottom: 60px;
    }
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_CONTAINER} {
      width: 60%;
    }
  }

  .${ELEMENTS.CAROUSEL_CONTAINER_WRAPPER} {
    overflow: hidden;
    padding-right: 0;
  }

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${ELEMENTS.CAROUSEL_CONTAINER_WRAPPER}  {
      max-width: inherit;
      padding: 0;
    }
  }

  ${ButtonStyles}
`;

export const CreateCarouselColumn = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const slot = MakeSlot({ type: SLOTS.CARDS });
  const fowardButton = CreateButton({ element });
  const backwardsButton = CreateButton({ element, isRight: false });

  container.classList.add(CAROUSEL_CONTAINER);
  wrapper.classList.add(CAROUSEL_CONTAINER_LOCK);
  wrapper.classList.add(ELEMENTS.CAROUSEL_CONTAINER_WRAPPER);

  wrapper.appendChild(slot);
  container.appendChild(backwardsButton);
  container.appendChild(fowardButton);
  container.appendChild(wrapper);

  return container;
};
