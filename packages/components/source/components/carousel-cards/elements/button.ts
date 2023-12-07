import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { FORWARD_ARROW_ICON } from 'assets/icons';
import { ELEMENT_TYPE } from 'components/carousel-cards/component';
import {
  BREAKPOINTS,
  ELEMENTS,
  VARIABLES,
} from 'components/carousel-cards/globals';

// prettier-ignore
export const ButtonStyles = `
  .${ELEMENTS.CAROUSEL_CARDS_BUTTON} {
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
    cursor: pointer;
    display: none;
  }

  .${ELEMENTS.CAROUSEL_CARDS_BUTTON}:disabled {
    opacity: 0.5;
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${ELEMENTS.CAROUSEL_CARDS_BUTTON} {
      right: -52px;
    }
  }

  .${ELEMENTS.CAROUSEL_CARDS_BUTTON} svg {
    width: 24px;
    height: 24px;
    fill: ${colors.white};
  }
`;

export const CreateButton = ({ element }: { element: ELEMENT_TYPE }) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Next');
  button.classList.add(ELEMENTS.CAROUSEL_CARDS_BUTTON);
  button.innerHTML = FORWARD_ARROW_ICON;
  button.addEventListener('click', () => {
    element.eventMoveForward();
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, VARIABLES.ANIMATION_DURATION + 100);
  });

  return button;
};
