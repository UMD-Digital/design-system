import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon, EventsUtility, Performance } from 'utilities';

type TypeAnimationCarouselBlockProps = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  cards: HTMLElement[];
  mobileCount?: number;
  mobileBreakpoint?: number;
  tabletCount?: number;
  tabletBreakpoint?: number;
  desktopCount?: number;
};

type TypeHelpers = {
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
  SetSizes: {
    cardHeight: () => void;
    cardWidth: () => void;
    carouselWidth: () => void;
  };
};

type TypeEventScroll = TypeHelpers & {
  isDirectionRight?: boolean;
};

const { Debounce } = Performance;
const { Colors, Spacing } = Tokens;

const ANIMATION_DURATION = 500;

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

  .${ELEMENT_ANIMATION_CAROUSEL_WRAPPER} {
    overflow: hidden;
    padding-right: 0;
    width: 100%;
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
  const { GetElements, GetOptions, SetSizes, isDirectionRight = true } = props;
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
        SetSizes.carouselWidth();
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

        SetSizes.carouselWidth();
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

        SetSizes.carouselWidth();
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

        SetSizes.carouselWidth();
      }, ANIMATION_DURATION - 50);
    };

    isDirectionRight ? animateRight() : animateLeft();
  };

  isShowTwo ? scrollTabletRight() : scrollMobileRight();
};

const EventSwipe = (props: TypeHelpers) => {
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

const ButtonDisplay = (props: TypeHelpers) => {
  const { GetElements, GetOptions } = props;
  const buttons = Array.from(
    GetElements.container().querySelectorAll(
      `.${ELEMENT_ANIMATION_CAROUSEL_BUTTON}`,
    ),
  ) as HTMLButtonElement[];

  const cardsTotal = GetElements.cards().length;
  const showCount = GetOptions.showCount();

  if (cardsTotal === showCount) {
    buttons.forEach((button) => (button.style.display = 'none'));
  } else {
    buttons.forEach((button) => (button.style.display = 'block'));
  }
};

const CreateButton = ({
  EventMoveForward,
  EventMoveBackward,
  isRight = true,
}: {
  EventMoveForward: () => void;
  EventMoveBackward: () => void;
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
    if (isRight) EventMoveForward();
    if (!isRight) EventMoveBackward();
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, ANIMATION_DURATION + 100);
  });

  return button;
};

const CreateCarouselCardsElement = (props: TypeAnimationCarouselBlockProps) =>
  (() => {
    const {
      slide,
      shadowRef,
      cards,
      mobileCount = 1,
      mobileBreakpoint = 650,
      tabletCount = 2,
      tabletBreakpoint = 1024,
      desktopCount = 2,
    } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');

    const GetElements = {
      container: () => container,
      slide: () => slide,
      cards: () => cards,
    };

    const GetOptions = {
      isMobileView: () => container.offsetWidth <= mobileBreakpoint,
      isTabletView: () =>
        container.offsetWidth > mobileBreakpoint &&
        container.offsetWidth <= tabletBreakpoint,
      isDesktopView: () => container.offsetWidth > tabletBreakpoint,
      showCount: function () {
        if (this) {
          const isMobile = this.isMobileView();
          const isTablet = this.isTabletView();
          const isDesktop = this.isDesktopView();
          let count = 1;

          if (isMobile) count = mobileCount;
          if (isTablet) count = tabletCount;
          if (isDesktop) count = desktopCount;

          return count;
        } else {
          return 1;
        }
      },
    };

    const GetSizes = {
      cardWidth: function () {
        if (this) {
          const containerWidth = container.offsetWidth;
          const count = GetOptions.showCount();
          const additonalSpace = spaceBetween / 2;
          let multiplier = 1;

          if (count === 1) {
            multiplier = 0.8;
          }

          return (containerWidth / count) * multiplier - additonalSpace;
        }
      },
    };

    const SetSizes = {
      cardHeight: () => {
        const minimumHeight = window.innerWidth > 768 ? 450 : 360;
        const maxHeight = cards.reduce((acc, currentElement) => {
          if (acc > currentElement.offsetHeight) return acc;
          return currentElement.offsetHeight;
        }, minimumHeight);

        cards.forEach((card) => {
          card.style.height = `${maxHeight}px`;
        });
      },
      cardWidth: () => {
        const elementSize = GetSizes.cardWidth();

        cards.forEach((card) => {
          card.style.width = `${elementSize}px`;
        });
      },
      carouselWidth: () => {
        const elementSize = GetSizes.cardWidth();

        if (elementSize) {
          const elementSizeTotal = elementSize * 2 + spaceBetween;

          slide.style.width = `${elementSizeTotal}px`;
          slide.style.transition = 'none';
          slide.style.transform = 'translateX(0)';
        }
      },
    };

    const Helpers = {
      GetElements,
      GetOptions,
      GetSizes,
      SetSizes,
    };

    const Event = {
      resize: () => {
        SetSizes.cardWidth();
        SetSizes.carouselWidth();
        ButtonDisplay({ ...Helpers });

        setTimeout(() => {
          SetSizes.cardHeight();
        }, 100);
      },
      load: () => {
        cards.forEach((card, index) => {
          if (index > 1) card.style.display = 'none';
        });

        slide.style.display = 'flex';
        slide.style.justifyContent = 'space-between';

        setTimeout(() => {
          Event.resize();
          EventSwipe({ ...Helpers });
        }, 100);
      },
      forward: () =>
        EventScrollCarousel({
          ...Helpers,
        }),
      backward: () =>
        EventScrollCarousel({
          ...Helpers,
          isDirectionRight: false,
        }),
    };

    container.appendChild(
      CreateButton({
        EventMoveForward: Event.forward,
        EventMoveBackward: Event.backward,
      }),
    );
    container.appendChild(
      CreateButton({
        EventMoveForward: Event.forward,
        EventMoveBackward: Event.backward,
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

    window.addEventListener('resize', Debounce(Event.resize, 10));

    return {
      element: declaration,
      events: {
        resize: Event.resize,
        load: Event.load,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselCardsElement,
  Styles: STYLES_CAROUSEL_CARDS_ELEMENT,
  Elements: {
    declaration: ELEMENT_ANIMATION_CAROUSEL_DECLARATION,
    container: ELEMENT_ANIMATION_CAROUSEL_CONTAINER,
    button: ELEMENT_ANIMATION_CAROUSEL_BUTTON,
  },
};
