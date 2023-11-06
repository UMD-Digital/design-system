import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { MakeSlot } from 'helpers/ui';
import { SLOT_NAME_INTRO, BREAKPOINTS } from '../variables';

const INTRO_CONTAINER = 'umd-carousel-cards-intro-container';

export const IntroContainerStyles = `
  @container umd-carousel-card (max-width: ${BREAKPOINTS.large - 1}px) {
    .${INTRO_CONTAINER} {
      margin-bottom: ${spacing.md};
    }
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${INTRO_CONTAINER} {
      width: 40%;
      padding-right: ${spacing.lg};
    }
  }
`;

export const CreateIntroColumn = () => {
  const container = document.createElement('div');
  const introSlot = MakeSlot({ type: SLOT_NAME_INTRO });

  container.classList.add(INTRO_CONTAINER);
  container.appendChild(introSlot);

  return container;
};
