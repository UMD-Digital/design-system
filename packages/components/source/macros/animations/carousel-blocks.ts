import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon, EventsUtility, Performance } from 'utilities';

type TypeAnimationCarouselBlockProps = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  blocks: HTMLElement[];
  showHint?: boolean;
  overwriteDisplayLogic?: Record<string, number>;
};

type TypeHelpers = {
  displayLogic: Record<string, number>;
  GetElements: {
    container: () => HTMLDivElement;
    slide: () => HTMLElement;
    blocks: () => HTMLElement[];
  };
  GetOptions: {
    isTabletView: () => boolean;
    showCount: () => number;
    shouldShowHint: () => boolean;
  };
  GetSizes: {
    blockWidth: () => number | undefined;
    carouselWidth: () => number;
  };
  SetLayout: {
    cardHeight: () => void;
    blockWidth: () => void;
    carouselWidth: () => void;
  };
};

type TypeEventScroll = TypeHelpers & {
  isDirectionRight?: boolean;
};

const { Debounce } = Performance;
const { Colors, Spacing } = Tokens;

const ANIMATION_DURATION = 500;
const HINT_MULTIPLER_SIZING = 0.2;

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

const EventScrollCarousel = (props: TypeEventScroll) => {
  const {
    displayLogic,
    GetElements,
    GetOptions,
    GetSizes,
    SetLayout,
    isDirectionRight = true,
  } = props;
  const carouselSlider = GetElements.slide();
  const slotContent = Array.from(
    carouselSlider.querySelectorAll(':scope > *'),
  ) as HTMLDivElement[];

  const isShowHint = GetOptions.shouldShowHint();
  const elementCount = GetOptions.showCount();
  const elementSize = GetSizes.blockWidth();
  const carouselSize = GetSizes.carouselWidth();

  if (!elementSize) return;

  const elementSizeWithSpace = elementSize + displayLogic.blockGap * 2;
  const temporaryCarouselSize = carouselSize + elementSizeWithSpace;

  const animateRight = () => {
    const firstElement = slotContent[0];
    const clonedElement = firstElement.cloneNode(true) as HTMLDivElement;
    const upcomingElement = slotContent[elementCount];
    const hintElement = slotContent[elementCount + 1];

    carouselSlider.style.width = `${temporaryCarouselSize}px`;
    upcomingElement.style.display = 'block';
    carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms`;
    carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

    setTimeout(() => {
      if (isShowHint) {
        hintElement.style.display = 'block';
      }

      carouselSlider.appendChild(clonedElement);
      clonedElement.style.display = 'none';
    }, 10);

    setTimeout(() => {
      carouselSlider.removeChild(firstElement);

      SetLayout.carouselWidth();
    }, ANIMATION_DURATION - 10);
  };

  const animateLeft = () => {
    const lastElement = slotContent[slotContent.length - 1];
    const removedElement = slotContent[elementCount - 1];
    const hintElementSibiling = slotContent[elementCount];
    const clonedElement = lastElement.cloneNode(true) as HTMLDivElement;

    carouselSlider.style.width = `${temporaryCarouselSize}px`;
    carouselSlider.prepend(clonedElement);
    clonedElement.style.display = 'block';
    carouselSlider.style.transform = `translateX(-${elementSizeWithSpace}px)`;

    setTimeout(() => {
      carouselSlider.style.transition = `transform ${ANIMATION_DURATION}ms`;
      carouselSlider.style.transform = `translateX(0)`;
    }, 10);

    setTimeout(() => {
      carouselSlider.removeChild(lastElement);

      if (!isShowHint) {
        removedElement.style.display = 'none';
      } else {
        hintElementSibiling.style.display = 'none';
      }

      SetLayout.carouselWidth();
    }, ANIMATION_DURATION - 10);
  };

  isDirectionRight ? animateRight() : animateLeft();
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

  const cardsTotal = GetElements.blocks().length;
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
      blocks,
      showHint = true,
      overwriteDisplayLogic,
    } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const displayLogic: Record<string, number> = {
      mobileCount: 1,
      mobileBreakpoint: 650,
      tabletCount: 2,
      tabletBreakpoint: 1024,
      desktopCount: 2,
      desktopBreakpoint: 1200,
      maxCount: 2,
      blockGap: parseInt(Spacing.md.replace('px', '')),
    };

    if (overwriteDisplayLogic) {
      Object.keys(overwriteDisplayLogic).forEach((key) => {
        displayLogic[key] = overwriteDisplayLogic[key];
      });
    }

    const GetElements = {
      container: () => container,
      slide: () => slide,
      blocks: () => blocks,
    };

    const GetOptions = {
      isMobileView: () =>
        container.offsetWidth <= displayLogic.mobileBreakpoint,
      isTabletView: () =>
        container.offsetWidth > displayLogic.mobileBreakpoint &&
        container.offsetWidth <= displayLogic.tabletBreakpoint,
      isDesktopView: () =>
        container.offsetWidth > displayLogic.tabletBreakpoint &&
        container.offsetWidth <= displayLogic.desktopBreakpoint,
      isHighView: () => container.offsetWidth > displayLogic.desktopBreakpoint,
      showCount: function () {
        if (this) {
          const isMobile = this.isMobileView();
          const isTablet = this.isTabletView();
          const isDesktop = this.isDesktopView();
          const isHighDef = this.isHighView();
          let count = 1;

          if (isMobile) count = displayLogic.mobileCount;
          if (isTablet) count = displayLogic.tabletCount;
          if (isDesktop) count = displayLogic.desktopCount;
          if (isHighDef) count = displayLogic.maxCount;

          return count;
        } else {
          return 1;
        }
      },
      shouldShowHint: () => showHint && GetOptions.isMobileView(),
    };

    const GetSizes = {
      blockWidth: function () {
        if (this) {
          const isShowHint = GetOptions.shouldShowHint();
          const containerWidth = container.offsetWidth;
          const count = GetOptions.showCount();

          if (isShowHint) {
            const hintElementSize = containerWidth * HINT_MULTIPLER_SIZING;

            return (containerWidth - hintElementSize) / count;
          }

          return containerWidth / count;
        }
      },
      carouselWidth: () => {
        const isShowHint = GetOptions.shouldShowHint();
        const count = GetOptions.showCount();
        const elementSize = GetSizes.blockWidth();

        if (!elementSize) return window.innerWidth;

        if (isShowHint) {
          const updatedCount = count + 1;
          return elementSize * updatedCount + displayLogic.blockGap;
        }

        return elementSize * count + displayLogic.blockGap;
      },
    };

    const SetLayout = {
      cardHeight: () => {
        const minimumHeight = window.innerWidth > 768 ? 450 : 360;
        const maxHeight = blocks.reduce((acc, currentElement) => {
          if (acc > currentElement.offsetHeight) return acc;
          return currentElement.offsetHeight;
        }, minimumHeight);

        blocks.forEach((block) => {
          block.style.height = `${maxHeight}px`;
        });
      },
      blockWidth: () => {
        const elementSize = GetSizes.blockWidth();

        blocks.forEach((block) => {
          block.style.width = `${elementSize}px`;
        });
      },
      carouselWidth: () => {
        const elementSize = GetSizes.carouselWidth();

        slide.style.width = `${elementSize}px`;
        slide.style.transition = 'none';
        slide.style.transform = 'translateX(0)';
      },
      blockDisplay: () => {
        const count = GetOptions.showCount() - 1;

        blocks.forEach((block, index) => {
          if (index > count) {
            block.style.display = 'none';
          } else {
            block.style.display = 'block';
          }
        });

        if (showHint) blocks[1].style.display = 'block';
      },
    };

    const Event = {
      helpers: {
        displayLogic,
        GetElements,
        GetOptions,
        GetSizes,
        SetLayout,
      },
      resize: () => {
        SetLayout.blockWidth();
        SetLayout.carouselWidth();
        SetLayout.blockDisplay();
        ButtonDisplay({ ...Event.helpers });

        setTimeout(() => {
          SetLayout.cardHeight();
        }, 100);
      },
      load: () => {
        SetLayout.blockDisplay();
        slide.style.display = 'flex';
        slide.style.gap = `${Spacing.md}`;

        setTimeout(() => {
          Event.resize();
          EventSwipe({ ...Event.helpers });
        }, 100);
      },
      forward: () =>
        EventScrollCarousel({
          ...Event.helpers,
        }),
      backward: () =>
        EventScrollCarousel({
          ...Event.helpers,
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
      blocks.forEach((block) => slide.appendChild(block));
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
