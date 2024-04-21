import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon } from 'utilities';
import { ButtonVisibilityLogic } from '../../../services/helpers';
import { EventSlideDates } from '../../../services/events';
import { BREAKPOINTS, ELEMENTS, REFERENCES } from '../../../globals';
import { ELEMENT_TYPE } from '../../../index';

const { Colors, Spacing } = Tokens;

const { TABLET } = BREAKPOINTS;
const { CONTAINER_CLASS, ARROW_CLASS } = ELEMENTS;
const { IS_THEME_DARK } = REFERENCES;

const FORWARD_ARROW_CLASS = 'umd-element-date-slider-forward-arrow';
const BACK_ARROW_CLASS = 'umd-element-date-slider-back-arrow';

const darkThemeStyles = `
  .${CONTAINER_CLASS}${IS_THEME_DARK} .${ARROW_CLASS} {
    background-color: ${Colors.gray.dark};
  }

  .${CONTAINER_CLASS}${IS_THEME_DARK} .${ARROW_CLASS} svg {
    fill: ${Colors.white}
  }

  .${CONTAINER_CLASS}${IS_THEME_DARK} .${ARROW_CLASS}:hover {
    background-color: ${Colors.white}
  }

  .${CONTAINER_CLASS}${IS_THEME_DARK} .${ARROW_CLASS}:hover svg {
    fill: ${Colors.black}
  }
`;

export const ButtonStyles = `
  .${ARROW_CLASS} {
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

  @container dates-slider (min-width: ${TABLET}px) {
    .${ARROW_CLASS} {
      width: 48px;
      height: 48px;
    }
  }

  .${ARROW_CLASS}:hover {
    background-color: ${Colors.black};
  }

  .${ARROW_CLASS}:hover svg {
    fill: ${Colors.white};
  }

  .${ARROW_CLASS} svg {
    transition: fill .5s;
    fill: ${Colors.black};
    width: 16px;
    height: 6px;
  }

  @container dates-slider (min-width: ${TABLET}px) {
    .${ARROW_CLASS} svg {
      width: 24px;
      height: 8px;
    }
  }

  .${BACK_ARROW_CLASS} {
    left: 0;
  }

  @container dates-slider (max-width: ${TABLET - 1}px) {
    .${BACK_ARROW_CLASS} {
      left: -24px;
      top: ${Spacing.xs};
    }
  }

  .${FORWARD_ARROW_CLASS} {
    right: 0;
  }

  @container dates-slider (max-width: ${TABLET - 1}px) {
    .${FORWARD_ARROW_CLASS} {
      right: -24px;
      top: ${Spacing.xs};
    }
  }

  ${darkThemeStyles}
`;

export const CreateBackButton = ({ element }: { element: ELEMENT_TYPE }) => {
  const button = document.createElement('button');

  button.innerHTML = AssetIcon.BACK_ARROW;
  button.classList.add(ARROW_CLASS);
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

  button.innerHTML = AssetIcon.FORWARD_ARROW;
  button.classList.add(ARROW_CLASS);
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
