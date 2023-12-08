import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { FORWARD_ARROW_ICON } from 'assets/icons';
import { ELEMENT_TYPE } from 'components/carousel-cards/component';
import {
  BREAKPOINTS,
  ELEMENTS,
  VARIABLES,
} from 'components/carousel-cards/globals';

const CAROUSEL_CARDS_BUTTON = `umd-carousel-cards-button`;

const backwardsButtonStyles = `
  .${ELEMENTS.CAROUSEL_CARDS_BUTTON_BACKWARDS} {
    left: 0;
    right: inherit;
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${ELEMENTS.CAROUSEL_CARDS_BUTTON_BACKWARDS} {
      left: -52px;
    }
  }

  .${ELEMENTS.CAROUSEL_CARDS_BUTTON_BACKWARDS} svg {
    transform: rotate(180deg);
  }
`;

const forwardButtonStyles = `
  .${ELEMENTS.CAROUSEL_CARDS_BUTTON_FORWARDS} {
    right: 0;
  }

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${ELEMENTS.CAROUSEL_CARDS_BUTTON_FORWARDS} {
      right: -52px;
    }
  }

`;

// prettier-ignore
export const ButtonStyles = `
  .${CAROUSEL_CARDS_BUTTON} {
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

  @container umd-carousel-card (min-width: ${BREAKPOINTS.large}px) {
    .${CAROUSEL_CARDS_BUTTON} {
      right: -52px;
    }
  }

  .${CAROUSEL_CARDS_BUTTON}:disabled {
    opacity: 0.5;
  }

  .${CAROUSEL_CARDS_BUTTON} svg {
    width: 24px;
    height: 24px;
    fill: ${colors.white};
  }

  ${backwardsButtonStyles}
  ${forwardButtonStyles}
`;

export const CreateButton = ({
  element,
  isRight = true,
}: {
  element: ELEMENT_TYPE;
  isRight?: boolean;
}) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Next');
  button.classList.add(CAROUSEL_CARDS_BUTTON);
  button.innerHTML = FORWARD_ARROW_ICON;

  if (isRight) button.classList.add(ELEMENTS.CAROUSEL_CARDS_BUTTON_FORWARDS);

  if (!isRight) {
    button.classList.add(ELEMENTS.CAROUSEL_CARDS_BUTTON_BACKWARDS);
    button.setAttribute('aria-label', 'Previous');
  }

  button.addEventListener('click', () => {
    if (isRight) element.eventMoveForward();
    if (!isRight) element.eventMoveBackwards();
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, VARIABLES.ANIMATION_DURATION + 100);
  });

  return button;
};
