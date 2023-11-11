import { MakeSlot } from 'helpers/ui';
import { BREAKPOINTS, SLOTS } from '../../globals';

const INTRO_CONTAINER_CLASS = 'umd-element-date-slider-intro-container';

export const IntroStyles = `
  :host .${INTRO_CONTAINER_CLASS} {
    margin-bottom: 24px;
  }
  
  @container dates-slider (max-width: ${BREAKPOINTS.tablet - 1}px) {
    :host .${INTRO_CONTAINER_CLASS} {
      text-align: center;
    }
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${INTRO_CONTAINER_CLASS} {
      padding-right: 24px;
      padding-left: 0;
      width: 200px;
      margin-bottom: 0;
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    ::slotted(div[slot="${SLOTS.INTRODUCTION_SLOT_NAME}"]) {
      width: 100%;
    }
  }
`;

export const CreateIntroWrapper = () => {
  const introductionWrapper = document.createElement('div');
  const infoSlot = MakeSlot({ type: SLOTS.INTRODUCTION_SLOT_NAME });

  introductionWrapper.classList.add(INTRO_CONTAINER_CLASS);
  introductionWrapper.appendChild(infoSlot);

  return introductionWrapper;
};
