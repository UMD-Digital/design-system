import { Tokens } from '@universityofmaryland/variables';
import { BREAKPOINTS, ELEMENTS } from 'components/events-date-slider/globals';

const { Colors } = Tokens;

const { tablet } = BREAKPOINTS;
const { CONTAINER_DARK_CLASS } = ELEMENTS;

const COVER_CLASS = 'umd-element-date-slider-date-lock-cover';

export const CoverStyles = `
  .${COVER_CLASS} {
    display: block;
    position: absolute;
    width: 200vw;
    height: 100%;
    top: 0;
    left: -100vw;
    background-color: ${Colors.gray.lighter};
  }

  @container dates-slider (min-width: ${tablet}px) {
  .${COVER_CLASS} {
      width: 40vw;
      left: calc(100% - 1px);
    }
  }

  .${CONTAINER_DARK_CLASS} .${COVER_CLASS} {
    background-color: ${Colors.gray.darker};
  }
`;

export const CreateCoverElement = () => {
  const coverElement = document.createElement('div');
  coverElement.classList.add(COVER_CLASS);

  return coverElement;
};
