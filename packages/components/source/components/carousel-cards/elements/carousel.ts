import { MakeSlot } from 'helpers/ui';
import { ELEMENT_TYPE } from '../component';
import { CreateButton, ButtonStyles } from './button';
import { SLOTS, BREAKPOINTS, ELEMENTS } from '../globals';

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

  .${ELEMENTS.CAROUSEL_CONTAINER_WRAPPER} {
    overflow: hidden;
    padding-right: 0;
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
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
  const slot = MakeSlot({ type: SLOTS.cards });
  const fowardButton = CreateButton({ element });

  container.classList.add(CAROUSEL_CONTAINER);
  wrapper.classList.add('umd-lock');
  wrapper.classList.add(ELEMENTS.CAROUSEL_CONTAINER_WRAPPER);

  wrapper.appendChild(slot);
  container.appendChild(fowardButton);
  container.appendChild(wrapper);

  return container;
};
