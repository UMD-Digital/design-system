import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { FORWARD_ARROW_ICON } from '../../../assets/icons';
import { ELEMENT_TYPE, BREAKPOINTS } from '../variables';

const BUTTON_CONTAINER = `umd-carousel-button-container`;

export const ButtonStyles = `
  .${BUTTON_CONTAINER} {
    background-color: ${colors.red};
    padding: ${spacing.xs};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${BUTTON_CONTAINER} {
      right: -52px;
    }
  }


  .${BUTTON_CONTAINER} svg {
    width: 24px;
    height: 24px;
    fill: ${colors.white};
  }
`;

export const CreateButton = ({ element }: { element: ELEMENT_TYPE }) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Next');
  button.classList.add(BUTTON_CONTAINER);
  button.innerHTML = FORWARD_ARROW_ICON;
  button.addEventListener('click', () => {
    element.eventMoveForward();
  });

  return button;
};
