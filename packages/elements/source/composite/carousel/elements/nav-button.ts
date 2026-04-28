import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { arrow_right as iconArrowRight } from '@universityofmaryland/web-icons-library/arrows';

type TypeCarouselNavButtonProps = {
  className: string;
  direction: 'prev' | 'next';
  label?: string;
};

type TypeButtonHelpers = {
  GetButtons: {
    prev: () => HTMLButtonElement;
    next: () => HTMLButtonElement;
  };
  GetElements: {
    blocks: () => HTMLElement[];
  };
  GetViewOptions: {
    shouldShowLeftButton: () => boolean;
    shouldShowRightButton: () => boolean;
    showCount: () => number;
  };
};

const BUTTON_DISABLE_DURATION = 750;

export const createCarouselNavButton = ({
  className,
  direction,
  label,
}: TypeCarouselNavButtonProps) => {
  const isPrev = direction === 'prev';
  const defaultLabel = isPrev ? 'Previous' : 'Next';
  const ariaLabel = label || defaultLabel;

  return new ElementBuilder('button')
    .withClassName(className)
    .withAttribute('type', 'button')
    .withAria({ label: ariaLabel })
    .withHTML(iconArrowRight)
    .withStyles({
      element: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        width: token.spacing['2xl'],
        height: token.spacing['2xl'],
        transition: 'background-color 0.3s',
        '& svg': {
          width: token.spacing.sm,
          height: token.spacing.sm,
          transition: 'fill 0.3s',
          ...(isPrev && { transform: 'rotate(180deg)' }),
        },
      },
    });
};

export const ButtonVisibility = (props: TypeButtonHelpers) => {
  const { GetElements, GetButtons, GetViewOptions } = props;
  const previousButton = GetButtons.prev();
  const nextButton = GetButtons.next();
  const buttons = [nextButton, previousButton];

  const shouldShowLeftButton = GetViewOptions.shouldShowLeftButton();
  const shouldShowRightButton = GetViewOptions.shouldShowRightButton();
  const showCount = GetViewOptions.showCount();
  const cardsTotal = GetElements.blocks().length;
  const shouldHideLeftButton = showCount > 1 && !shouldShowLeftButton;
  const shouldHideRightButton = showCount > 1 && !shouldShowRightButton;

  if (cardsTotal === showCount) {
    buttons.forEach((button) => (button.style.display = 'none'));
    return;
  }

  if (shouldHideLeftButton) {
    previousButton.style.display = 'none';
  } else {
    previousButton.style.display = 'flex';
  }

  if (shouldHideRightButton) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'flex';
  }
};

export const CreateButton = ({
  EventMoveForward,
  EventMoveBackward,
  isRight = true,
  isVerticalCenter = false,
  outsetOffset,
  backgroundColor,
}: {
  EventMoveForward: () => void;
  EventMoveBackward: () => void;
  isRight?: boolean;
  isVerticalCenter?: boolean;
  outsetOffset?: string;
  backgroundColor?: string;
}) => {
  const buttonDirection = isRight
    ? 'animation-carousel-block-button-next'
    : 'animation-carousel-block-button-previous';

  return createCarouselNavButton({
    className: buttonDirection,
    direction: isRight ? 'next' : 'prev',
  })
    .withClassName('animation-carousel-block-button')
    .withStyles({
      element: {
        ...buttonColorsOnWhite(),
        ...(backgroundColor === token.color.red && buttonColorsOnBlack()),
        ...(backgroundColor === token.color.white && buttonColorsOnGray()),
        '& svg': {
          fill: backgroundColor === token.color.red ? token.color.white : token.color.black,
          width: '20px',
          height: '20px',
        },
        padding: `10px ${token.spacing.xs}`,
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        transform: 'none',
        zIndex: 9999,
        display: 'none',
        '&:disabled': { opacity: 0.5 },
        [`@media (${token.media.queries.desktop.min})`]: {
          position: 'absolute',
          ...(isVerticalCenter && {
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            ...(outsetOffset && { left: `-${outsetOffset}` }),
            ...(isRight && {
              left: 'auto',
              right: 0,
              ...(outsetOffset && { right: `-${outsetOffset}` }),
            }),
          }),
        },
      },
    })
    .on('click', (event) => {
      const button = event.currentTarget as HTMLButtonElement;
      if (isRight) {
        EventMoveForward();
      } else {
        EventMoveBackward();
      }
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
      }, BUTTON_DISABLE_DURATION);
    })
    .build();
};

export const buttonColorsOnGray = (isThemeDark?: boolean) => ({
  backgroundColor: token.color.white,
  '& svg': { fill: token.color.black },
  '&:hover': {
    backgroundColor: token.color.gray.darker,
    '& svg': { fill: token.color.white },
  },
  ...(isThemeDark && {
    backgroundColor: token.color.red,
    '& svg': { fill: token.color.white },
    '&:hover': {
      backgroundColor: token.color.white,
      '& svg': { fill: token.color.black },
    },
  }),
});

export const buttonColorsOnWhite = (isThemeDark?: boolean) => ({
  backgroundColor: token.color.gray.lightest,
  '& svg': { fill: token.color.black },
  '&:hover': {
    backgroundColor: token.color.gray.darker,
    '& svg': { fill: token.color.white },
  },
  ...(isThemeDark && {
    backgroundColor: token.color.red,
    '& svg': { fill: token.color.white },
    '&:hover': {
      backgroundColor: token.color.white,
      '& svg': { fill: token.color.black },
    },
  }),
});

export const buttonColorsOnBlack = () => ({
  backgroundColor: token.color.red,
  '& svg': { fill: token.color.white },
  '&:hover': {
    backgroundColor: token.color.white,
    '& svg': { fill: token.color.black },
  },
});
