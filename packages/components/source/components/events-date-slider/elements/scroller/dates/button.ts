import { Tokens } from '@universityofmaryland/variables';
import { BACK_ARROW_ICON, FORWARD_ARROW_ICON } from 'assets/icons';
import { ELEMENT_TYPE } from 'components/events-date-slider/component';
import { BREAKPOINTS, ELEMENTS } from 'components/events-date-slider/globals';
import { ButtonVisibilityLogic } from '../../../services/helpers';
import { EventSlideDates } from '../../../services/events';

const { Colors, Spacing } = Tokens;

const FORWARD_ARROW_CLASS = 'umd-element-date-slider-forward-arrow';
const BACK_ARROW_CLASS = 'umd-element-date-slider-back-arrow';

const darkThemeStyles = `
  .${ELEMENTS.CONTAINER_DARK_CLASS} .${ELEMENTS.ARROW_CLASS} {
    background-color: ${Colors.gray.dark};
  }

  .${ELEMENTS.CONTAINER_DARK_CLASS} .${ELEMENTS.ARROW_CLASS} svg {
    fill: ${Colors.white}
  }

  .${ELEMENTS.CONTAINER_DARK_CLASS} .${ELEMENTS.ARROW_CLASS}:hover {
    background-color: ${Colors.white}
  }

  .${ELEMENTS.CONTAINER_DARK_CLASS} .${ELEMENTS.ARROW_CLASS}:hover svg {
    fill: ${Colors.black}
  }
`;

export const ButtonStyles = `
  .${ELEMENTS.ARROW_CLASS} {
    border: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.gray.light};
    transition: background-color .5s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    .${ELEMENTS.ARROW_CLASS} {
      width: 48px;
      height: 48px;
    }
  }

  .${ELEMENTS.ARROW_CLASS}:hover {
    background-color: ${Colors.black};
  }

  .${ELEMENTS.ARROW_CLASS}:hover svg {
    fill: ${Colors.white};
  }

  .${ELEMENTS.ARROW_CLASS} svg {
    transition: fill .5s;
    fill: ${Colors.black};
    width: 16px;
    height: 6px;
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    .${ELEMENTS.ARROW_CLASS} svg {
      width: 24px;
      height: 8px;
    }
  }

  .${BACK_ARROW_CLASS} {
    left: 0;
  }

  @container dates-slider (max-width: ${BREAKPOINTS.tablet - 1}px) {
    .${BACK_ARROW_CLASS} {
      left: -24px;
      top: ${Spacing.xs};
    }
  }

  .${FORWARD_ARROW_CLASS} {
    right: 0;
  }

  @container dates-slider (max-width: ${BREAKPOINTS.tablet - 1}px) {
    .${FORWARD_ARROW_CLASS} {
      right: -24px;
      top: ${Spacing.xs};
    }
  }

  ${darkThemeStyles}
`;

export const CreateBackButton = ({ element }: { element: ELEMENT_TYPE }) => {
  const button = document.createElement('button');

  button.innerHTML = BACK_ARROW_ICON;
  button.classList.add(ELEMENTS.ARROW_CLASS);
  button.classList.add(BACK_ARROW_CLASS);
  button.style.display = 'none';
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'see previous date');

  const clickEvent = () => {
    element.setCountBackward();
    EventSlideDates({ forward: false, element });
    ButtonVisibilityLogic({ element });
  };

  button.addEventListener('click', clickEvent);
  button.addEventListener('touchstart', clickEvent);

  return button;
};

export const CreateForwardButton = ({ element }: { element: ELEMENT_TYPE }) => {
  const button = document.createElement('button');

  button.innerHTML = FORWARD_ARROW_ICON;
  button.classList.add(ELEMENTS.ARROW_CLASS);
  button.classList.add(FORWARD_ARROW_CLASS);
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'see next date');

  const clickEvent = () => {
    element.setCountForward();
    EventSlideDates({ forward: true, element });
    ButtonVisibilityLogic({ element });
  };

  button.addEventListener('click', clickEvent);
  button.addEventListener('touchstart', clickEvent);

  return button;
};
