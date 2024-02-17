import { Tokens } from '@universityofmaryland/variables';
import { BREAKPOINTS, ELEMENTS } from 'components/events-date-slider/globals';

const { colors } = Tokens;

const COVER_CLASS = 'umd-element-date-slider-date-lock-cover';

export const CoverStyles = `
  .${COVER_CLASS} {
    display: block;
    position: absolute;
    width: 200vw;
    height: 100%;
    top: 0;
    left: -100vw;
    background-color: ${colors.gray.lighter};
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
  .${COVER_CLASS} {
      width: 40vw;
      left: calc(100% - 1px);
    }
  }

  .${ELEMENTS.CONTAINER_DARK_CLASS} .${COVER_CLASS} {
    background-color: ${colors.gray.darker};
  }
`;

export const CreateCoverElement = () => {
  const coverElement = document.createElement('div');
  coverElement.classList.add(COVER_CLASS);

  return coverElement;
};
