import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon, EventsUtility, Performance } from 'utilities';

type TypeAnimationCarouselBlockProps = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  cards: HTMLElement[];
};

type TypeCommonData = {
  GetElements: {
    container: () => HTMLDivElement;
    slide: () => HTMLElement;
    cards: () => HTMLElement[];
  };
  GetOptions: {
    isTabletView: () => boolean;
    showCount: () => number;
  };
  GetSizes: {
    cardWidth: () => number | undefined;
  };
  SetCarouselSize: () => void;
};

type TypeEventScroll = TypeCommonData & {
  isDirectionRight?: boolean;
};

const { Debounce } = Performance;
const { Colors, Spacing } = Tokens;

const CARD_BREAK = 650;
const LARGE = 1024;
const ANIMATION_DURATION = 500;
const MOBILE_COUNT = 1;
const TABLET_COUNT = 2;

const ELEMENT_NAME = 'umd-element-animation-carousel-block';

const ELEMENT_ANIMATION_CAROUSEL_DECLARATION =
  'animation-carousel-block-declaration';
const ELEMENT_ANIMATION_CAROUSEL_CONTAINER =
  'animation-carousel-block-container';
const ELEMENT_ANIMATION_CAROUSEL_WRAPPER = 'animation-carousel-block-wrapper';
const ELEMENT_ANIMATION_CAROUSEL_BUTTON = `animation-carousel-block-button`;

// prettier-ignore
const ButtonStyles = `
  .${ELEMENT_ANIMATION_CAROUSEL_BUTTON} {
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

  .${ELEMENT_ANIMATION_CAROUSEL_BUTTON}:disabled {
    opacity: 0.5;
  }

  .${ELEMENT_ANIMATION_CAROUSEL_BUTTON} svg {
    width: 24px;
    height: 24px;
    fill: ${Colors.white};
  }

  .${ELEMENT_ANIMATION_CAROUSEL_BUTTON}:last-of-type svg {
    transform: rotate(180deg);
  }
`;

// prettier-ignore
const ContainerStyles = `
  .${ELEMENT_ANIMATION_CAROUSEL_CONTAINER} {
    position: relative;
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ELEMENT_ANIMATION_CAROUSEL_CONTAINER} {
      padding-bottom: 60px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ELEMENT_ANIMATION_CAROUSEL_CONTAINER} {
      width: 60%;
    }
  }

  .${ELEMENT_ANIMATION_CAROUSEL_WRAPPER} {
    overflow: hidden;
    padding-right: 0;
    width: 100%;
  }

  @media (min-width: ${LARGE}px) {
    .${ELEMENT_ANIMATION_CAROUSEL_WRAPPER} {
      max-width: inherit;
      padding: 0;
    }
  }
`;

// prettier-ignore
const STYLES_CAROUSEL_CARDS_ELEMENT = `
  .${ELEMENT_ANIMATION_CAROUSEL_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    width: 100%;
  }

  ${ContainerStyles}
  ${ButtonStyles}
`;

const spaceBetween = parseInt(Spacing.md.replace('px', ''));

const EventScrollCarousel = (props: TypeEventScroll) => {
  const {
    GetElements,
    GetOptions,
    SetCarouselSize,
    isDirectionRight = true,
  } = props;
  const carouselSlider = GetElements.slide();
  const slotContent = Array.from(
    carouselSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];
  const isShowTwo = GetOptions.isTabletView();
  const elementCount = isShowTwo ? 2 : 1;
  const firstElement = slotContent[0];
  const lastElement = slotContent[slotContent.length - 1];
  const nextElement = slotContent[elementCount];
  const elementSize = firstElement.offsetWidth;
  const elementSizeWithSpace = elementSize + spaceBetween;

  if (!nextElement) return;

  const scrollTabletRight = () => {
    const temporaryCarouselSize =
      elementSize * elementCount +
      spaceBetween / elementCount +
      elementSizeWithSpace;

    const animateRight = () => {
      carouselSlider.style.width = `${temporaryCarouselSize}px`;
      nextElement.style.display = 'block';
      carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms`;
      carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        const clonedElement = firstElement.cloneNode(true) as HTMLDivElement;
        carouselSlider.appendChild(clonedElement);
        clonedElement.style.display = 'none';

        carouselSlider.removeChild(firstElement);
        SetCarouselSize();
      }, ANIMATION_DURATION - 50);
    };

    const animateLeft = () => {
      const clonedElement = lastElement.cloneNode(true) as HTMLDivElement;
      const removedElement = slotContent[1];

      carouselSlider.style.width = `${temporaryCarouselSize}px`;
      carouselSlider.prepend(clonedElement);
      clonedElement.style.display = 'block';
      carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms`;
        carouselSlider.style.transform = `translateX(0)`;
      }, 10);

      setTimeout(() => {
        removedElement.style.display = 'none';
        carouselSlider.removeChild(lastElement);

        SetCarouselSize();
      }, ANIMATION_DURATION - 50);
    };

    isDirectionRight ? animateRight() : animateLeft();
  };

  const scrollMobileRight = () => {
    const isOnlyTwo = slotContent.length === 2;
    const temporaryCarouselSize = elementSize * 3 + spaceBetween * 2;

    const animateRight = () => {
      const clonedElement = firstElement.cloneNode(true) as HTMLElement;
      const upcomingElement = isOnlyTwo ? clonedElement : slotContent[2];
      clonedElement.style.display = 'none';
      carouselSlider.appendChild(clonedElement);

      carouselSlider.style.width = `${temporaryCarouselSize}px`;
      upcomingElement.style.display = 'block';
      carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
      carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        carouselSlider.removeChild(firstElement);

        SetCarouselSize();
      }, ANIMATION_DURATION + 100);
    };

    const animateLeft = () => {
      const clonedElement = lastElement.cloneNode(true) as HTMLDivElement;
      const removedElement = slotContent[1];

      carouselSlider.style.width = `${temporaryCarouselSize}px`;
      carouselSlider.prepend(clonedElement);
      clonedElement.style.display = 'block';
      carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

      setTimeout(() => {
        carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms`;
        carouselSlider.style.transform = `translateX(0)`;
      }, 10);

      setTimeout(() => {
        removedElement.style.display = 'none';
        carouselSlider.removeChild(lastElement);

        SetCarouselSize();
      }, ANIMATION_DURATION - 50);
    };

    isDirectionRight ? animateRight() : animateLeft();
  };

  isShowTwo ? scrollTabletRight() : scrollMobileRight();
};

const EventSwipe = (props: TypeCommonData) => {
  const { GetElements } = props;
  const container = GetElements.container();

  const swipes = (isrightswipe: Boolean) => {
    if (!isrightswipe) {
      EventScrollCarousel(props);
    } else {
      EventScrollCarousel({ ...props, isDirectionRight: false });
    }
  };

  EventsUtility.CreateEventSwipe({ container, callback: swipes });
};

const EventResizeButtonLogic = (props: TypeCommonData) => {
  const { GetElements, GetOptions } = props;
  const buttons = Array.from(
    GetElements.container().querySelectorAll(
      `.${ELEMENT_ANIMATION_CAROUSEL_BUTTON}`,
    ),
  ) as HTMLButtonElement[];

  const count = GetElements.cards().length;
  const isShowTwo = GetOptions.isTabletView();
  const isButtonShownMobile = count > MOBILE_COUNT;
  const isButtonShownTablet = count > TABLET_COUNT;

  if (isShowTwo && isButtonShownTablet) {
    buttons.forEach((button) => (button.style.display = 'block'));
  }

  if (isShowTwo && !isButtonShownTablet) {
    buttons.forEach((button) => (button.style.display = 'none'));
  }

  if (!isShowTwo && isButtonShownMobile) {
    buttons.forEach((button) => (button.style.display = 'block'));
  }

  if (!isShowTwo && !isButtonShownMobile) {
    buttons.forEach((button) => (button.style.display = 'none'));
  }
};

const CreateButton = ({
  SetEventMoveForward,
  SetEventMoveBackward,
  isRight = true,
}: {
  SetEventMoveForward: () => void;
  SetEventMoveBackward: () => void;
  isRight?: boolean;
}) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Next');
  button.classList.add(ELEMENT_ANIMATION_CAROUSEL_BUTTON);
  button.innerHTML = AssetIcon.FORWARD_ARROW;

  if (!isRight) {
    button.setAttribute('aria-label', 'Previous');
  }

  button.addEventListener('click', () => {
    if (isRight) SetEventMoveForward();
    if (!isRight) SetEventMoveBackward();
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, ANIMATION_DURATION + 100);
  });

  return button;
};

const CreateCarouselCardsElement = (props: TypeAnimationCarouselBlockProps) =>
  (() => {
    const { slide, shadowRef, cards } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const GetElements = {
      container: () => container,
      slide: () => slide,
      cards: () => cards,
    };
    const GetOptions = {
      isTabletView: () => container.offsetWidth > CARD_BREAK,
      showCount: function () {
        if (this) {
          return this.isTabletView() ? TABLET_COUNT : MOBILE_COUNT;
        } else {
          return MOBILE_COUNT;
        }
      },
    };
    const GetSizes = {
      cardWidth: function () {
        if (this) {
          const containerWidth = container.offsetWidth;
          const count = GetOptions.showCount();
          const multiplier = count == TABLET_COUNT ? 1 : 0.8;
          const additonalSpace = spaceBetween / 2;

          return (containerWidth / count) * multiplier - additonalSpace;
        }
      },
    };

    const SetCardHeight = () => {
      const minimumHeight = window.innerWidth > 768 ? 450 : 360;
      const maxHeight = cards.reduce((acc, currentElement) => {
        if (acc > currentElement.offsetHeight) return acc;
        return currentElement.offsetHeight;
      }, minimumHeight);

      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };

    const SetCardWidth = () => {
      const elementSize = GetSizes.cardWidth();

      cards.forEach((card) => {
        card.style.width = `${elementSize}px`;
      });
    };

    const SetCarouselSize = () => {
      const elementSize = GetSizes.cardWidth();

      if (elementSize) {
        const elementSizeTotal = elementSize * 2 + spaceBetween;

        slide.style.width = `${elementSizeTotal}px`;
        slide.style.transition = 'none';
        slide.style.transform = 'translateX(0)';
      }
    };

    const SetSizeCarouselElements = () => {
      SetCardWidth();
      SetCarouselSize();
    };

    const SetEventMoveForward = () => EventScrollCarousel({ ...CommonData });
    const SetEventMoveBackward = () =>
      EventScrollCarousel({ ...CommonData, isDirectionRight: false });

    const CommonData = {
      GetElements,
      GetOptions,
      GetSizes,
      SetCarouselSize,
    };

    const EventResize = () => {
      SetSizeCarouselElements();
      EventResizeButtonLogic({ ...CommonData });

      setTimeout(() => {
        SetCardHeight();
      }, 100);
    };

    const Load = () => {
      cards.forEach((card, index) => {
        if (index > 1) card.style.display = 'none';
      });

      slide.style.display = 'flex';
      slide.style.justifyContent = 'space-between';

      setTimeout(() => {
        EventResize();
        EventSwipe({ ...CommonData });
      }, 100);
    };

    container.appendChild(
      CreateButton({
        SetEventMoveForward,
        SetEventMoveBackward,
      }),
    );
    container.appendChild(
      CreateButton({
        SetEventMoveForward,
        SetEventMoveBackward,
        isRight: false,
      }),
    );

    wrapper.classList.add(ELEMENT_ANIMATION_CAROUSEL_WRAPPER);

    if (shadowRef) {
      wrapper.appendChild(shadowRef);
    } else {
      wrapper.appendChild(slide);
    }

    container.classList.add(ELEMENT_ANIMATION_CAROUSEL_CONTAINER);
    container.appendChild(wrapper);

    declaration.classList.add(ELEMENT_ANIMATION_CAROUSEL_DECLARATION);
    declaration.appendChild(container);

    window.addEventListener('resize', Debounce(EventResize, 10));
    Load();

    return {
      element: declaration,
      events: {
        EventResize,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselCardsElement,
  Styles: STYLES_CAROUSEL_CARDS_ELEMENT,
  Elements: {
    declaration: ELEMENT_ANIMATION_CAROUSEL_DECLARATION,
    button: ELEMENT_ANIMATION_CAROUSEL_BUTTON,
  },
};
