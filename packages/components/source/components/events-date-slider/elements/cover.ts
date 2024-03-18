import { Tokens } from '@universityofmaryland/variables';
import {
  BREAKPOINTS,
  ELEMENTS,
  REFERENCES,
} from 'components/events-date-slider/globals';

const { Colors } = Tokens;

const { TABLET } = BREAKPOINTS;
const { CONTAINER_CLASS } = ELEMENTS;
const { IS_THEME_DARK } = REFERENCES;

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

  @container dates-slider (min-width: ${TABLET}px) {
    .${COVER_CLASS} {
      width: 40vw;
      left: calc(100% - 1px);
    }
  }

  .${CONTAINER_CLASS}${IS_THEME_DARK} .${COVER_CLASS} {
    background-color: ${Colors.gray.darker};
  }
`;

export const CreateCoverElement = () => {
  const coverElement = document.createElement('div');
  coverElement.classList.add(COVER_CLASS);

  return coverElement;
};
