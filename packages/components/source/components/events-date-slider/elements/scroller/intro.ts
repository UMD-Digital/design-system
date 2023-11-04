import { BREAKPOINTS, INTRODUCTION_SLOT_NAME } from '../../variables';
import { MakeSlot } from 'helpers/ui';

const INTRO_CONTAINER_CLASS = 'umd-element-date-slider-intro-container';

export const IntroStyles = `
  :host .${INTRO_CONTAINER_CLASS} {
    margin-bottom: 24px;
    padding-left: 48px;
  }
  
  @container dates-slider (max-width: ${BREAKPOINTS.tablet - 1}px) {
    :host .${INTRO_CONTAINER_CLASS} {
      text-align: center;
    }
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${INTRO_CONTAINER_CLASS} {
      padding-right: 48px;
      padding-left: 0;
      width: 140px;
      margin-bottom: 0;
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    ::slotted(div[slot="${INTRODUCTION_SLOT_NAME}"]) {
      width: 140px;
    }
  }
`;

export const CreateIntroWrapper = () => {
  const introductionWrapper = document.createElement('div');
  const infoSlot = MakeSlot({ type: INTRODUCTION_SLOT_NAME });

  introductionWrapper.classList.add(INTRO_CONTAINER_CLASS);
  introductionWrapper.appendChild(infoSlot);

  return introductionWrapper;
};
