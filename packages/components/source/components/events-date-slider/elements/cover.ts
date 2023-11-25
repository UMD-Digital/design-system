import { colors } from '@universityofmaryland/umd-web-configuration';
import { BREAKPOINTS, ELEMENTS } from '../globals';

const COVER_CLASS = 'umd-element-date-slider-date-lock-cover';

export const CoverStyles = `
   :host .${COVER_CLASS} {
    display: block;
    position: absolute;
    width: 200vw;
    height: 100%;
    top: 0;
    left: -100vw;
    background-color: ${colors.gray.lighter};
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${COVER_CLASS} {
      width: 40vw;
      left: calc(100% - 1px);
    }
  }

  :host .${ELEMENTS.CONTAINER_DARK_CLASS} .${COVER_CLASS} {
    background-color: ${colors.gray.darker};
  }
`;

export const CreateCoverElement = () => {
  const coverElement = document.createElement('div');
  coverElement.classList.add(COVER_CLASS);
  return coverElement;
};
