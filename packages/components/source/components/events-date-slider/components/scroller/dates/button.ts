import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import { BACK_ARROW_ICON, FORWARD_ARROW_ICON } from 'assets/icons';
import { EventSlideDates, ButtonVisibilityLogic } from '../../../events';
import {
  BREAKPOINTS,
  CONTAINER_DARK_CLASS,
  ARROW_CLASS,
  ELEMENT_TYPE,
} from '../../../variables';

const FORWARD_ARROW_CLASS = 'umd-element-date-slider-forward-arrow';
const BACK_ARROW_CLASS = 'umd-element-date-slider-back-arrow';

export const ButtonStyles = `
  :host .${ARROW_CLASS} {
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
    :host .${ARROW_CLASS} {
      width: 48px;
      height: 48px;
    }
  }
  
  :host .${ARROW_CLASS}:hover {
    background-color: ${colors.black};
  }
  
  :host .${ARROW_CLASS}:hover svg {
    fill: ${colors.white};
  }
  
  :host .${ARROW_CLASS} svg {
    transition: fill .5s;
    fill: ${colors.black};
    width: 16px;
    height: 6px;
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${ARROW_CLASS} svg {
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

  :host .${CONTAINER_DARK_CLASS} .${ARROW_CLASS} {
    background-color: ${colors.gray.dark};
  }

  :host .${CONTAINER_DARK_CLASS} .${ARROW_CLASS} svg {
    fill: ${colors.white}
  }

  :host .${CONTAINER_DARK_CLASS} .${ARROW_CLASS}:hover {
    background-color: ${colors.white}
  }

  :host .${CONTAINER_DARK_CLASS} .${ARROW_CLASS}:hover svg {
    fill: ${colors.black}
  }
`;

export const CreateBackButton = ({ element }: { element: ELEMENT_TYPE }) => {
  const button = document.createElement('button');

  button.innerHTML = BACK_ARROW_ICON;
  button.classList.add(ARROW_CLASS);
  button.classList.add(BACK_ARROW_CLASS);
  button.style.display = 'none';

  button.addEventListener('click', () => {
    element.setCountBackward();
    EventSlideDates({ forward: false, element });
    ButtonVisibilityLogic({ element });
  });

  return button;
};

export const CreateForwardButton = ({ element }: { element: ELEMENT_TYPE }) => {
  const button = document.createElement('button');

  button.innerHTML = FORWARD_ARROW_ICON;
  button.classList.add(ARROW_CLASS);
  button.classList.add(FORWARD_ARROW_CLASS);

  button.addEventListener('click', () => {
    element.setCountForward();
    EventSlideDates({ forward: true, element });
    ButtonVisibilityLogic({ element });
  });

  return button;
};
