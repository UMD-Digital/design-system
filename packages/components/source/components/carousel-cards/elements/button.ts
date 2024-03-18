import { Tokens } from '@universityofmaryland/variables';
import { FORWARD_ARROW_ICON } from 'assets/icons';
import { BREAKPOINTS, ELEMENTS, VARIABLES } from '../globals';
import { UMDCarouselCardsElement } from '../index';

const { Colors, Spacing } = Tokens;

const { LARGE } = BREAKPOINTS;
const { ANIMATION_DURATION, ELEMENT_NAME } = VARIABLES;
const { CAROUSEL_CARDS_BUTTON_BACKWARDS, CAROUSEL_CARDS_BUTTON_FORWARDS } =
  ELEMENTS;

const CAROUSEL_CARDS_BUTTON = `umd-carousel-cards-button`;

const backwardsButtonStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${CAROUSEL_CARDS_BUTTON_BACKWARDS} {
      left: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CAROUSEL_CARDS_BUTTON_BACKWARDS} {
      left: -52px;
    }
  }

  .${CAROUSEL_CARDS_BUTTON_BACKWARDS} svg {
    transform: rotate(180deg);
  }
`;

const forwardButtonStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${CAROUSEL_CARDS_BUTTON_FORWARDS} {
      left: 49px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CAROUSEL_CARDS_BUTTON_FORWARDS} {
      right: -52px;
    }
  }
`;

// prettier-ignore
export const ButtonStyles = `
  .${CAROUSEL_CARDS_BUTTON} {
    background-color: ${Colors.red};
    padding: ${Spacing.xs};
    position: absolute;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    display: none;
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${CAROUSEL_CARDS_BUTTON} {
      bottom: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CAROUSEL_CARDS_BUTTON} {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .${CAROUSEL_CARDS_BUTTON}:disabled {
    opacity: 0.5;
  }

  .${CAROUSEL_CARDS_BUTTON} svg {
    width: 24px;
    height: 24px;
    fill: ${Colors.white};
  }

  ${backwardsButtonStyles}
  ${forwardButtonStyles}
`;

export const CreateButton = ({
  element,
  isRight = true,
}: {
  element: UMDCarouselCardsElement;
  isRight?: boolean;
}) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Next');
  button.classList.add(CAROUSEL_CARDS_BUTTON);
  button.innerHTML = FORWARD_ARROW_ICON;

  if (isRight) button.classList.add(CAROUSEL_CARDS_BUTTON_FORWARDS);

  if (!isRight) {
    button.classList.add(CAROUSEL_CARDS_BUTTON_BACKWARDS);
    button.setAttribute('aria-label', 'Previous');
  }

  button.addEventListener('click', () => {
    if (isRight) element.eventMoveForward();
    if (!isRight) element.eventMoveBackwards();
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, ANIMATION_DURATION + 100);
  });

  return button;
};
