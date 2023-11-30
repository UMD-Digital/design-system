import { spacing } from '@universityofmaryland/umd-web-configuration';
import { MakeSlot } from 'helpers/ui';
import { BREAKPOINTS, SLOTS } from '../../globals';

const INTRO_CONTAINER_CLASS = 'umd-element-date-slider-intro-container';
const HEADLINE_WRAPPER_CLASS = 'umd-element-date-slider-headline-wrapper';
const LINK_WRAPPER_CLASS = 'umd-element-date-slider-link-wrapper';

export const IntroStyles = `
  :host .${INTRO_CONTAINER_CLASS} {
    margin-bottom: ${spacing.md};
    padding: 0 ${spacing.lg};
    position: relative;
  }

  @container dates-slider (max-width: ${BREAKPOINTS.tablet - 1}px) {
    :host .${INTRO_CONTAINER_CLASS} {
      text-align: center;
    }
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${INTRO_CONTAINER_CLASS} {
      padding: 0;
      padding-right: 24px;
      padding-left: 0;
      width: 200px;
      margin-bottom: 0;
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    ::slotted(div[slot="${SLOTS.HEADLINE_SLOT_NAME}"]) {
      width: 100%;
    }
  }

  .${HEADLINE_WRAPPER_CLASS} ::slotted(*) {
    margin: 0;
  }
`;

export const CreateIntroWrapper = () => {
  const introductionWrapper = document.createElement('div');
  const headlineWrapper = document.createElement('div');
  const linkWrapper = document.createElement('div');

  const headlineSlot = MakeSlot({ type: SLOTS.HEADLINE_SLOT_NAME });
  const linkSlot = MakeSlot({ type: SLOTS.LINK_SLOT_NAME });

  headlineWrapper.appendChild(headlineSlot);
  linkWrapper.appendChild(linkSlot);

  introductionWrapper.classList.add(INTRO_CONTAINER_CLASS);
  introductionWrapper.appendChild(headlineWrapper);
  introductionWrapper.appendChild(linkWrapper);

  return introductionWrapper;
};
