import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { BACK_ARROW_ICON, FORWARD_ARROW_ICON } from 'assets/icons';
import { ELEMENT_TYPE } from '../../../component';
import { ButtonVisibilityLogic } from '../../../services/helpers';
import { EventSlideDates } from '../../../services/events';
import { BREAKPOINTS, ELEMENTS } from '../../../globals';

const FORWARD_ARROW_CLASS = 'umd-element-date-slider-forward-arrow';
const BACK_ARROW_CLASS = 'umd-element-date-slider-back-arrow';

export const ButtonStyles = `
  :host .${ELEMENTS.ARROW_CLASS} {
    border: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.gray.light};
    transition: background-color .5s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${ELEMENTS.ARROW_CLASS} {
      width: 48px;
      height: 48px;
    }
  }
  
  :host .${ELEMENTS.ARROW_CLASS}:hover {
    background-color: ${colors.black};
  }
  
  :host .${ELEMENTS.ARROW_CLASS}:hover svg {
    fill: ${colors.white};
  }
  
  :host .${ELEMENTS.ARROW_CLASS} svg {
    transition: fill .5s;
    fill: ${colors.black};
    width: 16px;
    height: 6px;
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${ELEMENTS.ARROW_CLASS} svg {
      width: 24px;
      height: 8px;
    }
  }
  
  :host .${BACK_ARROW_CLASS} {
    left: 0;
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${BACK_ARROW_CLASS} {
      left: -${spacing.md};
    }
  }
  
  :host .${FORWARD_ARROW_CLASS} {
    right: 0;
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${FORWARD_ARROW_CLASS} {
      right: -${spacing.md};
    }
  }

  :host .${ELEMENTS.CONTAINER_DARK_CLASS} .${ELEMENTS.ARROW_CLASS} {
    background-color: ${colors.gray.dark};
  }

  :host .${ELEMENTS.CONTAINER_DARK_CLASS} .${ELEMENTS.ARROW_CLASS} svg {
    fill: ${colors.white}
  }

  :host .${ELEMENTS.CONTAINER_DARK_CLASS} .${ELEMENTS.ARROW_CLASS}:hover {
    background-color: ${colors.white}
  }

  :host .${ELEMENTS.CONTAINER_DARK_CLASS} .${ELEMENTS.ARROW_CLASS}:hover svg {
    fill: ${colors.black}
  }
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
