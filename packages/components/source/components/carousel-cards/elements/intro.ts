import { spacing } from '@universityofmaryland/umd-web-configuration';
import { MakeSlot } from 'helpers/ui';
import { SLOTS, BREAKPOINTS } from '../globals';

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
      padding-right: ${spacing['2xl']};
    }
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${INTRO_CONTAINER} .umd-lock {
      max-width: inherit;
      padding: 0;
    }
  }
`;

export const CreateIntroColumn = () => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const introSlot = MakeSlot({ type: SLOTS.intro });

  wrapper.classList.add('umd-lock');

  container.classList.add(INTRO_CONTAINER);
  wrapper.appendChild(introSlot);

  container.appendChild(wrapper);

  return container;
};
