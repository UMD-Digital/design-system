import { spacing, umdLock } from '@universityofmaryland/umd-web-configuration';
import { MakeSlot } from 'helpers/ui';
import {
  CovertObjectMediaQueriesToStyles,
  CovertObjectToStyles,
} from 'helpers/styles';
import { SLOTS, BREAKPOINTS } from '../globals';

const INTRO_CONTAINER = 'umd-carousel-cards-intro-container';
const INTRO_CONTAINER_LOCK = 'umd-carousel-cards-intro-container-lock';

export const IntroContainerStyles = `
  @container umd-carousel-card (max-width: ${BREAKPOINTS.large - 1}px) {
    .${INTRO_CONTAINER} {
      margin-bottom: ${spacing.md};
    }
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${INTRO_CONTAINER} {
      width: calc(40% - ${spacing['2xl']});
      padding-right: ${spacing['2xl']};
    }
  }

  .${INTRO_CONTAINER_LOCK} {
    ${CovertObjectToStyles({ styles: umdLock['.umd-lock'] })}
  }

  ${CovertObjectMediaQueriesToStyles({
    element: INTRO_CONTAINER_LOCK,
    styles: umdLock['.umd-lock'],
  })}

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${INTRO_CONTAINER} .${INTRO_CONTAINER_LOCK} {
      max-width: inherit;
      padding: 0;
    }
  }
`;

export const CreateIntroColumn = () => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const introSlot = MakeSlot({ type: SLOTS.intro });

  wrapper.classList.add(INTRO_CONTAINER_LOCK);

  container.classList.add(INTRO_CONTAINER);
  wrapper.appendChild(introSlot);

  container.appendChild(wrapper);

  return container;
};
