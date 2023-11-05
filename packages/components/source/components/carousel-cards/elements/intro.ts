import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import { MakeSlot } from 'helpers/ui';
import { SLOT_NAME_INTRO } from '../variables';

const INTRO_CONTAINER = 'umd-carousel-cards-intro-container';

export const IntroContainerStyles = `
  .${INTRO_CONTAINER} {

  }

  .${INTRO_CONTAINER} ::slotted(*) {
    color: ${colors.white} !important;
  }

`;

export const CreateIntroColumn = () => {
  const container = document.createElement('div');
  const introSlot = MakeSlot({ type: SLOT_NAME_INTRO });

  container.classList.add(INTRO_CONTAINER);
  container.appendChild(introSlot);

  return container;
};
