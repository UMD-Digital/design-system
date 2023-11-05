import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import { MakeSlot } from 'helpers/ui';
import { SLOT_NAME_INTRO, BREAKPOINTS } from '../variables';

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
`;

export const CreateCarouselColumn = () => {
  const container = document.createElement('div');

  container.innerHTML = `Coming soon!`;

  container.classList.add(CAROUSEL_CONTAINER);

  return container;
};
