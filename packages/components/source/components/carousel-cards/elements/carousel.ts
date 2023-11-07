import { MakeSlot } from 'helpers/ui';
import {
  ELEMENT_TYPE,
  SLOT_NAME_CARDS,
  BREAKPOINTS,
  CAROUSEL_CONTAINER_WRAPPER,
} from '../variables';
import { CreateButton } from './button';

const CAROUSEL_CONTAINER = 'umd-carousel-cards-carousel-container';

export const CarouselContainerStyles = `
  .${CAROUSEL_CONTAINER} {
    color: white;
    position: relative;

  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_CONTAINER} {
      width: 60%;
    }
  }

  .${CAROUSEL_CONTAINER_WRAPPER} {
    overflow: hidden;
    padding-right: 0;
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_CONTAINER_WRAPPER}  {
      max-width: inherit;
      padding: 0;
    }
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
  const fowardButton = CreateButton({ element });

  container.classList.add(CAROUSEL_CONTAINER);
  wrapper.classList.add('umd-lock');
  wrapper.classList.add(CAROUSEL_CONTAINER_WRAPPER);

  wrapper.appendChild(slot);
  container.appendChild(fowardButton);
  container.appendChild(wrapper);

  return container;
};
